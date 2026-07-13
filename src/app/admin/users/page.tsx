'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
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

function fmtShort(ts: string | null) {
  if (!ts) return '—'
  return new Date(ts).toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

function formatCount(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  return n.toString()
}

type Tab = 'overview' | 'events' | 'users' | 'characters' | 'applications' | 'creators'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const discordId = (session?.user as any)?.discordId

  const [tab, setTab] = useState<Tab>('overview')
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  // Data
  const [analytics, setAnalytics] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])

  // Filters
  const [eventFilter, setEventFilter] = useState<'all' | 'discord' | 'web'>('all')
  const [eventSearch, setEventSearch] = useState('')
  const [charSearch, setCharSearch] = useState('')

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const [{ data: a }, { data: e }, { data: u }, { data: ap }] = await Promise.all([
      supabase
        .from('analytics')
        .select('slug, label, type, downloads, discord_downloads, web_downloads, views, last_download_at')
        .gt('downloads', 0)
        .order('downloads', { ascending: false }),

      supabase
        .from('download_events')
        .select('id, slug, label, method, discord_id, username, creator_id, created_at')
        .order('created_at', { ascending: false })
        .limit(200),

      supabase
        .from('users')
        .select('discord_id, username, avatar, email, first_login, last_login, login_count')
        .order('last_login', { ascending: false }),

      supabase
        .from('applications')
        .select('id, type, discord_id, discord_username, question1, question2, question3, created_at')
        .order('created_at', { ascending: false }),
    ])
    setAnalytics(a ?? [])
    setEvents(e ?? [])
    setUsers(u ?? [])
    setApplications(ap ?? [])
    setLastRefresh(new Date())
    setLoading(false)
  }, [])

  useEffect(() => {
    if (status === 'loading') return
    if (!session || discordId !== ADMIN_DISCORD_ID) {
      router.replace('/404')
      return
    }
    fetchAll()
  }, [status, session, discordId, router, fetchAll])

  if (status === 'loading' || loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0d0a07', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#847464', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>Loading admin…</div>
      </div>
    )
  }

  if (!session || discordId !== ADMIN_DISCORD_ID) return null

  // Computed stats
  const totalDownloads = analytics.filter(a => a.type === 'character').reduce((s, a) => s + (a.downloads ?? 0), 0)
  const totalViews = analytics.filter(a => a.type === 'character').reduce((s, a) => s + (a.views ?? 0), 0)
  const totalDiscord = analytics.filter(a => a.type === 'character').reduce((s, a) => s + (a.discord_downloads ?? 0), 0)
  const totalWeb = analytics.filter(a => a.type === 'character').reduce((s, a) => s + (a.web_downloads ?? 0), 0)

  // Last 24h events
  const now = Date.now()
  const events24h = events.filter(e => now - new Date(e.created_at).getTime() < 86400000)
  const events7d  = events.filter(e => now - new Date(e.created_at).getTime() < 7 * 86400000)

  // Filtered events
  const filteredEvents = events
    .filter(e => eventFilter === 'all' || e.method === eventFilter)
    .filter(e => !eventSearch || e.label?.toLowerCase().includes(eventSearch.toLowerCase()) || e.username?.toLowerCase().includes(eventSearch.toLowerCase()))

  // Filtered characters
  const charRows = analytics.filter(a => a.type === 'character')
    .filter(a => !charSearch || a.label?.toLowerCase().includes(charSearch.toLowerCase()))

  const S = {
    page: { minHeight: '100vh', background: '#0d0a07', color: '#d4c5a9', padding: '7rem 1.5rem 4rem', fontFamily: 'Inter, system-ui, sans-serif' } as React.CSSProperties,
    inner: { maxWidth: '1200px', margin: '0 auto' } as React.CSSProperties,
    h1: { fontFamily: '"Mobsters","Palatino Linotype",serif', fontSize: '2.2rem', color: '#d4c5a9', lineHeight: 1 } as React.CSSProperties,
    h2: { fontFamily: '"Mobsters","Palatino Linotype",serif', fontSize: '1.35rem', color: '#d4c5a9', marginBottom: '1rem' } as React.CSSProperties,
    card: { background: '#120a06', border: '1px solid #2a1410', borderRadius: '8px', padding: '1.25rem 1.5rem' } as React.CSSProperties,
    table: { width: '100%', borderCollapse: 'collapse' as const, minWidth: '600px' },
    th: { padding: '10px 14px', textAlign: 'left' as const, fontSize: '0.7rem', textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: '#5e1b21', borderBottom: '1px solid #2a1410', background: '#160c08' },
    td: { padding: '10px 14px', fontSize: '0.82rem', borderBottom: '1px solid #1a0f0a' },
    input: { background: '#160c08', border: '1px solid #2a1410', borderRadius: '4px', color: '#d4c5a9', padding: '6px 12px', fontSize: '0.82rem', outline: 'none', width: '100%' } as React.CSSProperties,
  }

  const tabStyle = (t: Tab) => ({
    padding: '8px 18px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600,
    cursor: 'pointer', border: 'none', letterSpacing: '0.04em',
    background: tab === t ? '#5e1b21' : 'transparent',
    color: tab === t ? '#fff' : '#847464',
    transition: 'all 0.15s',
  } as React.CSSProperties)

  const methodBadge = (method: string) => {
    const isDiscord = method === 'discord'
    return (
      <span style={{
        fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '3px',
        background: isDiscord ? 'rgba(88,101,242,0.2)' : 'rgba(212,197,169,0.12)',
        color: isDiscord ? '#7289da' : '#d4c5a9',
        border: `1px solid ${isDiscord ? '#5865F2' : '#3a2a1a'}`,
      }}>
        {isDiscord ? 'Discord' : method === 'web' ? 'Web DL' : method}
      </span>
    )
  }

  const StatCard = ({ label, value, sub }: { label: string; value: string | number; sub?: string }) => (
    <div style={{ ...S.card, flex: 1 }}>
      <div style={{ fontSize: '0.7rem', color: '#847464', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>{label}</div>
      <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#e55c35', lineHeight: 1 }}>{typeof value === 'number' ? formatCount(value) : value}</div>
      {sub && <div style={{ fontSize: '0.72rem', color: '#5e4030', marginTop: '0.3rem' }}>{sub}</div>}
    </div>
  )

  return (
    <div style={S.page}>
      <div style={S.inner}>

        {/* Header */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={S.h1}>Admin</h1>
            <p style={{ color: '#847464', marginTop: '0.4rem', fontSize: '0.8rem' }}>
              idrissscenes.com · internal
              {lastRefresh && <span> · refreshed {lastRefresh.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>}
            </p>
          </div>
          <button
            onClick={fetchAll}
            style={{ background: '#1a0f0a', border: '1px solid #3a1a10', color: '#d4c5a9', borderRadius: '4px', padding: '7px 16px', fontSize: '0.78rem', cursor: 'pointer', letterSpacing: '0.04em' }}
          >
            ↻ Refresh
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '2rem', background: '#120a06', border: '1px solid #2a1410', borderRadius: '6px', padding: '4px', width: 'fit-content' }}>
          {(['overview', 'events', 'characters', 'users', 'applications', 'creators'] as Tab[]).map(t => (
            <button key={t} style={tabStyle(t)} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {tab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Stat row */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <StatCard label="Total Downloads" value={totalDownloads} />
              <StatCard label="Total Views" value={totalViews} />
              <StatCard label="Discord DLs" value={totalDiscord} sub={totalDownloads ? `${Math.round(totalDiscord / totalDownloads * 100)}% of total` : undefined} />
              <StatCard label="Web DLs" value={totalWeb} sub={totalDownloads ? `${Math.round(totalWeb / totalDownloads * 100)}% of total` : undefined} />
              <StatCard label="Users" value={users.length} />
              <StatCard label="Last 24h DLs" value={events24h.length} sub={`${events7d.length} this week`} />
            </div>

            {/* Method split bar */}
            {totalDownloads > 0 && (
              <div style={S.card}>
                <div style={{ fontSize: '0.75rem', color: '#847464', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Discord vs Web Download split</div>
                <div style={{ display: 'flex', borderRadius: '4px', overflow: 'hidden', height: '28px' }}>
                  <div style={{ flex: totalDiscord, background: '#5865F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#fff', fontWeight: 700, minWidth: totalDiscord ? '40px' : 0 }}>
                    {totalDiscord > 0 && `${Math.round(totalDiscord / totalDownloads * 100)}%`}
                  </div>
                  <div style={{ flex: totalWeb, background: '#e55c35', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#fff', fontWeight: 700, minWidth: totalWeb ? '40px' : 0 }}>
                    {totalWeb > 0 && `${Math.round(totalWeb / totalDownloads * 100)}%`}
                  </div>
                  {totalDownloads - totalDiscord - totalWeb > 0 && (
                    <div style={{ flex: totalDownloads - totalDiscord - totalWeb, background: '#3a2a1a', minWidth: '30px' }} />
                  )}
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.6rem', fontSize: '0.72rem', color: '#847464' }}>
                  <span style={{ color: '#7289da' }}>■ Discord: {formatCount(totalDiscord)}</span>
                  <span style={{ color: '#e55c35' }}>■ Web DL: {formatCount(totalWeb)}</span>
                  {totalDownloads - totalDiscord - totalWeb > 0 && <span>■ Pre-tracking: {formatCount(totalDownloads - totalDiscord - totalWeb)}</span>}
                </div>
              </div>
            )}

            {/* Recent 10 events */}
            <div>
              <h2 style={S.h2}>Latest Downloads</h2>
              <div style={{ overflowX: 'auto', border: '1px solid #2a1410', borderRadius: '6px' }}>
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.th}>Character</th>
                      <th style={S.th}>Method</th>
                      <th style={S.th}>User</th>
                      <th style={{ ...S.th, textAlign: 'right' }}>Time (CT)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.slice(0, 15).map((e, i) => (
                      <tr key={e.id} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                        <td style={{ ...S.td, color: '#e8dcc4', fontWeight: 500 }}>{e.label}</td>
                        <td style={S.td}>{methodBadge(e.method)}</td>
                        <td style={{ ...S.td, color: '#9a8b76' }}>
                          {e.username
                            ? <span style={{ color: '#c9a84c' }}>{e.username}</span>
                            : <span style={{ color: '#3a2a1a' }}>—</span>}
                        </td>
                        <td style={{ ...S.td, textAlign: 'right', color: '#847464', whiteSpace: 'nowrap' }}>{fmtShort(e.created_at)}</td>
                      </tr>
                    ))}
                    {events.length === 0 && (
                      <tr><td colSpan={4} style={{ ...S.td, textAlign: 'center', color: '#847464', padding: '2rem' }}>No events yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top 10 */}
            <div>
              <h2 style={S.h2}>Top Characters</h2>
              <div style={{ overflowX: 'auto', border: '1px solid #2a1410', borderRadius: '6px' }}>
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.th}>#</th>
                      <th style={S.th}>Character</th>
                      <th style={{ ...S.th, textAlign: 'right' }}>Discord</th>
                      <th style={{ ...S.th, textAlign: 'right' }}>Web DL</th>
                      <th style={{ ...S.th, textAlign: 'right' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {charRows.slice(0, 10).map((a, i) => (
                      <tr key={a.slug} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                        <td style={{ ...S.td, color: '#5e1b21', width: '36px' }}>{i + 1}</td>
                        <td style={{ ...S.td, color: '#e8dcc4', fontWeight: 500 }}>{a.label}</td>
                        <td style={{ ...S.td, textAlign: 'right', color: '#7289da' }}>{a.discord_downloads ?? 0}</td>
                        <td style={{ ...S.td, textAlign: 'right', color: '#c9a84c' }}>{a.web_downloads ?? 0}</td>
                        <td style={{ ...S.td, textAlign: 'right', color: '#e55c35', fontWeight: 700 }}>{a.downloads}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── EVENTS ── */}
        {tab === 'events' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: '1 1 220px' }}>
                <input
                  style={S.input}
                  placeholder="Search character or username…"
                  value={eventSearch}
                  onChange={e => setEventSearch(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {(['all', 'discord', 'web'] as const).map(f => (
                  <button key={f} onClick={() => setEventFilter(f)} style={{
                    padding: '6px 14px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', border: 'none',
                    background: eventFilter === f ? '#5e1b21' : '#1a0f0a',
                    color: eventFilter === f ? '#fff' : '#847464',
                  }}>
                    {f === 'all' ? 'All' : f === 'discord' ? 'Discord' : 'Web DL'}
                  </button>
                ))}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#5e4030' }}>{filteredEvents.length} events</span>
            </div>

            <div style={{ overflowX: 'auto', border: '1px solid #2a1410', borderRadius: '6px' }}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Character</th>
                    <th style={S.th}>Method</th>
                    <th style={S.th}>Discord ID</th>
                    <th style={S.th}>Username</th>
                    <th style={{ ...S.th, textAlign: 'right' }}>Time (CT)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((e, i) => (
                    <tr key={e.id} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                      <td style={{ ...S.td, color: '#e8dcc4', fontWeight: 500 }}>{e.label}</td>
                      <td style={S.td}>{methodBadge(e.method)}</td>
                      <td style={{ ...S.td, color: '#5e4030', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                        {e.discord_id ?? <span style={{ color: '#2a1a10' }}>not logged in</span>}
                      </td>
                      <td style={{ ...S.td, color: e.username ? '#c9a84c' : '#2a1a10' }}>
                        {e.username ?? 'anonymous'}
                      </td>
                      <td style={{ ...S.td, textAlign: 'right', color: '#847464', whiteSpace: 'nowrap' }}>{fmt(e.created_at)}</td>
                    </tr>
                  ))}
                  {filteredEvents.length === 0 && (
                    <tr><td colSpan={5} style={{ ...S.td, textAlign: 'center', color: '#847464', padding: '2rem' }}>No events match filter</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── CHARACTERS ── */}
        {tab === 'characters' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input
              style={{ ...S.input, maxWidth: '320px' }}
              placeholder="Search characters…"
              value={charSearch}
              onChange={e => setCharSearch(e.target.value)}
            />
            <div style={{ overflowX: 'auto', border: '1px solid #2a1410', borderRadius: '6px' }}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>#</th>
                    <th style={S.th}>Character</th>
                    <th style={{ ...S.th, textAlign: 'right' }}>Views</th>
                    <th style={{ ...S.th, textAlign: 'right' }}>Discord</th>
                    <th style={{ ...S.th, textAlign: 'right' }}>Web DL</th>
                    <th style={{ ...S.th, textAlign: 'right' }}>Total</th>
                    <th style={{ ...S.th, textAlign: 'right' }}>Conv %</th>
                    <th style={{ ...S.th, textAlign: 'right' }}>Last DL (CT)</th>
                  </tr>
                </thead>
                <tbody>
                  {charRows.map((a, i) => {
                    const conv = a.views > 0 ? Math.round((a.downloads / a.views) * 100) : 0
                    return (
                      <tr key={a.slug} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                        <td style={{ ...S.td, color: '#5e1b21', width: '36px' }}>{i + 1}</td>
                        <td style={{ ...S.td, color: '#e8dcc4', fontWeight: 500 }}>{a.label}</td>
                        <td style={{ ...S.td, textAlign: 'right', color: '#847464' }}>{formatCount(a.views)}</td>
                        <td style={{ ...S.td, textAlign: 'right', color: '#7289da' }}>{a.discord_downloads ?? 0}</td>
                        <td style={{ ...S.td, textAlign: 'right', color: '#c9a84c' }}>{a.web_downloads ?? 0}</td>
                        <td style={{ ...S.td, textAlign: 'right', color: '#e55c35', fontWeight: 700 }}>{formatCount(a.downloads)}</td>
                        <td style={{ ...S.td, textAlign: 'right', color: conv >= 50 ? '#4caf50' : conv >= 25 ? '#c9a84c' : '#847464' }}>{conv}%</td>
                        <td style={{ ...S.td, textAlign: 'right', color: '#847464', whiteSpace: 'nowrap', fontSize: '0.75rem' }}>{fmtShort(a.last_download_at)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── USERS ── */}
        {tab === 'users' && (
          <div>
            <h2 style={S.h2}>Discord Users <span style={{ fontSize: '1rem', color: '#847464' }}>({users.length})</span></h2>
            <div style={{ overflowX: 'auto', border: '1px solid #2a1410', borderRadius: '6px' }}>
              <table style={{ ...S.table, minWidth: '750px' }}>
                <thead>
                  <tr>
                    <th style={S.th}>User</th>
                    <th style={S.th}>Email</th>
                    <th style={S.th}>Discord ID</th>
                    <th style={S.th}>First Login</th>
                    <th style={S.th}>Last Login</th>
                    <th style={{ ...S.th, textAlign: 'right' }}>Logins</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={u.discord_id} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                      <td style={S.td}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {u.avatar
                            ? <img src={u.avatar} alt="" width={28} height={28} style={{ borderRadius: '50%', flexShrink: 0, border: '1px solid #3a1a10' }} />
                            : <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#2a1410', flexShrink: 0 }} />
                          }
                          <span style={{ color: '#e8dcc4', fontWeight: 500 }}>{u.username ?? '—'}</span>
                        </div>
                      </td>
                      <td style={{ ...S.td, color: '#9a8b76' }}>{u.email ?? '—'}</td>
                      <td style={{ ...S.td, color: '#5e4030', fontFamily: 'monospace', fontSize: '0.75rem' }}>{u.discord_id}</td>
                      <td style={{ ...S.td, color: '#9a8b76', whiteSpace: 'nowrap', fontSize: '0.75rem' }}>{fmt(u.first_login)}</td>
                      <td style={{ ...S.td, color: '#9a8b76', whiteSpace: 'nowrap', fontSize: '0.75rem' }}>{fmt(u.last_login)}</td>
                      <td style={{ ...S.td, textAlign: 'right', color: '#e55c35', fontWeight: 700 }}>{u.login_count}</td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan={6} style={{ ...S.td, textAlign: 'center', color: '#847464', padding: '2rem' }}>No users yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── APPLICATIONS ── */}
        {tab === 'applications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <h2 style={{ ...S.h2, marginBottom: 0 }}>
                Applications <span style={{ fontSize: '1rem', color: '#847464' }}>({applications.length})</span>
              </h2>
            </div>

            {applications.length === 0 && (
              <div style={{ ...S.card, textAlign: 'center', color: '#847464', padding: '3rem' }}>No applications yet</div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {applications.map((app) => {
                const links = [app.question2, app.question3].filter(Boolean)
                const driveLinks = links.filter((l: string) => /drive\.google\.com/i.test(l))
                const hasDrive = driveLinks.length > 0
                return (
                  <div key={app.id} style={{ ...S.card, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                    {/* Header row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ color: '#e8dcc4', fontWeight: 700, fontSize: '0.95rem' }}>
                          {app.discord_username ?? 'Unknown'}
                        </span>
                        <span style={{
                          fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '3px',
                          background: app.type === 'audio' ? 'rgba(88,101,242,0.15)' : 'rgba(94,27,33,0.3)',
                          color: app.type === 'audio' ? '#7289da' : '#e55c35',
                          border: `1px solid ${app.type === 'audio' ? '#5865F2' : '#5e1b21'}`,
                        }}>
                          {app.type === 'audio' ? 'Audio' : 'Scenepack'}
                        </span>
                        {app.discord_id && (
                          <span style={{ color: '#5e4030', fontFamily: 'monospace', fontSize: '0.72rem' }}>
                            {app.discord_id}
                          </span>
                        )}
                      </div>
                      <span style={{ color: '#847464', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>{fmt(app.created_at)}</span>
                    </div>

                    {/* Google Drive warning */}
                    {hasDrive && (
                      <div style={{
                        background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.4)',
                        borderRadius: '6px', padding: '0.6rem 0.9rem',
                        display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
                      }}>
                        <span style={{ flexShrink: 0 }}>⚠️</span>
                        <div>
                          <span style={{ color: '#c9a84c', fontWeight: 700, fontSize: '0.78rem' }}>Google Drive link — </span>
                          <span style={{ color: '#9a8b76', fontSize: '0.78rem' }}>
                            Verify sharing is set to <strong style={{ color: '#c9a84c' }}>"Anyone with the link → Viewer"</strong> before clicking
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Q1 */}
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#5e4030', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.25rem' }}>
                        {app.type === 'audio' ? 'Type of audios' : 'Type of scenepacks'}
                      </div>
                      <div style={{ color: '#d4c5a9', fontSize: '0.85rem', lineHeight: 1.55 }}>{app.question1 ?? '—'}</div>
                    </div>

                    {/* Q2 */}
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#5e4030', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.25rem' }}>
                        {app.type === 'audio' ? 'Audio Sample 1' : 'Scenepack Link'}
                      </div>
                      {app.question2 ? (
                        <a href={app.question2} target="_blank" rel="noopener noreferrer"
                          style={{ color: '#c9a84c', fontSize: '0.82rem', wordBreak: 'break-all', textDecoration: 'underline' }}>
                          {app.question2}
                        </a>
                      ) : <span style={{ color: '#5e4030' }}>—</span>}
                    </div>

                    {/* Q3 — audio only */}
                    {app.question3 && (
                      <div>
                        <div style={{ fontSize: '0.7rem', color: '#5e4030', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.25rem' }}>
                          Audio Sample 2
                        </div>
                        <a href={app.question3} target="_blank" rel="noopener noreferrer"
                          style={{ color: '#c9a84c', fontSize: '0.82rem', wordBreak: 'break-all', textDecoration: 'underline' }}>
                          {app.question3}
                        </a>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── CREATORS ── */}
        {tab === 'creators' && (() => {
          const CREATOR_NAMES: Record<string, string> = {
            '349045631656001537': 'Idriss',
            '1097775170443292702': 'Inko.visuals',
          }
          const creatorEvents = events.filter(e => (e as any).creator_id)
          const byCreator: Record<string, { total: number; recent: any[] }> = {}
          for (const e of creatorEvents) {
            const cid = (e as any).creator_id
            if (!byCreator[cid]) byCreator[cid] = { total: 0, recent: [] }
            byCreator[cid].total += 1
            if (byCreator[cid].recent.length < 5) byCreator[cid].recent.push(e)
          }
          const creatorIds = Object.keys(byCreator).sort((a, b) => byCreator[b].total - byCreator[a].total)
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <h2 style={S.h2}>Downloads by Creator</h2>
              {creatorIds.length === 0 && (
                <div style={{ ...S.card, textAlign: 'center', color: '#847464', padding: '3rem' }}>
                  No creator-tagged downloads yet. Downloads will appear here once the creator_id column is populated.
                </div>
              )}
              {creatorIds.map(cid => {
                const data = byCreator[cid]
                return (
                  <div key={cid} style={S.card}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div style={{ fontFamily: '"Mobsters","Palatino Linotype",serif', fontSize: '1.1rem', color: '#d4c5a9' }}>
                        {CREATOR_NAMES[cid] ?? cid}
                      </div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#e55c35' }}>{formatCount(data.total)}</div>
                    </div>
                    {data.recent.length > 0 && (
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ ...S.table, minWidth: '400px' }}>
                          <thead>
                            <tr>
                              <th style={S.th}>Pack</th>
                              <th style={S.th}>Method</th>
                              <th style={S.th}>User</th>
                              <th style={{ ...S.th, textAlign: 'right' }}>When</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.recent.map((ev, i) => (
                              <tr key={ev.id} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                                <td style={{ ...S.td, color: '#e8dcc4' }}>{ev.label ?? ev.slug}</td>
                                <td style={S.td}>{methodBadge(ev.method)}</td>
                                <td style={{ ...S.td, color: '#9a8b76' }}>{ev.username ?? '—'}</td>
                                <td style={{ ...S.td, textAlign: 'right', color: '#847464', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>{fmtShort(ev.created_at)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })()}

      </div>
    </div>
  )
}
