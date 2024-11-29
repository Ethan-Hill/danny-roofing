<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Edit Service</h1>
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>
    
    <div v-if="loading" class="flex items-center justify-center p-12">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary-500" />
      <span class="ml-2 text-gray-600">Loading service...</span>
    </div>

    <form v-else @submit.prevent="updateService" class="max-w-2xl">
      <UCard class="space-y-6">
        <UFormGroup label="Title" class="mb-4">
          <UInput
            v-model="service.title"
            placeholder="Enter service title"
          />
        </UFormGroup>

        <UFormGroup label="Description" class="mb-4">
          <UTextarea
            v-model="service.description"
            :rows="4"
            placeholder="Enter service description"
          />
        </UFormGroup>

        <UFormGroup label="Icon" class="mb-4">
          <div class="grid grid-cols-4 gap-4 p-4 border rounded-lg">
            <button
              v-for="iconName in icons"
              :key="iconName"
              type="button"
              class="flex flex-col items-center justify-center p-4 rounded-lg transition-colors"
              :class="{
                'bg-primary-50 border-2 border-primary-500': service.icon === iconName,
                'hover:bg-gray-50 border-2 border-transparent': service.icon !== iconName
              }"
              @click="service.icon = iconName"
            >
              <UIcon
                :name="iconName"
                class="w-8 h-8 mb-2"
                :class="{
                  'text-primary-500': service.icon === iconName,
                  'text-gray-600': service.icon !== iconName
                }"
              />
              <span class="text-xs text-center" :class="{
                'text-primary-600': service.icon === iconName,
                'text-gray-600': service.icon !== iconName
              }">
                {{ iconName.replace('i-heroicons-', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }}
              </span>
            </button>
          </div>
        </UFormGroup>

        <div class="flex justify-end space-x-4">
          <UButton
            to="/admin/services"
            color="gray"
            variant="ghost"
          >
            Cancel
          </UButton>
          <UButton
            type="submit"
            :loading="loading"
          >
            Update Service
          </UButton>
        </div>
      </UCard>
    </form>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const client = useSupabaseClient()

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

const service = ref({
  title: '',
  description: '',
  icon: ''
})
const error = ref(null)
const loading = ref(true)

// Fetch the service data when the component mounts
onMounted(async () => {
  try {
    const { data, error: fetchError } = await client
      .from('services')
      .select('*')
      .eq('id', route.params.id)
      .single()
    
    if (fetchError) throw fetchError
    if (!data) throw new Error('Service not found')
    
    service.value = data
  } catch (err) {
    error.value = 'Failed to load service'
    console.error('Error loading service:', err)
  } finally {
    loading.value = false
  }
})

const updateService = async () => {
  loading.value = true
  try {
    const { error: updateError } = await client
      .from('services')
      .update(service.value)
      .eq('id', route.params.id)
    
    if (updateError) throw updateError
    
    router.push('/admin/services')
  } catch (err) {
    error.value = 'Failed to update service'
    console.error('Error updating service:', err)
    loading.value = false
  }
}
</script>
