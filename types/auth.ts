import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      status: string
      customerNo?: string
      waterQuota?: number
      customerId?: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    email: string
    name: string
    role: string
    status: string
    customerNo?: string
    waterQuota?: number
    customerId?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    status: string
    customerNo?: string
    waterQuota?: number
    customerId?: string
  }
}