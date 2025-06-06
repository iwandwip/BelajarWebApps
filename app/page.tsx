"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      if (session.user.role === "ADMIN") {
        router.replace("/admin/dashboard")
      } else if (session.user.role === "CUSTOMER" && session.user.status === "ACTIVE") {
        router.replace("/customer/dashboard")
      }
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (session?.user?.status === "PENDING") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Account Pending</CardTitle>
              <CardDescription>
                Your account is pending admin approval
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-sm text-muted-foreground mb-6">
                Welcome {session.user.name}! Your account registration has been received and is currently being reviewed by our admin team. You will receive an email notification once your account has been approved.
              </div>
              
              <div className="space-y-4">
                <Button asChild variant="outline" className="w-full h-11">
                  <Link href="/signin">
                    Back to Sign In
                  </Link>
                </Button>
              </div>
              
              <div className="mt-8 pt-6 border-t text-center">
                <p className="text-xs text-muted-foreground">
                  PDAM Management System v1.0<br />
                  For assistance, please contact our support team
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">PDAM Management System</CardTitle>
            <CardDescription>
              Water distribution management and leak detection system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-muted-foreground mb-6">
              Welcome! Please choose an option to continue:
            </div>
            
            <div className="space-y-4">
              <Button asChild className="w-full h-11">
                <Link href="/signin" prefetch={true}>
                  Sign In to Your Account
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full h-11">
                <Link href="/register" prefetch={true}>
                  Create New Account
                </Link>
              </Button>
              
              <div className="text-center pt-2">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                  prefetch={true}
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t text-center">
              <p className="text-xs text-muted-foreground">
                PDAM Management System v1.0<br />
                Water Quality Monitoring & Customer Management
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}