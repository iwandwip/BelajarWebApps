"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  Droplets, 
  Calendar,
  TrendingDown,
  TrendingUp,
  BarChart3
} from "lucide-react"

export default function CustomerUsagePage() {
  const { data: session } = useSession()

  const dailyUsage = [
    { date: "2025-06-01", usage: 52, cost: 5200 },
    { date: "2025-06-02", usage: 48, cost: 4800 },
    { date: "2025-06-03", usage: 55, cost: 5500 },
    { date: "2025-06-04", usage: 42, cost: 4200 },
    { date: "2025-06-05", usage: 38, cost: 3800 },
    { date: "2025-06-06", usage: 45, cost: 4500 },
    { date: "2025-06-07", usage: 35, cost: 3500 }
  ]

  const monthlyUsage = [
    { month: "Jan 2025", usage: 1450, cost: 145000 },
    { month: "Feb 2025", usage: 1320, cost: 132000 },
    { month: "Mar 2025", usage: 1580, cost: 158000 },
    { month: "Apr 2025", usage: 1380, cost: 138000 },
    { month: "May 2025", usage: 1420, cost: 142000 },
    { month: "Jun 2025", usage: 315, cost: 31500 }
  ]

  const weeklyAverage = dailyUsage.reduce((sum, day) => sum + day.usage, 0) / dailyUsage.length
  const monthlyAverage = monthlyUsage.slice(0, -1).reduce((sum, month) => sum + month.usage, 0) / (monthlyUsage.length - 1)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Usage History</h2>
        <p className="text-muted-foreground">
          Track your water consumption and usage patterns - Customer {session?.user?.customerNo}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Usage
            </CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35L</div>
            <p className="text-xs text-muted-foreground">
              -10L from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Weekly Average
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(weeklyAverage)}L</div>
            <p className="text-xs text-muted-foreground">
              Last 7 days average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Average
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(monthlyAverage)}L</div>
            <p className="text-xs text-muted-foreground">
              Last 5 months average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              This Month
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">315L</div>
            <p className="text-xs text-muted-foreground">
              -78% from avg month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Daily Usage (Last 7 Days)</span>
            </CardTitle>
            <CardDescription>
              Your daily water consumption and costs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailyUsage.map((day) => (
                <div key={day.date} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">
                      {new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Cost: Rp {day.cost.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{day.usage}L</div>
                    <Badge variant="outline" className="text-xs">
                      {day.usage > weeklyAverage ? (
                        <TrendingUp className="h-3 w-3 mr-1 text-red-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
                      )}
                      {day.usage > weeklyAverage ? 'Above' : 'Below'} avg
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Monthly Usage History</span>
            </CardTitle>
            <CardDescription>
              Your monthly water consumption trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyUsage.map((month) => (
                <div key={month.month} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">{month.month}</div>
                    <div className="text-sm text-muted-foreground">
                      Cost: Rp {month.cost.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{month.usage}L</div>
                    {month.month !== "Jun 2025" && (
                      <Badge variant="outline" className="text-xs">
                        {month.usage > monthlyAverage ? (
                          <TrendingUp className="h-3 w-3 mr-1 text-red-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
                        )}
                        {month.usage > monthlyAverage ? 'Above' : 'Below'} avg
                      </Badge>
                    )}
                    {month.month === "Jun 2025" && (
                      <Badge variant="outline" className="text-xs">
                        Current month
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usage Statistics</CardTitle>
          <CardDescription>
            Summary of your water usage patterns and efficiency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 border rounded-lg">
              <Droplets className="mx-auto h-8 w-8 text-blue-500 mb-2" />
              <div className="text-2xl font-bold">
                {monthlyUsage.slice(0, -1).reduce((sum, month) => sum + month.usage, 0)}L
              </div>
              <p className="text-sm text-muted-foreground">Total Last 5 Months</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Calendar className="mx-auto h-8 w-8 text-green-500 mb-2" />
              <div className="text-2xl font-bold">{Math.round(monthlyAverage)}L</div>
              <p className="text-sm text-muted-foreground">Average per Month</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <TrendingDown className="mx-auto h-8 w-8 text-orange-500 mb-2" />
              <div className="text-2xl font-bold">{Math.round(monthlyAverage / 30)}L</div>
              <p className="text-sm text-muted-foreground">Average per Day</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Usage Insights</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Your current month usage is 78% below your monthly average</li>
              <li>• You've been consistently using less water in the past week</li>
              <li>• Your most efficient day was June 7th with only 35L usage</li>
              <li>• Keep up the great work on water conservation!</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}