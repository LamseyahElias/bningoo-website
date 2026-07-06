// BNIN-24: Temp API route to apply RLS fix migration
// POST /api/apply-rls-fix 
import { Pool } from 'pg'

export async function POST(request: Request) {
  // Auth check
  const auth = request.headers.get('authorization') || ''
  if (!auth.includes(process.env.SUPABASE_SERVICE_ROLE_KEY || '')) {
    return Response.json({ error: 'unauthorized' }, { status: 401 })
  }

  const pool = new Pool({
    host: process.env.PGHOST || `db.${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '').replace('.supabase.co', '')}.supabase.co`,
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: process.env.SUPABASE_SERVICE_ROLE_KEY,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 30000,
  })

  const results: string[] = []
  const errors: string[] = []
  let client

  try {
    client = await pool.connect()

    // Apply migration in a single transaction
    await client.query('BEGIN')

    // Step 1: Drop recursive policy
    await client.query('DROP POLICY IF EXISTS "users_select_own" ON users')
    results.push('✓ Dropped recursive policy')

    // Step 2: Create SECURITY DEFINER helper
    await client.query(`
      CREATE OR REPLACE FUNCTION auth.user_company_id_safe()
      RETURNS UUID
      LANGUAGE SQL STABLE
      SECURITY DEFINER
      AS $$ SELECT company_id FROM public.users WHERE id = auth.uid() $$
    `)
    results.push('✓ Created safe helper function')

    // Step 3: Recreate SELECT policy
    await client.query(`
      CREATE POLICY "users_select_own" ON users
        FOR SELECT USING (
          id = auth.uid() OR company_id = auth.user_company_id_safe()
        )
    `)
    results.push('✓ Recreated SELECT policy')

    // Step 4: Fix INSERT policy
    await client.query('DROP POLICY IF EXISTS "users_insert_admin" ON users')
    await client.query(`
      CREATE POLICY "users_insert_admin" ON users
        FOR INSERT WITH CHECK (auth.uid() IS NOT NULL)
    `)
    results.push('✓ Fixed INSERT policy')

    // Step 5: Fix UPDATE policy
    await client.query('DROP POLICY IF EXISTS "users_update_own" ON users')
    await client.query(`
      CREATE POLICY "users_update_own" ON users
        FOR UPDATE USING (id = auth.uid())
    `)
    results.push('✓ Fixed UPDATE policy')

    await client.query('COMMIT')
    results.push('✅ Migration committed successfully')
  } catch (err: any) {
    if (client) {
      await client.query('ROLLBACK').catch(() => {})
    }
    errors.push(err.message)
  } finally {
    if (client) client.release()
    await pool.end()
  }

  return Response.json({
    success: errors.length === 0,
    results,
    errors,
  })
}
