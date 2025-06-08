"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Droplets, 
  TrendingDown, 
  CreditCard, 
  AlertCircle,
  Activity,
  Gauge
} from "lucide-react"
import Link from "next/link"

export default function CustomerDashboard() {
  const { data: session } = useSession()

  const waterQuota = session?.user?.waterQuota || 0
  const quotaProgress = Math.min((waterQuota / 1000) * 100, 100)
  const isLowQuota = waterQuota < 100

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, {session?.user?.name} - Customer {session?.user?.customerNo || 'N/A'}
        </p>
      </div>

      {isLowQuota && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-orange-800">Low Water Quota Alert</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700 mb-4">
              Your water quota is running low. Please top up to avoid service interruption.
            </p>
            <Button asChild>
              <Link href="/customer/topup">
                <CreditCard className="mr-2 h-4 w-4" />
                Top Up Now
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Water Quota
            </CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{waterQuota}L</div>
            <Progress value={quotaProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {quotaProgress.toFixed(1)}% of 1000L capacity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Usage
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45L</div>
            <p className="text-xs text-muted-foreground">
              -12L from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Water Pressure
            </CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.2 Bar</div>
            <p className="text-xs text-muted-foreground">
              Normal pressure range
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Node Status
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium">Online</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Last update: 2 min ago
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Water Usage This Week</CardTitle>
            <CardDescription>
              Daily water consumption pattern
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { day: "Monday", usage: 52, percentage: 87 },
                { day: "Tuesday", usage: 48, percentage: 80 },
                { day: "Wednesday", usage: 55, percentage: 92 },
                { day: "Thursday", usage: 42, percentage: 70 },
                { day: "Friday", usage: 38, percentage: 63 },
                { day: "Saturday", usage: 45, percentage: 75 },
                { day: "Sunday", usage: 35, percentage: 58 }
              ].map((item) => (
                <div key={item.day} className="flex items-center space-x-4">
                  <div className="w-20 text-sm text-muted-foreground">
                    {item.day}
                  </div>
                  <div className="flex-1">
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                  <div className="w-12 text-right text-sm font-medium">
                    {item.usage}L
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Manage your PDAM account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full justify-start">
              <Link href="/customer/topup">
                <CreditCard className="mr-2 h-4 w-4" />
                Top Up Water Quota
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/customer/usage">
                <Activity className="mr-2 h-4 w-4" />
                View Usage History
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/customer/profile">
                <Droplets className="mr-2 h-4 w-4" />
                Update Profile
              </Link>
            </Button>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Account Information</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Customer No:</span>
                  <Badge variant="outline">{session?.user?.customerNo || 'N/A'}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Account Status:</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Service Type:</span>
                  <span>Residential</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest account activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Water quota top-up successful
                </p>
                <p className="text-sm text-muted-foreground">
                  Added 1000L to your account
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                2 days ago
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Daily usage report
                </p>
                <p className="text-sm text-muted-foreground">
                  Used 45L today, 12L less than yesterday
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                Today
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Account activated
                </p>
                <p className="text-sm text-muted-foreground">
                  Your PDAM account has been approved and activated
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                1 week ago
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}