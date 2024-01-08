import NextAuth from 'next-auth'
import Github from 'next-auth/providers/github'
import { config } from '@/lib/auth'

const handler = NextAuth(config)

export { handler as GET, handler as POST }