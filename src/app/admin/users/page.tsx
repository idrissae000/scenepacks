import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { createClient } from '@supabase/supabase-js'

const ADMIN_DISCORD_ID = '349045631656001537'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function fmt(ts: string | null) {
  if (!ts) return '—'
  return new Date(ts).toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions)
  const discordId = (session?.user as any)?.discordId

  if (!session || discordId !== ADMIN_DISCORD_ID) notFound()

  const [{ data: users }, { data: downloads }, { data: recent }] = await Promise.all([
    supabase
      .from('users')
      .select('discord_id, username, avatar, email, first_login, last_login, login_count')
      .order('last_login', { ascending: false }),

    supabase
      .from('analytics')
      .select('slug, label, downloads')
      .gt('downloads', 0)
      .order('downloads', { ascending: false })
      .limit(50),

    supabase
      .from('analytics')
      .select('slug, label, downloads, updated_at')
      .gt('downloads', 0)
      .order('updated_at', { ascending: false })
      .limit(30),
  ])

  const cell = 'px-4 py-3 text-sm'
  const headCell = 'px-4 py-3 text-xs uppercase tracking-widest text-left'

  return (
    <div style={{ minHeight: '100vh', background: '#0d0a07', color: '#d4c5a9', padding: '7rem 2rem 4rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontFamily: '"Mobsters","Palatino Linotype",serif', fontSize: '2.5rem', color: '#d4c5a9', lineHeight: 1 }}>
            Admin
          </h1>
          <p style={{ color: '#847464', marginTop: '0.5rem', fontSize: '0.85rem' }}>idrissscenes.com · internal</p>
        </div>

        {/* ── USERS ── */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: '"Mobsters","Palatino Linotype",serif', fontSize: '1.5rem', color: '#d4c5a9', marginBottom: '1rem' }}>
            Discord Users <span style={{ fontSize: '1rem', color: '#847464' }}>({users?.length ?? 0})</span>
          </h2>
          <div style={{ overflowX: 'auto', border: '1px solid #2a1410', borderRadius: '6px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '750px' }}>
              <thead>
                <tr style={{ background: '#160c08', borderBottom: '1px solid #2a1410' }}>
                  <th className={headCell} style={{ color: '#5e1b21' }}>User</th>
                  <th className={headCell} style={{ color: '#5e1b21' }}>Email</th>
                  <th className={headCell} style={{ color: '#5e1b21' }}>First Login</th>
                  <th className={headCell} style={{ color: '#5e1b21' }}>Last Login</th>
                  <th className={headCell} style={{ color: '#5e1b21', textAlign: 'right' }}>Logins</th>
                </tr>
              </thead>
              <tbody>
                {(users ?? []).map((u, i) => (
                  <tr key={u.discord_id} style={{ borderBottom: '1px solid #1a0f0a', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                    <td className={cell}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {u.avatar
                          ? <img src={u.avatar} alt="" width={32} height={32} style={{ borderRadius: '50%', flexShrink: 0, border: '1px solid #3a1a10' }} />
                          : <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#2a1410', flexShrink: 0 }} />
                        }
                        <span style={{ color: '#e8dcc4', fontWeight: 500 }}>{u.username ?? '—'}</span>
                      </div>
                    </td>
                    <td className={cell} style={{ color: '#9a8b76' }}>{u.email ?? '—'}</td>
                    <td className={cell} style={{ color: '#9a8b76', whiteSpace: 'nowrap' }}>{fmt(u.first_login)}</td>
                    <td className={cell} style={{ color: '#9a8b76', whiteSpace: 'nowrap' }}>{fmt(u.last_login)}</td>
                    <td className={cell} style={{ textAlign: 'right', color: '#e55c35', fontWeight: 700 }}>{u.login_count}</td>
                  </tr>
                ))}
                {(!users || users.length === 0) && (
                  <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#847464' }}>No users yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── TOP DOWNLOADS ── */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: '"Mobsters","Palatino Linotype",serif', fontSize: '1.5rem', color: '#d4c5a9', marginBottom: '1rem' }}>
            Top Downloads <span style={{ fontSize: '1rem', color: '#847464' }}>(all time)</span>
          </h2>
          <div style={{ overflowX: 'auto', border: '1px solid #2a1410', borderRadius: '6px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
              <thead>
                <tr style={{ background: '#160c08', borderBottom: '1px solid #2a1410' }}>
                  <th className={headCell} style={{ color: '#5e1b21' }}>#</th>
                  <th className={headCell} style={{ color: '#5e1b21' }}>Character / Pack</th>
                  <th className={headCell} style={{ color: '#5e1b21' }}>Slug</th>
                  <th className={headCell} style={{ color: '#5e1b21', textAlign: 'right' }}>Downloads</th>
                </tr>
              </thead>
              <tbody>
                {(downloads ?? []).map((d, i) => (
                  <tr key={d.slug} style={{ borderBottom: '1px solid #1a0f0a', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                    <td className={cell} style={{ color: '#847464', width: '40px' }}>{i + 1}</td>
                    <td className={cell} style={{ color: '#e8dcc4', fontWeight: 500 }}>{d.label}</td>
                    <td className={cell} style={{ color: '#847464', fontSize: '0.8rem', fontFamily: 'monospace' }}>{d.slug}</td>
                    <td className={cell} style={{ textAlign: 'right', color: '#e55c35', fontWeight: 700 }}>{d.downloads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── RECENT DOWNLOADS ── */}
        <section>
          <h2 style={{ fontFamily: '"Mobsters","Palatino Linotype",serif', fontSize: '1.5rem', color: '#d4c5a9', marginBottom: '1rem' }}>
            Recent Activity
          </h2>
          <div style={{ overflowX: 'auto', border: '1px solid #2a1410', borderRadius: '6px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
              <thead>
                <tr style={{ background: '#160c08', borderBottom: '1px solid #2a1410' }}>
                  <th className={headCell} style={{ color: '#5e1b21' }}>Character / Pack</th>
                  <th className={headCell} style={{ color: '#5e1b21' }}>Slug</th>
                  <th className={headCell} style={{ color: '#5e1b21', textAlign: 'right' }}>Total DLs</th>
                  <th className={headCell} style={{ color: '#5e1b21', textAlign: 'right' }}>Last Activity (CT)</th>
                </tr>
              </thead>
              <tbody>
                {(recent ?? []).map((r, i) => (
                  <tr key={r.slug + i} style={{ borderBottom: '1px solid #1a0f0a', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                    <td className={cell} style={{ color: '#e8dcc4', fontWeight: 500 }}>{r.label}</td>
                    <td className={cell} style={{ color: '#847464', fontSize: '0.8rem', fontFamily: 'monospace' }}>{r.slug}</td>
                    <td className={cell} style={{ textAlign: 'right', color: '#e55c35', fontWeight: 700 }}>{r.downloads}</td>
                    <td className={cell} style={{ textAlign: 'right', color: '#9a8b76', whiteSpace: 'nowrap' }}>{fmt(r.updated_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  )
}
