<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot your password?
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            required
            class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            :class="{ 'border-red-500': errors.email }"
            placeholder="Enter your email address"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">
            {{ errors.email }}
          </p>
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {{ error }}
        </div>

        <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {{ success }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="authStore.loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {{ authStore.loading ? 'Sending...' : 'Send reset link' }}
          </button>
        </div>

        <div class="text-center">
          <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
            Back to login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { forgotPasswordSchema } from '@/lib/validation'
import type { ForgotPasswordForm } from '@/lib/validation'

const authStore = useAuthStore()

const form = ref<ForgotPasswordForm>({
  email: ''
})

const errors = ref<Partial<Record<keyof ForgotPasswordForm, string>>>({})
const error = ref('')
const success = ref('')

const handleSubmit = async () => {
  errors.value = {}
  error.value = ''
  success.value = ''

  const result = forgotPasswordSchema.safeParse(form.value)
  if (!result.success) {
    result.error.errors.forEach((err) => {
      if (err.path[0]) {
        errors.value[err.path[0] as keyof ForgotPasswordForm] = err.message
      }
    })
    return
  }

  try {
    const response = await authStore.forgotPassword(form.value)
    if (response.success) {
      success.value = 'Password reset link has been sent to your email address.'
      form.value.email = ''
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || err.message || 'Failed to send reset link'
  }
}
</script>