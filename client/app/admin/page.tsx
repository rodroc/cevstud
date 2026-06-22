import { createAdminClient } from '@/lib/supabaseAdmin'

// Simple env-based gate — set ADMIN_SECRET and visit /admin?secret=<value>
// Full auth is a follow-up task.
interface SearchParams { secret?: string }

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const { secret } = await searchParams
  const adminSecret = process.env.ADMIN_SECRET

  if (adminSecret && secret !== adminSecret) {
    return (
      <main className="min-h-screen bg-bg flex items-center justify-center">
        <p className="font-mono text-sm text-white/40">401 — not authorised</p>
      </main>
    )
  }

  const supabase = createAdminClient()
  const { data: contacts, error } = await supabase
    .from('contacts')
    .select('id, name, email, message, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <main className="min-h-screen bg-bg flex items-center justify-center">
        <p className="font-mono text-sm text-red-400">Error loading submissions: {error.message}</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-bg text-white font-mono px-6 py-12">
      <h1 className="text-lime text-xs uppercase tracking-widest mb-8">
        cev.studio — contact submissions ({contacts?.length ?? 0})
      </h1>

      {!contacts?.length ? (
        <p className="text-white/40 text-sm">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-white/40 text-xs uppercase tracking-wider border-b border-white/10">
                <th className="text-left py-3 pr-6 font-normal">Name</th>
                <th className="text-left py-3 pr-6 font-normal">Email</th>
                <th className="text-left py-3 pr-6 font-normal">Message</th>
                <th className="text-left py-3 font-normal whitespace-nowrap">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((row) => (
                <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="py-3 pr-6 text-white/80 whitespace-nowrap">{row.name}</td>
                  <td className="py-3 pr-6 text-white/60">{row.email}</td>
                  <td className="py-3 pr-6 text-white/50 max-w-md truncate">{row.message}</td>
                  <td className="py-3 text-white/30 whitespace-nowrap text-xs">
                    {new Date(row.created_at).toISOString().replace('T', ' ').slice(0, 16)} UTC
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
