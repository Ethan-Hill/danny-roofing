<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Recent Inquiries</h3>
        </template>
        <div class="space-y-4">
          <div v-for="inquiry in recentInquiries" :key="inquiry.id" class="p-4 bg-gray-50 rounded">
            <p class="font-medium">{{ inquiry.name }}</p>
            <p class="text-sm text-gray-600">{{ inquiry.email }}</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Quick Actions</h3>
        </template>
        <div class="space-y-4">
          <UButton block to="/admin/pages/new">Add New Page</UButton>
          <UButton block to="/admin/services/new">Add New Service</UButton>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Statistics</h3>
        </template>
        <div class="space-y-4">
          <p>Total Pages: {{ stats.totalPages }}</p>
          <p>Total Services: {{ stats.totalServices }}</p>
          <p>Pending Inquiries: {{ stats.pendingInquiries }}</p>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const stats = ref({
  totalPages: 0,
  totalServices: 0,
  pendingInquiries: 0
})

const recentInquiries = ref([])

// Fetch dashboard data when component mounts
onMounted(async () => {
  // Implementation for fetching dashboard data will go here
})
</script>