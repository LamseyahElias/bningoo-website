// TASK 2: Fix RLS recursion on users table
// POST /api/apply-rls-fix
const dns = require('dns')
const { Pool } = require('pg')

// pg uses c-ares internally which may not resolve IPv6 on Vercel.
// Force Node.js dns.lookup path which does handle IPv6.
// Monkey-patch: when pg asks for the direct DB host, return the IPv6 address directly.
const DB_HOST = 'db.tptsltomhqeqmchufhfc.supabase.co'
const DB_IPV6 = '2a05:d014:128e:9502:c9c:c035:f7a2:2c68'

const origLookup = dns.lookup
dns.lookup = (hostname: string, opts: any, cb: Function) => {
  if (typeof opts === 'function') { cb = opts; opts = { family: 0 } }
  if (hostname === DB_HOST) {
    if (opts.all) {
      cb(null, [{ address: DB_IPV6, family: 6 }])
    } else {
      cb(null, DB_IPV6, 6)
    }
    return
  }
  origLookup(hostname, opts, cb)
}

export async function POST(request: Request) {
  const auth = request.headers.get('authorization') || ''
  if (!auth.includes(process.env.SUPABASE_SERVICE_ROLE_KEY || '')) {
    return Response.json({ error: 'unauthorized' }, { status: 401 })
  }

  const projectRef = 'tptsltomhqeqmchufhfc'
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

  // Direct Supabase DB connection (Vercel supports IPv6)
  // Use service_role JWT as password — Supabase accepts JWTs on direct connections
  const pool = new Pool({
    host: `db.${projectRef}.supabase.co`,
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: serviceKey,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 30000,
  })

  const results: string[] = []
  const errors: string[] = []
  let client

  try {
    client = await pool.connect()

    // Step 1: Get current policies
    const policies = await client.query(`SELECT policyname, cmd, qual FROM pg_policies WHERE tablename = 'users' ORDER BY policyname`)
    results.push(`Current policies: ${JSON.stringify(policies.rows)}`)

    // Step 2: Drop existing policies
    const existingPolicies = await client.query(`SELECT policyname FROM pg_policies WHERE tablename = 'users'`)
    for (const row of existingPolicies.rows) {
      await client.query(`DROP POLICY IF EXISTS "${row.policyname}" ON users`)
      results.push(`✓ Dropped policy: ${row.policyname}`)
    }

    // Step 3: Self-read policy
    await client.query(`CREATE POLICY "users_select_own" ON users FOR SELECT USING (id = auth.uid())`)
    results.push('✓ Created users_select_own: FOR SELECT USING (id = auth.uid())')

    // Step 4: Admin/service_role read policy  
    await client.query(`CREATE POLICY "users_select_admin" ON users FOR SELECT USING (auth.role() = 'service_role')`)
    results.push('✓ Created users_select_admin: FOR SELECT USING (auth.role() = service_role)')

    // Step 5: INSERT policy
    await client.query(`CREATE POLICY "users_insert_own" ON users FOR INSERT WITH CHECK (auth.uid() IS NOT NULL OR auth.role() = 'service_role')`)
    results.push('✓ Created users_insert_own INSERT policy')

    // Step 6: UPDATE policy
    await client.query(`CREATE POLICY "users_update_own" ON users FOR UPDATE USING (id = auth.uid() OR auth.role() = 'service_role')`)
    results.push('✓ Created users_update_own UPDATE policy')

    // Step 7: Verify
    const verify = await client.query(`SELECT policyname, cmd, qual FROM pg_policies WHERE tablename = 'users' ORDER BY policyname`)
    results.push(`Verified policies: ${JSON.stringify(verify.rows)}`)
    results.push('✅ All policies applied successfully')

  } catch (err: any) {
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
