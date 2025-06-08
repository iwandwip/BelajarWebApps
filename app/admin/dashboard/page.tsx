"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Droplets, 
  AlertTriangle,
  Activity,
  UserCheck,
  CreditCard
} from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalCustomers: number
  activeNodes: number
  totalWaterDistributed: number
  leakAlerts: number
  pendingUsers: number
  pendingPayments: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    activeNodes: 3,
    totalWaterDistributed: 1750,
    leakAlerts: 0,
    pendingUsers: 0,
    pendingPayments: 0
  })
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    try {
      setLoading(true)
      const [usersRes, paymentsRes, statsRes] = await Promise.all([
        fetch('/api/admin/pending-users'),
        fetch('/api/admin/pending-payments'),
        fetch('/api/admin/stats')
      ])

      const usersData = usersRes.ok ? await usersRes.json() : { users: [] }
      const paymentsData = paymentsRes.ok ? await paymentsRes.json() : { payments: [] }
      const statsData = statsRes.ok ? await statsRes.json() : {}

      setStats(prev => ({
        ...prev,
        totalCustomers: statsData.totalCustomers || 0,
        pendingUsers: usersData.users?.length || 0,
        pendingPayments: paymentsData.payments?.length || 0
      }))
    } catch {
      
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <div className="animate-pulse grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your PDAM management system
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              +0 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Nodes
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeNodes}</div>
            <p className="text-xs text-muted-foreground">
              All systems online
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Water Distributed
            </CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalWaterDistributed}L</div>
            <p className="text-xs text-muted-foreground">
              +180L from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Leak Alerts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.leakAlerts}</div>
            <p className="text-xs text-muted-foreground">
              No active leaks detected
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest system activities and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  All sensor nodes are online
                </p>
                <p className="text-sm text-muted-foreground">
                  DIST-001, USER-001, USER-002 connected
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                2 min ago
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Water quota updated for PDAM-001
                </p>
                <p className="text-sm text-muted-foreground">
                  Budi Santoso - Added 1000L quota
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                1 hour ago
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  System settings updated
                </p>
                <p className="text-sm text-muted-foreground">
                  Leak detection threshold changed to 10%
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                3 hours ago
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full justify-start">
              <Link href="/admin/approvals">
                <UserCheck className="mr-2 h-4 w-4" />
                Pending User Approvals
                <Badge variant="secondary" className="ml-auto">{stats.pendingUsers}</Badge>
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/approvals">
                <CreditCard className="mr-2 h-4 w-4" />
                Pending Payment Approvals
                <Badge variant="secondary" className="ml-auto">{stats.pendingPayments}</Badge>
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/monitoring">
                <Activity className="mr-2 h-4 w-4" />
                Real-time Monitoring
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/customers">
                <Users className="mr-2 h-4 w-4" />
                Manage Customers
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>
            Current status of all PDAM system components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-medium">Distributor Node</p>
                <p className="text-xs text-muted-foreground">DIST-001 - Online</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-medium">Customer Node 1</p>
                <p className="text-xs text-muted-foreground">USER-001 - Online</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div>
                <p className="text-sm font-medium">Customer Node 2</p>
                <p className="text-xs text-muted-foreground">USER-002 - Online</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}