import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { USER_ROLES, USER_STATUS } from "./lib/constants"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl
    const baseUrl = new URL(req.url).origin

    if (pathname.startsWith('/admin')) {
      if (!token || token.role !== USER_ROLES.ADMIN) {
        return NextResponse.redirect(new URL('/signin', baseUrl))
      }
    }

    if (pathname.startsWith('/customer')) {
      if (!token || token.role !== USER_ROLES.CUSTOMER || token.status !== USER_STATUS.ACTIVE) {
        return NextResponse.redirect(new URL('/signin', baseUrl))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        if (pathname.startsWith('/admin')) {
          return token?.role === USER_ROLES.ADMIN
        }
        
        if (pathname.startsWith('/customer')) {
          return token?.role === USER_ROLES.CUSTOMER && token?.status === USER_STATUS.ACTIVE
        }
        
        return true
      },
    },
    pages: {
      signIn: "/signin",
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/customer/:path*']
}