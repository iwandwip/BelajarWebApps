import { Suspense } from "react"
import { SignInForm } from "@/components/auth/signin-form"

function SignInPageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="animate-pulse">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="space-y-3">
                <div className="h-11 bg-gray-200 rounded"></div>
                <div className="h-11 bg-gray-200 rounded"></div>
                <div className="h-11 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInPageFallback />}>
      <SignInForm />
    </Suspense>
  )
}