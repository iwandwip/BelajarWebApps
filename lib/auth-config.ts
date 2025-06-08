import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./db"
import { verifyPassword } from "./db-utils"
import { USER_STATUS } from "./constants"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        remember: { label: "Remember me", type: "checkbox" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { customer: true }
        })

        if (!user) {
          return null
        }

        const isValidPassword = await verifyPassword(credentials.password, user.password)
        if (!isValidPassword) {
          return null
        }

        if (user.status !== USER_STATUS.ACTIVE) {
          throw new Error('Account pending approval or inactive')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          status: user.status,
          customerNo: user.customer?.customerNo || undefined,
          waterQuota: user.customer?.waterQuota || undefined,
          customerId: user.customer?.id || undefined
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60
  },
  pages: {
    signIn: "/signin",
    signOut: "/signin",
    error: "/signin"
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role
        token.status = user.status
        token.customerNo = user.customerNo
        token.waterQuota = user.waterQuota
        token.customerId = user.customerId
      }

      if (trigger === "update" && session?.waterQuota !== undefined) {
        token.waterQuota = session.waterQuota
      }

      if (token.customerId && (trigger === "update" || !token.waterQuota)) {
        try {
          const customer = await prisma.customer.findUnique({
            where: { id: token.customerId as string },
            select: { waterQuota: true, customerNo: true }
          })
          if (customer) {
            token.waterQuota = customer.waterQuota
            token.customerNo = customer.customerNo || undefined
          }
        } catch {
          
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.status = token.status as string
        session.user.customerNo = token.customerNo as string | undefined
        session.user.waterQuota = token.waterQuota as number | undefined
        session.user.customerId = token.customerId as string | undefined
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      }
      
      if (new URL(url).origin === baseUrl) {
        return url
      }
      
      return baseUrl
    }
  },
  events: {
    async signIn({ user }) {
      if (user.role === 'CUSTOMER' && user.customerId) {
        await prisma.customer.update({
          where: { id: user.customerId },
          data: { updatedAt: new Date() }
        })
      }
    },
    async signOut() {
      
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
}