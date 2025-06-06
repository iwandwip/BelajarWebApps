"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  UserCheck, 
  CreditCard, 
  Mail, 
  Phone, 
  MapPin,
  Check,
  X
} from "lucide-react"

export default function AdminApprovalsPage() {
  const pendingUsers = []
  const pendingPayments = []

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pending Approvals</h2>
        <p className="text-muted-foreground">
          Review and approve user registrations and payment requests
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending User Approvals
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              New user registrations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payment Approvals
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Top-up requests
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserCheck className="h-5 w-5" />
            <span>User Registration Approvals</span>
          </CardTitle>
          <CardDescription>
            Review new customer registrations before activating their accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingUsers.length === 0 ? (
            <div className="text-center py-8">
              <UserCheck className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium text-muted-foreground">No pending user approvals</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                All user registrations have been processed.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((user: any) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{user.name}</h3>
                        <Badge variant="outline">PENDING</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>{user.customer?.phone}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate max-w-xs">{user.customer?.address}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Payment Approvals</span>
          </CardTitle>
          <CardDescription>
            Review and approve customer water quota top-up requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingPayments.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium text-muted-foreground">No pending payment approvals</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                All payment requests have been processed.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingPayments.map((payment: any) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{payment.customer.user.name}</h3>
                        <Badge variant="outline">{payment.customer.customerNo}</Badge>
                        <Badge className="bg-yellow-100 text-yellow-800">PENDING</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Amount: Rp {payment.amount.toLocaleString()}</span>
                        <span>Quota: {payment.quotaRequested}L</span>
                        <span>Method: {payment.method}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Requested: {new Date(payment.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}