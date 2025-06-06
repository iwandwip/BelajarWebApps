"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { SignOutButton } from "@/components/auth/signout-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  LayoutDashboard, 
  CreditCard, 
  Activity, 
  User,
  Droplets
} from "lucide-react"

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user.role !== "CUSTOMER" || session.user.status !== "ACTIVE") {
    redirect("/signin")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                PDAM Customer Portal
              </h1>
              <Badge variant="outline">
                {session.user.customerNo}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600">Quota:</span>
                <span className="font-medium">{session.user.waterQuota || 0}L</span>
              </div>
              <span className="text-sm text-gray-600">
                Welcome, {session.user.name}
              </span>
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link href="/customer/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link href="/customer/topup">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Top-up Water Quota
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link href="/customer/usage">
                  <Activity className="mr-2 h-4 w-4" />
                  Usage History
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link href="/customer/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </Link>
              </Button>
            </nav>
          </aside>

          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}