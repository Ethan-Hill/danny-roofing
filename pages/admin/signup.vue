<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create Admin Account
        </h2>
      </div>
      <UCard>
        <form class="space-y-6" @submit.prevent="handleSignup">
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
                autocomplete="new-password"
                required
                @blur="validateField('password')"
              />
            </UFormGroup>
          </div>

          <div>
            <UFormGroup 
              label="Confirm Password"
              :error="errors.confirmPassword"
            >
              <UInput
                v-model="form.confirmPassword"
                type="password"
                autocomplete="new-password"
                required
                @blur="validateField('confirmPassword')"
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
              Create Account
            </UButton>
          </div>

          <div class="text-center">
            <NuxtLink to="/admin/login" class="text-sm text-gray-600 hover:text-gray-900">
              Already have an account? Sign in
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

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

const form = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const isValid = computed(() => {
  return !Object.values(errors.value).some(error => error) &&
         Object.values(form.value).every(value => value)
})

const validateField = (field) => {
  try {
    const schema = signupSchema.pick({ [field]: true })
    schema.parse(form.value)
    errors.value[field] = ''
  } catch (error) {
    errors.value[field] = error.errors[0].message
  }
}

const validateForm = () => {
  try {
    signupSchema.parse(form.value)
    return true
  } catch (error) {
    error.errors.forEach(err => {
      errors.value[err.path[0]] = err.message
    })
    return false
  }
}

const handleSignup = async () => {
  if (!validateForm()) return

  try {
    loading.value = true
    const { error } = await client.auth.signUp({
      email: form.value.email,
      password: form.value.password,
      options: {
        data: {
          role: 'admin'
        }
      }
    })
    
    if (error) throw error

    useToast().add({
      title: 'Success',
      description: 'Account created successfully. Please check your email for verification.',
      color: 'green'
    })
    
    router.push('/admin/login')
  } catch (error) {
    console.error('Error:', error.message)
    useToast().add({
      title: 'Error',
      description: error.message,
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}
</script>