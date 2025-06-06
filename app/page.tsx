import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">PDAM Management System</CardTitle>
            <CardDescription>
              Water distribution management and leak detection system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-muted-foreground mb-6">
              Welcome! Please choose an option to continue:
            </div>
            
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/login">
                  Sign In to Your Account
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link href="/register">
                  Create New Account
                </Link>
              </Button>
              
              <div className="text-center">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t text-center">
              <p className="text-xs text-muted-foreground">
                PDAM Management System v1.0<br />
                Water Quality Monitoring & Customer Management
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}