"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  FileBarChart, 
  Download, 
  Calendar,
  Users,
  Droplets,
  AlertTriangle,
  TrendingUp
} from "lucide-react"

export default function AdminReportsPage() {
  const reports = [
    {
      title: "Daily Usage Report",
      description: "Water consumption patterns by customer",
      icon: Droplets,
      data: "Today: 315L consumed across all customers",
      action: "Download PDF"
    },
    {
      title: "Weekly Summary",
      description: "Weekly system performance and usage",
      icon: TrendingUp,
      data: "This week: 2,205L distributed, 99.2% uptime",
      action: "Download Excel"
    },
    {
      title: "Customer Report",
      description: "Customer account status and quotas",
      icon: Users,
      data: "2 active customers, 1,750L total quota",
      action: "Download CSV"
    },
    {
      title: "Leak Detection Report",
      description: "Historical leak detection events",
      icon: AlertTriangle,
      data: "No leaks detected this month",
      action: "Download PDF"
    }
  ]

  const monthlyStats = [
    { month: "Jan 2025", usage: 8500, customers: 2, leaks: 0 },
    { month: "Feb 2025", usage: 9200, customers: 2, leaks: 0 },
    { month: "Mar 2025", usage: 8800, customers: 2, leaks: 1 },
    { month: "Apr 2025", usage: 9100, customers: 2, leaks: 0 },
    { month: "May 2025", usage: 9500, customers: 2, leaks: 0 },
    { month: "Jun 2025", usage: 7200, customers: 2, leaks: 0 }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
        <p className="text-muted-foreground">
          Generate reports and analyze system performance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              This Month Usage
            </CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7,200L</div>
            <p className="text-xs text-muted-foreground">
              -24% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              System Uptime
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              No change from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Leaks Detected
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>
              Generate and download system reports
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <report.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{report.data}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  {report.action}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>
              System performance metrics over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <h3 className="font-medium">{stat.month}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Droplets className="h-3 w-3" />
                        <span>{stat.usage.toLocaleString()}L</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{stat.customers} customers</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="h-3 w-3" />
                        <span>{stat.leaks} leaks</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <FileBarChart className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Custom Report Generator</span>
          </CardTitle>
          <CardDescription>
            Generate custom reports for specific date ranges and metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <select className="w-full p-2 border rounded-md">
                <option>Usage Report</option>
                <option>Customer Report</option>
                <option>System Performance</option>
                <option>Leak Detection</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <select className="w-full p-2 border rounded-md">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Custom range</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <select className="w-full p-2 border rounded-md">
                <option>PDF</option>
                <option>Excel (.xlsx)</option>
                <option>CSV</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}