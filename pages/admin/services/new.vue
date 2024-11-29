<template>
  <div class="px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Create New Service</h1>
    </div>

    <UCard>
      <form @submit.prevent="saveService" class="space-y-6">
        <UFormGroup 
          label="Service Title"
          :error="errors.title"
        >
          <UInput
            v-model="form.title"
            placeholder="Enter service title"
            @blur="validateField('title')"
          />
        </UFormGroup>

        <UFormGroup 
          label="Description"
          :error="errors.description"
        >
          <ClientOnly>
            <UTextarea
              v-model="form.description"
              :rows="4"
              placeholder="Enter service description"
              @blur="validateField('description')"
            />
          </ClientOnly>
        </UFormGroup>

        <UFormGroup 
          label="Icon"
          :error="errors.icon"
        >
          <div class="grid grid-cols-4 gap-4 p-4 border rounded-lg">
            <button
              v-for="iconName in icons"
              :key="iconName"
              type="button"
              class="flex flex-col items-center justify-center p-4 rounded-lg transition-colors"
              :class="{
                'bg-primary-50 border-2 border-primary-500': form.icon === iconName,
                'hover:bg-gray-50 border-2 border-transparent': form.icon !== iconName
              }"
              @click="form.icon = iconName"
            >
              <ClientOnly>
                <UIcon
                  :name="iconName"
                  class="w-8 h-8 mb-2"
                  :class="{
                    'text-primary-500': form.icon === iconName,
                    'text-gray-500': form.icon !== iconName
                  }"
                />
              </ClientOnly>
              <span class="text-xs text-gray-600">{{ iconName.replace('i-heroicons-', '') }}</span>
            </button>
          </div>
        </UFormGroup>

        <div class="flex justify-end space-x-4">
          <UButton
            type="button"
            variant="ghost"
            @click="router.back()"
          >
            Cancel
          </UButton>
          <UButton
            type="submit"
            :loading="loading"
            :disabled="!isValid"
          >
            Create Service
          </UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>

<script setup>
import { serviceSchema } from '~/utils/validation'

definePageMeta({
  middleware: 'auth'
})

const client = useSupabaseClient()
const router = useRouter()

const icons = [
  'i-heroicons-home',
  'i-heroicons-wrench-screwdriver',
  'i-heroicons-shield-check',
  'i-heroicons-truck',
  'i-heroicons-phone',
  'i-heroicons-cog-6-tooth',
  'i-heroicons-paint-brush',
  'i-heroicons-bolt',
  'i-heroicons-sparkles',
  'i-heroicons-calculator',
  'i-heroicons-chart-bar',
  'i-heroicons-clipboard-document-check'
]

const form = reactive({
  title: '',
  description: '',
  icon: ''
})

const errors = reactive({
  title: '',
  description: '',
  icon: ''
})

const loading = ref(false)
const isValid = computed(() => {
  return !Object.values(errors).some(error => error) &&
         Object.values(form).every(value => value)
})

const validateField = (field) => {
  try {
    const result = serviceSchema.pick({ [field]: true }).safeParse({ [field]: form[field] })
    if (result.success) {
      errors[field] = ''
    } else {
      errors[field] = result.error.errors[0].message
    }
  } catch (error) {
    errors[field] = error.message
  }
}

const validateForm = () => {
  const result = serviceSchema.safeParse(form)
  if (result.success) {
    Object.keys(errors).forEach(key => errors[key] = '')
    return true
  } else {
    result.error.errors.forEach(err => {
      errors[err.path[0]] = err.message
    })
    return false
  }
}

const saveService = async () => {
  if (loading.value || !validateForm()) return

  loading.value = true
  try {
    const { error } = await client
      .from('services')
      .insert(form)

    if (error) throw error

    useToast().add({
      title: 'Success',
      description: 'Service created successfully',
      color: 'green'
    })

    router.push('/admin/services')
  } catch (error) {
    console.error('Error:', error)
    useToast().add({
      title: 'Error',
      description: error.message || 'Failed to create service',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}
</script>