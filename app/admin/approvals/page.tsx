"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  UserCheck, 
  CreditCard, 
  Mail, 
  Phone, 
  MapPin,
  Check,
  X,
  RefreshCw,
  AlertCircle
} from "lucide-react"

interface PendingUser {
  id: string
  name: string
  email: string
  createdAt: string
  customer?: {
    phone: string
    address: string
  }
}

interface PendingPayment {
  id: string
  amount: number
  quotaRequested: number
  method: string
  createdAt: string
  customer: {
    customerNo: string
    user: {
      name: string
    }
  }
}

interface ApprovalState {
  userId: string
  customerNo: string
  isChecking: boolean
  isAvailable: boolean | null
  error: string
}

export default function AdminApprovalsPage() {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])
  const [pendingPayments, setPendingPayments] = useState<PendingPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [approvalStates, setApprovalStates] = useState<Record<string, ApprovalState>>({})

  const fetchData = async () => {
    try {
      setLoading(true)
      const [usersRes, paymentsRes] = await Promise.all([
        fetch('/api/admin/pending-users'),
        fetch('/api/admin/pending-payments')
      ])

      if (usersRes.ok) {
        const usersData = await usersRes.json()
        setPendingUsers(usersData.users || [])
      }

      if (paymentsRes.ok) {
        const paymentsData = await paymentsRes.json()
        setPendingPayments(paymentsData.payments || [])
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to fetch pending approvals' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const checkCustomerNo = async (userId: string, customerNo: string) => {
    if (!customerNo.trim()) {
      setApprovalStates(prev => ({
        ...prev,
        [userId]: { ...prev[userId], isAvailable: null, error: '' }
      }))
      return
    }

    setApprovalStates(prev => ({
      ...prev,
      [userId]: { ...prev[userId], isChecking: true, error: '' }
    }))

    try {
      const response = await fetch('/api/admin/check-customer-no', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerNo: customerNo.trim() })
      })

      const data = await response.json()

      setApprovalStates(prev => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          isChecking: false,
          isAvailable: data.available,
          error: data.available ? '' : data.message || 'Customer number not available'
        }
      }))
    } catch {
      setApprovalStates(prev => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          isChecking: false,
          isAvailable: false,
          error: 'Failed to check customer number'
        }
      }))
    }
  }

  const handleCustomerNoChange = (userId: string, value: string) => {
    setApprovalStates(prev => ({
      ...prev,
      [userId]: {
        userId,
        customerNo: value,
        isChecking: false,
        isAvailable: null,
        error: ''
      }
    }))

    const debounceTimer = setTimeout(() => {
      checkCustomerNo(userId, value)
    }, 500)

    return () => clearTimeout(debounceTimer)
  }

  const handleUserAction = async (userId: string, action: 'approve' | 'reject') => {
    if (action === 'approve') {
      const state = approvalStates[userId]
      if (!state?.customerNo?.trim()) {
        setMessage({ type: 'error', text: 'Customer number is required' })
        return
      }
      if (state.isAvailable === false) {
        setMessage({ type: 'error', text: 'Customer number is not available' })
        return
      }
    }

    try {
      setProcessing(userId)
      const response = await fetch('/api/admin/pending-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId, 
          action,
          customerNo: action === 'approve' ? approvalStates[userId]?.customerNo : undefined
        })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message })
        setPendingUsers(prev => prev.filter(user => user.id !== userId))
        setApprovalStates(prev => {
          const newState = { ...prev }
          delete newState[userId]
          return newState
        })
      } else {
        setMessage({ type: 'error', text: data.error })
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to process user action' })
    } finally {
      setProcessing(null)
    }
  }

  const handlePaymentAction = async (paymentId: string, action: 'approve' | 'reject') => {
    try {
      setProcessing(paymentId)
      const response = await fetch('/api/admin/pending-payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId, action })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message })
        setPendingPayments(prev => prev.filter(payment => payment.id !== paymentId))
      } else {
        setMessage({ type: 'error', text: data.error })
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to process payment action' })
    } finally {
      setProcessing(null)
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pending Approvals</h2>
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pending Approvals</h2>
          <p className="text-muted-foreground">
            Review and approve user registrations and payment requests
          </p>
        </div>
        <Button onClick={fetchData} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending User Approvals
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingUsers.length}</div>
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
            <div className="text-2xl font-bold">{pendingPayments.length}</div>
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
            Review new customer registrations and assign customer numbers
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
            <div className="space-y-6">
              {pendingUsers.map((user) => {
                const state = approvalStates[user.id] || { userId: user.id, customerNo: '', isChecking: false, isAvailable: null, error: '' }
                
                return (
                  <div key={user.id} className="p-6 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
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
                            {user.customer?.phone && (
                              <div className="flex items-center space-x-1">
                                <Phone className="h-3 w-3" />
                                <span>{user.customer.phone}</span>
                              </div>
                            )}
                          </div>
                          {user.customer?.address && (
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span className="truncate max-w-xs">{user.customer.address}</span>
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground">
                            Registered: {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor={`customerNo-${user.id}`}>Customer Number *</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id={`customerNo-${user.id}`}
                            placeholder="e.g., PDAM-001"
                            value={state.customerNo}
                            onChange={(e) => handleCustomerNoChange(user.id, e.target.value)}
                            className={`${
                              state.isAvailable === false ? 'border-red-500' : 
                              state.isAvailable === true ? 'border-green-500' : ''
                            }`}
                          />
                          {state.isChecking && (
                            <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
                          )}
                          {state.isAvailable === true && (
                            <Check className="h-4 w-4 text-green-600" />
                          )}
                          {state.isAvailable === false && (
                            <AlertCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        {state.error && (
                          <p className="text-sm text-red-600">{state.error}</p>
                        )}
                        {state.isAvailable === true && (
                          <p className="text-sm text-green-600">Customer number is available</p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-green-600 border-green-600 hover:bg-green-50"
                          onClick={() => handleUserAction(user.id, 'approve')}
                          disabled={
                            processing === user.id || 
                            !state.customerNo.trim() || 
                            state.isAvailable === false ||
                            state.isChecking
                          }
                        >
                          <Check className="h-4 w-4 mr-1" />
                          {processing === user.id ? 'Processing...' : 'Approve'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 border-red-600 hover:bg-red-50"
                          onClick={() => handleUserAction(user.id, 'reject')}
                          disabled={processing === user.id}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
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
              {pendingPayments.map((payment) => (
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-green-600 border-green-600 hover:bg-green-50"
                      onClick={() => handlePaymentAction(payment.id, 'approve')}
                      disabled={processing === payment.id}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      {processing === payment.id ? 'Processing...' : 'Approve'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => handlePaymentAction(payment.id, 'reject')}
                      disabled={processing === payment.id}
                    >
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