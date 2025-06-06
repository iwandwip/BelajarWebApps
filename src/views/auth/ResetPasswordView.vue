<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter your new password below
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">New Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              autocomplete="new-password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-500': errors.password }"
              placeholder="Enter your new password"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password }}
            </p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              autocomplete="new-password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              :class="{ 'border-red-500': errors.confirmPassword }"
              placeholder="Confirm your new password"
            />
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">
              {{ errors.confirmPassword }}
            </p>
          </div>
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
            {{ authStore.loading ? 'Resetting...' : 'Reset password' }}
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { resetPasswordSchema } from '@/lib/validation'
import type { ResetPasswordForm } from '@/lib/validation'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const form = ref<ResetPasswordForm>({
  token: '',
  password: '',
  confirmPassword: ''
})

const errors = ref<Partial<Record<keyof ResetPasswordForm, string>>>({})
const error = ref('')
const success = ref('')

onMounted(() => {
  const token = route.params.token as string
  if (!token) {
    router.push('/forgot-password')
    return
  }
  form.value.token = token
})

const handleSubmit = async () => {
  errors.value = {}
  error.value = ''
  success.value = ''

  const result = resetPasswordSchema.safeParse(form.value)
  if (!result.success) {
    result.error.errors.forEach((err) => {
      if (err.path[0]) {
        errors.value[err.path[0] as keyof ResetPasswordForm] = err.message
      }
    })
    return
  }

  try {
    const response = await authStore.resetPassword(form.value)
    if (response.success) {
      success.value = 'Password reset successfully! Redirecting to login...'
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || err.message || 'Failed to reset password'
  }
}
</script>