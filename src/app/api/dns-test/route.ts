export async function GET() {
  const dns = require('dns')
  const results: any = {}
  
  const hosts = [
    'aws-0-us-east-1.pooler.supabase.com',
    'db.tptsltomhqeqmchufhfc.supabase.co',
    '44.208.221.186',
  ]
  
  for (const host of hosts) {
    try {
      const addrs = await new Promise((resolve, reject) => {
        dns.lookup(host, { all: true }, (err: any, addrs: any) => {
          if (err) reject(err)
          else resolve(addrs)
        })
      })
      results[host] = addrs
    } catch (e: any) {
      results[host] = e.message
    }
  }
  
  return Response.json(results)
}
