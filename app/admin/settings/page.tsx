"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Settings, 
  Save, 
  AlertTriangle,
  Clock,
  Droplets,
  Activity
} from "lucide-react"
import { SystemSetting } from "@/types/admin"

export default function AdminSettingsPage() {
  const systemSettings: SystemSetting[] = [
    {
      key: "leak_flow_threshold_percent",
      label: "Leak Detection Flow Threshold",
      value: "10",
      unit: "%",
      description: "Flow difference percentage to trigger leak alert",
      icon: AlertTriangle,
      category: "Leak Detection"
    },
    {
      key: "leak_pressure_threshold_bar",
      label: "Leak Detection Pressure Threshold",
      value: "0.5",
      unit: "Bar",
      description: "Pressure difference in Bar to trigger leak alert",
      icon: AlertTriangle,
      category: "Leak Detection"
    },
    {
      key: "sensor_data_frequency_seconds",
      label: "Sensor Data Frequency",
      value: "5",
      unit: "seconds",
      description: "How often ESP32 sends sensor data",
      icon: Clock,
      category: "System"
    },
    {
      key: "auto_valve_close_quota_limit",
      label: "Auto Valve Close Quota Limit",
      value: "0",
      unit: "Liter",
      description: "Water quota limit to auto-close valve",
      icon: Droplets,
      category: "Water Management"
    }
  ]

  const categories = [...new Set(systemSettings.map(setting => setting.category))]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
        <p className="text-muted-foreground">
          Configure system parameters and thresholds
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Settings
            </CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemSettings.length}</div>
            <p className="text-xs text-muted-foreground">
              System parameters
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Leak Threshold
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10%</div>
            <p className="text-xs text-muted-foreground">
              Flow difference alert
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Data Frequency
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5s</div>
            <p className="text-xs text-muted-foreground">
              Sensor update interval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Auto Close Limit
            </CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0L</div>
            <p className="text-xs text-muted-foreground">
              Valve close threshold
            </p>
          </CardContent>
        </Card>
      </div>

      {categories.map((category) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>{category} Settings</span>
            </CardTitle>
            <CardDescription>
              Configure {category.toLowerCase()} parameters and thresholds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {systemSettings
                .filter(setting => setting.category === category)
                .map((setting) => (
                  <div key={setting.key} className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mt-1">
                          <setting.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Label className="font-medium">{setting.label}</Label>
                            <Badge variant="outline">{setting.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {setting.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            defaultValue={setting.value}
                            className="w-32"
                          />
                          <span className="text-sm text-muted-foreground">{setting.unit}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Save className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>System Status</span>
          </CardTitle>
          <CardDescription>
            Current system status and last configuration update
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>System Status</Label>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">All systems operational</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Last Settings Update</Label>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Configuration Version</Label>
              <Badge variant="outline">v1.0.0</Badge>
            </div>
            <div className="space-y-2">
              <Label>Database Status</Label>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Connected</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t">
            <Button className="w-full md:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}