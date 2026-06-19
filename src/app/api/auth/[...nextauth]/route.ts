import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: 'identify email guilds.join' } },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.discordId = account.providerAccountId

        try {
          const p = profile as any
          const avatarUrl = p?.avatar
            ? `https://cdn.discordapp.com/avatars/${account.providerAccountId}/${p.avatar}.png`
            : null

          await supabase.rpc('upsert_discord_user', {
            p_discord_id: account.providerAccountId,
            p_username:   p?.global_name ?? p?.username ?? (token.name as string) ?? null,
            p_avatar:     avatarUrl,
            p_email:      (token.email as string) ?? null,
          })
        } catch (_) {
          // Never block auth on tracking failure
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).discordId = token.discordId
        ;(session.user as any).accessToken = token.accessToken
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
