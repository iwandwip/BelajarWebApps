"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [step, setStep] = useState<'email' | 'reset'>('email')
  const [resetData, setResetData] = useState({
    newPassword: "",
    confirmPassword: ""
  })

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Password reset request for:", email)
    setIsSubmitted(true)
    setTimeout(() => {
      setStep('reset')
      setIsSubmitted(false)
    }, 2000)
  }

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Password reset:", resetData)
    setStep('email')
    setEmail("")
    setResetData({ newPassword: "", confirmPassword: "" })
  }

  const handleResetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetData({
      ...resetData,
      [e.target.name]: e.target.value
    })
  }

  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 w-16 h-16">
            <Image
              src="/assets/forgot-password.svg"
              alt="Processing"
              width={64}
              height={64}
              className="w-full h-full"
            />
          </div>
          <CardTitle className="text-2xl font-bold">Processing Request</CardTitle>
          <CardDescription>
            Please wait while we verify your email
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground">
            Verifying email address...
          </p>
        </CardContent>
      </Card>
    )
  }

  if (step === 'reset') {
    return (
      <Card className="w-full">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 w-16 h-16">
            <Image
              src="/assets/forgot-password.svg"
              alt="Reset Password"
              width={64}
              height={64}
              className="w-full h-full"
            />
          </div>
          <CardTitle className="text-2xl font-bold">Reset Your Password</CardTitle>
          <CardDescription>
            Enter your new password for {email}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleResetSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="newPassword">New Password</Label>
              <PasswordInput
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password"
                value={resetData.newPassword}
                onChange={handleResetChange}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={resetData.confirmPassword}
                onChange={handleResetChange}
                required
                className="h-11"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-6 pt-6">
            <Button type="submit" className="w-full h-11">
              Update Password
            </Button>
            <div className="text-center text-sm pt-2">
              Remember your password?{" "}
              <Link href="/signin" className="text-primary hover:underline" prefetch={true}>
                Back to login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-4 w-16 h-16">
          <Image
            src="/assets/forgot-password.svg"
            alt="Forgot Password"
            width={64}
            height={64}
            className="w-full h-full"
          />
        </div>
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>
          Enter your email address and we&apos;ll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleEmailSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-6 pt-6">
          <Button type="submit" className="w-full h-11">
            Send Reset Link
          </Button>
          <div className="text-center text-sm pt-2">
            Remember your password?{" "}
            <Link href="/signin" className="text-primary hover:underline" prefetch={true}>
              Back to login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}