<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div v-if="loading" class="space-y-4">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <h2 class="text-2xl font-bold text-gray-900">Verifying your email...</h2>
          <p class="text-gray-600">Please wait while we verify your email address.</p>
        </div>

        <div v-else-if="success" class="space-y-4">
          <div class="rounded-full h-12 w-12 bg-green-100 mx-auto flex items-center justify-center">
            <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900">Email verified successfully!</h2>
          <p class="text-gray-600">Your email has been verified. You can now access all features.</p>
          <div class="space-y-3">
            <router-link 
              to="/dashboard"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Go to Dashboard
            </router-link>
          </div>
        </div>

        <div v-else class="space-y-4">
          <div class="rounded-full h-12 w-12 bg-red-100 mx-auto flex items-center justify-center">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900">Verification failed</h2>
          <p class="text-gray-600">{{ error || 'The verification link is invalid or has expired.' }}</p>
          <div class="space-y-3">
            <button 
              @click="resendVerification"
              :disabled="authStore.loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {{ authStore.loading ? 'Sending...' : 'Resend verification email' }}
            </button>
            <router-link 
              to="/login"
              class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Login
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const loading = ref(true)
const success = ref(false)
const error = ref('')

onMounted(async () => {
  const token = route.params.token as string
  
  if (!token) {
    loading.value = false
    error.value = 'No verification token provided'
    return
  }

  try {
    const response = await authStore.verifyEmail(token)
    if (response.success) {
      success.value = true
    } else {
      error.value = response.message
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || err.message || 'Verification failed'
  } finally {
    loading.value = false
  }
})

const resendVerification = async () => {
  try {
    const response = await authStore.resendVerification()
    if (response.success) {
      alert('Verification email sent! Please check your inbox.')
    }
  } catch (err: any) {
    alert(err.response?.data?.message || 'Failed to send verification email')
  }
}
</script>