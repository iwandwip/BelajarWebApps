"use client"

import { useState, Suspense } from "react"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { PasswordInput } from "@/components/ui/password-input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import Image from "next/image"

function SignInFormContent() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        remember: formData.remember.toString(),
        redirect: false
      })

      if (result?.error) {
        setErrorMessage("Invalid credentials or account pending approval")
      } else if (result?.ok) {
        const callbackUrl = searchParams.get("callbackUrl")
        if (callbackUrl && callbackUrl.startsWith("/")) {
          window.location.href = callbackUrl
        } else {
          window.location.href = "/"
        }
      }
    } catch {
      setErrorMessage("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-4 w-16 h-16">
          <Image
            src="/assets/login.svg"
            alt="Login"
            width={64}
            height={64}
            className="w-full h-full"
          />
        </div>
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>
          Enter your credentials to access your PDAM account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-3">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-11"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="h-11"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              name="remember"
              checked={formData.remember}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, remember: checked as boolean }))
              }
              disabled={isLoading}
            />
            <Label htmlFor="remember" className="text-sm">
              Remember me for 30 days
            </Label>
          </div>
          
          <div className="text-right pt-2">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
              prefetch={true}
            >
              Forgot password?
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-6 pt-6">
          <Button type="submit" className="w-full h-11" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
          <div className="text-center text-sm pt-2">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline" prefetch={true}>
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}

function SignInFormFallback() {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-4 w-16 h-16">
          <Image
            src="/assets/login.svg"
            alt="Login"
            width={64}
            height={64}
            className="w-full h-full"
          />
        </div>
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>
          Loading sign in form...
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-11 bg-gray-200 rounded"></div>
          <div className="h-11 bg-gray-200 rounded"></div>
          <div className="h-11 bg-gray-200 rounded"></div>
        </div>
      </CardContent>
    </Card>
  )
}

export function SignInForm() {
  return (
    <Suspense fallback={<SignInFormFallback />}>
      <SignInFormContent />
    </Suspense>
  )
}