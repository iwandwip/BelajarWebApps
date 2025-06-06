<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">{{ authStore.user?.name }}</span>
            <button 
              @click="authStore.logout"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div v-if="!authStore.isEmailVerified" class="mb-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div class="flex">
            <div class="ml-3">
              <h3 class="text-sm font-medium text-yellow-800">
                Email not verified
              </h3>
              <div class="mt-2 text-sm text-yellow-700">
                <p>Please check your email and click the verification link.</p>
              </div>
              <div class="mt-4">
                <button 
                  @click="resendVerification"
                  :disabled="authStore.loading"
                  class="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                >
                  {{ authStore.loading ? 'Sending...' : 'Resend verification email' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="border-4 border-dashed border-gray-200 rounded-lg p-8">
          <div class="text-center">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Welcome to Dashboard</h2>
            <p class="text-gray-600 mb-6">You are successfully logged in!</p>
            
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h3 class="text-lg font-semibold mb-4">User Information</h3>
              <div class="space-y-2 text-left">
                <p><strong>Name:</strong> {{ authStore.user?.name }}</p>
                <p><strong>Email:</strong> {{ authStore.user?.email }}</p>
                <p><strong>Email Verified:</strong> 
                  <span :class="authStore.isEmailVerified ? 'text-green-600' : 'text-red-600'">
                    {{ authStore.isEmailVerified ? 'Yes' : 'No' }}
                  </span>
                </p>
                <p><strong>Member Since:</strong> {{ formatDate(authStore.user?.createdAt) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const formatDate = (date: Date | string | undefined) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const resendVerification = async () => {
  try {
    const response = await authStore.resendVerification()
    if (response.success) {
      alert('Verification email sent! Please check your inbox.')
    }
  } catch (error: any) {
    alert(error.response?.data?.message || 'Failed to send verification email')
  }
}
</script>