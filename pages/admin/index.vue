<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Recent Inquiries</h3>
        </template>
        <div v-if="loading" class="flex justify-center py-4">
          <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin" />
        </div>
        <div v-else class="space-y-4">
          <div v-if="recentInquiries.length === 0" class="text-center text-gray-500 py-4">
            No recent inquiries
          </div>
          <div v-for="inquiry in recentInquiries" :key="inquiry.id" class="p-4 bg-gray-50 rounded">
            <p class="font-medium">{{ inquiry.name }}</p>
            <p class="text-sm text-gray-600">{{ inquiry.email }}</p>
            <p class="text-xs text-gray-400">{{ formatDate(inquiry.created_at) }}</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Quick Actions</h3>
        </template>
        <div class="space-y-4">
          <UButton block to="/admin/pages/new" icon="i-heroicons-document-plus">
            Add New Page
          </UButton>
          <UButton block to="/admin/services/new" icon="i-heroicons-wrench">
            Add New Service
          </UButton>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Statistics</h3>
        </template>
        <div v-if="loading" class="flex justify-center py-4">
          <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin" />
        </div>
        <div v-else class="space-y-4">
          <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span class="text-gray-600">Total Pages</span>
            <span class="font-semibold">{{ stats.totalPages }}</span>
          </div>
          <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span class="text-gray-600">Total Services</span>
            <span class="font-semibold">{{ stats.totalServices }}</span>
          </div>
          <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span class="text-gray-600">Pending Inquiries</span>
            <span class="font-semibold">{{ stats.pendingInquiries }}</span>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const loading = ref(true)
const stats = ref({
  totalPages: 0,
  totalServices: 0,
  pendingInquiries: 0
})
const recentInquiries = ref([])

// Format date helper function
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

// Fetch dashboard data
const fetchDashboardData = async () => {
  try {
    loading.value = true
    const { data } = await useFetch('/api/admin/stats')
    if (data.value) {
      stats.value = data.value.stats
      recentInquiries.value = data.value.recentInquiries
    }
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  } finally {
    loading.value = false
  }
}

// Fetch data when component mounts
onMounted(() => {
  fetchDashboardData()
})
</script>