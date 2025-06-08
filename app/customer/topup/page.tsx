"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  CreditCard, 
  Droplets, 
  Calculator,
  CheckCircle,
  Clock
} from "lucide-react"

export default function CustomerTopUpPage() {
  const { data: session } = useSession()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const quickAmounts = [
    { amount: 50000, quota: 500 },
    { amount: 100000, quota: 1000 },
    { amount: 200000, quota: 2000 },
    { amount: 500000, quota: 5000 }
  ]

  const paymentMethods = [
    { id: "bank_transfer", name: "Bank Transfer", description: "Transfer to PDAM bank account" },
    { id: "mobile_banking", name: "Mobile Banking", description: "Pay using mobile banking app" },
    { id: "digital_wallet", name: "Digital Wallet", description: "OVO, GoPay, DANA" },
    { id: "cash", name: "Cash Payment", description: "Pay at PDAM office" }
  ]

  const currentQuota = session?.user?.waterQuota || 0
  const pricePerLiter = 100

  const calculateQuota = (amount: number) => {
    return Math.floor(amount / pricePerLiter)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setSubmitSuccess(true)
      setIsSubmitting(false)
    }, 2000)
  }

  if (submitSuccess) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Top-up Request Submitted</h2>
          <p className="text-muted-foreground">
            Your payment request has been submitted for approval
          </p>
        </div>

        <Card className="max-w-2xl">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Request Submitted Successfully!</h3>
              <p className="text-muted-foreground">
                Your top-up request is being processed by our admin team. You will receive a notification once approved.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Processing Time</span>
                </div>
                <p className="text-blue-700 text-sm">
                  Top-up requests are typically processed within 1-2 business hours during office hours.
                </p>
              </div>
              <Button onClick={() => setSubmitSuccess(false)} className="w-full">
                Make Another Top-up
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Top-up Water Quota</h2>
        <p className="text-muted-foreground">
          Add water quota to your account - Customer {session?.user?.customerNo}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Droplets className="h-5 w-5" />
                <span>Current Account Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="text-center p-4 border rounded-lg">
                  <Droplets className="mx-auto h-8 w-8 text-blue-500 mb-2" />
                  <div className="text-2xl font-bold">{currentQuota}L</div>
                  <p className="text-sm text-muted-foreground">Current Quota</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Calculator className="mx-auto h-8 w-8 text-green-500 mb-2" />
                  <div className="text-2xl font-bold">Rp 100/L</div>
                  <p className="text-sm text-muted-foreground">Price per Liter</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Amount</CardTitle>
                <CardDescription>
                  Choose a quick amount or enter a custom amount
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 md:grid-cols-2">
                  {quickAmounts.map((item) => (
                    <Button
                      key={item.amount}
                      type="button"
                      variant={selectedAmount === item.amount ? "default" : "outline"}
                      className="h-16 flex-col"
                      onClick={() => {
                        setSelectedAmount(item.amount)
                        setCustomAmount("")
                      }}
                    >
                      <span className="font-semibold">Rp {item.amount.toLocaleString()}</span>
                      <span className="text-sm opacity-70">{item.quota}L quota</span>
                    </Button>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-amount">Custom Amount (Rupiah)</Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setSelectedAmount(null)
                    }}
                    min="10000"
                    step="1000"
                  />
                  {customAmount && (
                    <p className="text-sm text-muted-foreground">
                      = {calculateQuota(parseInt(customAmount) || 0)}L water quota
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  Choose your preferred payment method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <Button
                      key={method.id}
                      type="button"
                      variant={selectedMethod === method.id ? "default" : "outline"}
                      className="w-full justify-start h-auto p-4"
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="text-left">
                        <div className="font-medium">{method.name}</div>
                        <div className="text-sm opacity-70">{method.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              className="w-full h-12" 
              disabled={(!selectedAmount && !customAmount) || !selectedMethod || isSubmitting}
            >
              {isSubmitting ? (
                "Processing..."
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Submit Top-up Request
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-medium">
                    Rp {(selectedAmount || parseInt(customAmount) || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Water Quota:</span>
                  <span className="font-medium">
                    {calculateQuota(selectedAmount || parseInt(customAmount) || 0)}L
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Current Quota:</span>
                  <span>{currentQuota}L</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>New Total Quota:</span>
                    <span>
                      {currentQuota + calculateQuota(selectedAmount || parseInt(customAmount) || 0)}L
                    </span>
                  </div>
                </div>
              </div>
              
              {selectedMethod && (
                <div className="pt-2 border-t">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <Badge variant="outline" className="ml-2">
                      {paymentMethods.find(m => m.id === selectedMethod)?.name}
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              Top-up requests require admin approval and are typically processed within 1-2 business hours.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}