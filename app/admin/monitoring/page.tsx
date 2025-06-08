"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  Droplets, 
  Gauge, 
  AlertTriangle,
  CheckCircle,
  Radio
} from "lucide-react"
import { SensorNode, LeakDetection } from "@/types/admin"

export default function AdminMonitoringPage() {
  const sensorData: SensorNode[] = [
    {
      nodeId: "DIST-001",
      location: "Main Distribution Pipe - Central",
      type: "DISTRIBUTOR",
      flowRate: 15.5,
      pressure: 2.5,
      status: "ONLINE",
      lastUpdate: "2 min ago"
    },
    {
      nodeId: "USER-001",
      location: "Customer PDAM-001 House",
      type: "CUSTOMER",
      customer: "Budi Santoso",
      flowRate: 14.8,
      pressure: 2.2,
      status: "ONLINE",
      lastUpdate: "1 min ago"
    },
    {
      nodeId: "USER-002",
      location: "Customer PDAM-002 House", 
      type: "CUSTOMER",
      customer: "Sari Dewi",
      flowRate: 11.9,
      pressure: 2.1,
      status: "ONLINE",
      lastUpdate: "3 min ago"
    }
  ]

  const leakDetection: LeakDetection = {
    distributorFlow: 15.5,
    customerTotalFlow: 26.7,
    flowDifference: -11.2,
    status: "NO_LEAK",
    threshold: 10
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Real-time Monitoring</h2>
        <p className="text-muted-foreground">
          Monitor sensor data and system status in real-time
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Nodes
            </CardTitle>
            <Radio className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/3</div>
            <p className="text-xs text-muted-foreground">
              All nodes online
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Distributor Flow
            </CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leakDetection.distributorFlow}L/min</div>
            <p className="text-xs text-muted-foreground">
              Main distribution rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Customer Total Flow
            </CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leakDetection.customerTotalFlow}L/min</div>
            <p className="text-xs text-muted-foreground">
              Combined customer usage
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Leak Status
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Normal</div>
            <p className="text-xs text-muted-foreground">
              No leaks detected
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Leak Detection Analysis</span>
          </CardTitle>
          <CardDescription>
            Real-time analysis of flow differences to detect potential leaks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 border rounded-lg">
              <Droplets className="mx-auto h-8 w-8 text-blue-500 mb-2" />
              <div className="text-2xl font-bold">{leakDetection.distributorFlow}L/min</div>
              <p className="text-sm text-muted-foreground">Distributor Flow</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Droplets className="mx-auto h-8 w-8 text-green-500 mb-2" />
              <div className="text-2xl font-bold">{leakDetection.customerTotalFlow}L/min</div>
              <p className="text-sm text-muted-foreground">Customer Total Flow</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
              <div className="text-2xl font-bold text-green-600">Normal</div>
              <p className="text-sm text-muted-foreground">Status</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800">No Leak Detected</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Flow difference is within normal threshold (±{leakDetection.threshold}%)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Sensor Data</span>
          </CardTitle>
          <CardDescription>
            Current readings from all sensor nodes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sensorData.map((node) => (
              <div key={node.nodeId} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{node.nodeId}</h3>
                      <Badge variant="outline" className={node.type === "DISTRIBUTOR" ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"}>
                        {node.type}
                      </Badge>
                      <Badge className={node.status === "ONLINE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {node.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{node.location}</p>
                    {node.customer && (
                      <p className="text-sm font-medium">Customer: {node.customer}</p>
                    )}
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{node.flowRate} L/min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Gauge className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">{node.pressure} Bar</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Updated {node.lastUpdate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}