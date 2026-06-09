import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: 'identify email' } },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.sub
        ;(session.user as any).discordId = token.sub
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
