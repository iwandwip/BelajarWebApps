import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    if (pathname.startsWith('/admin')) {
      if (!token || token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/signin', req.url))
      }
    }

    if (pathname.startsWith('/customer')) {
      if (!token || token.role !== 'CUSTOMER' || token.status !== 'ACTIVE') {
        return NextResponse.redirect(new URL('/signin', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        if (pathname.startsWith('/admin')) {
          return token?.role === 'ADMIN'
        }
        
        if (pathname.startsWith('/customer')) {
          return token?.role === 'CUSTOMER' && token?.status === 'ACTIVE'
        }
        
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/customer/:path*']
}