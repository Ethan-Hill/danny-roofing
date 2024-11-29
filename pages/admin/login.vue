<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to Dashboard
        </h2>
      </div>
      <UCard>
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <UFormGroup 
              label="Email address"
              :error="errors.email"
            >
              <UInput
                v-model="form.email"
                type="email"
                autocomplete="email"
                required
                @blur="validateField('email')"
              />
            </UFormGroup>
          </div>

          <div>
            <UFormGroup 
              label="Password"
              :error="errors.password"
            >
              <UInput
                v-model="form.password"
                type="password"
                autocomplete="current-password"
                required
                @blur="validateField('password')"
              />
            </UFormGroup>
          </div>

          <div>
            <UButton
              type="submit"
              block
              :loading="loading"
              :disabled="!isValid"
            >
              Sign in
            </UButton>
          </div>

          <div class="text-center">
            <NuxtLink to="/admin/signup" class="text-sm text-gray-600 hover:text-gray-900">
              Need an account? Sign up
            </NuxtLink>
          </div>
        </form>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { z } from 'zod'

const client = useSupabaseClient()
const router = useRouter()

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

const form = ref({
  email: '',
  password: ''
})

const errors = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const isValid = computed(() => {
  return !Object.values(errors.value).some(error => error) &&
         Object.values(form.value).every(value => value)
})

const validateField = (field) => {
  try {
    const schema = loginSchema.pick({ [field]: true })
    schema.parse(form.value)
    errors.value[field] = ''
  } catch (error) {
    errors.value[field] = error.errors[0].message
  }
}

const validateForm = () => {
  try {
    loginSchema.parse(form.value)
    return true
  } catch (error) {
    error.errors.forEach(err => {
      errors.value[err.path[0]] = err.message
    })
    return false
  }
}

const handleLogin = async () => {
  if (!validateForm()) return

  try {
    loading.value = true
    const { error } = await client.auth.signInWithPassword({
      email: form.value.email,
      password: form.value.password
    })
    
    if (error) throw error
    
    router.push('/admin')
  } catch (error) {
    console.error('Error:', error.message)
    useToast().add({
      title: 'Error',
      description: 'Invalid email or password',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}
</script>