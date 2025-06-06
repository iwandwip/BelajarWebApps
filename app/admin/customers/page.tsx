"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Phone, 
  MapPin, 
  Droplets,
  Eye,
  Edit
} from "lucide-react"

export default function AdminCustomersPage() {
  const customers = [
    {
      id: "1",
      customerNo: "PDAM-001",
      name: "Budi Santoso",
      email: "budi@gmail.com",
      phone: "08123456789",
      address: "Jl. Merdeka No. 123, Malang",
      waterQuota: 1000,
      status: "ACTIVE",
      nodeStatus: "ONLINE"
    },
    {
      id: "2",
      customerNo: "PDAM-002",
      name: "Sari Dewi",
      email: "sari@gmail.com",
      phone: "08987654321",
      address: "Jl. Sudirman No. 456, Malang",
      waterQuota: 750,
      status: "ACTIVE",
      nodeStatus: "ONLINE"
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Customer Management</h2>
        <p className="text-muted-foreground">
          Manage PDAM customers and their accounts
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
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              All registered customers
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
              Currently active accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Water Quota
            </CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,750L</div>
            <p className="text-xs text-muted-foreground">
              Combined quota balance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Online Nodes
            </CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2/2</div>
            <p className="text-xs text-muted-foreground">
              Nodes connected
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
          <CardDescription>
            All registered PDAM customers and their account details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{customer.name}</h3>
                      <Badge variant="outline">{customer.customerNo}</Badge>
                      <Badge className={customer.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {customer.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Phone className="h-3 w-3" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate max-w-xs">{customer.address}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Droplets className="h-3 w-3 text-blue-500" />
                        <span className="font-medium">{customer.waterQuota}L quota</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${customer.nodeStatus === "ONLINE" ? "bg-green-500" : "bg-red-500"}`}></div>
                        <span className="text-xs">{customer.nodeStatus}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}