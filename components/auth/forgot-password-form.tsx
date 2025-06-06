"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Password reset request for:", email)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 w-16 h-16">
            <Image
              src="/assets/forgot-password.svg"
              alt="Email Sent"
              width={64}
              height={64}
              className="w-full h-full"
            />
          </div>
          <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
          <CardDescription>
            We&apos;ve sent a password reset link to {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Please check your email and click the link to reset your password.
            If you don&apos;t see the email, check your spam folder.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-6 pt-6">
          <Button 
            onClick={() => setIsSubmitted(false)} 
            variant="outline" 
            className="w-full h-11"
          >
            Try Another Email
          </Button>
          <div className="text-center text-sm pt-2">
            Remember your password?{" "}
            <Link href="/login" className="text-primary hover:underline" prefetch={true}>
              Back to login
            </Link>
          </div>
        </CardFooter>
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
      <form onSubmit={handleSubmit}>
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
            <Link href="/login" className="text-primary hover:underline" prefetch={true}>
              Back to login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}