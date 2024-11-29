<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Services Management</h1>
      <UButton
        icon="i-heroicons-plus"
        to="/admin/services/new"
      >
        Add Service
      </UButton>
    </div>

    <UCard>
      <UTable
        :rows="services"
        :columns="columns"
        :loading="loading"
      >
        <template #actions-data="{ row }">
          <div class="flex space-x-2">
            <UButton
              icon="i-heroicons-pencil"
              color="gray"
              variant="ghost"
              size="sm"
              @click="editService(row)"
            />
            <UButton
              icon="i-heroicons-trash"
              color="red"
              variant="ghost"
              size="sm"
              @click="deleteService(row)"
            />
          </div>
        </template>
        <template #loading-state>
          <div class="flex items-center justify-center p-8">
            <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary-500" />
            <span class="ml-2 text-gray-600">Loading services...</span>
          </div>
        </template>
        <template #empty-state>
          <div class="flex flex-col items-center justify-center p-8 text-gray-500">
            <UIcon name="i-heroicons-inbox" class="w-12 h-12 mb-2" />
            <p>No services found</p>
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const store = useContentStore()
const services = computed(() => store.services)
const loading = ref(true)

const columns = [
  {
    key: 'title',
    label: 'Service Name'
  },
  {
    key: 'description',
    label: 'Description'
  },
  {
    key: 'actions',
    label: 'Actions'
  }
]

onMounted(async () => {
  try {
    await store.fetchServices()
  } finally {
    loading.value = false
  }
})

const editService = (service) => {
  navigateTo(`/admin/services/${service.id}/edit`)
}

const deleteService = async (service) => {
  if (await confirm('Are you sure you want to delete this service?')) {
    const client = useSupabaseClient()
    await client.from('services').delete().eq('id', service.id)
    await store.fetchServices()
  }
}

function handleSelect() {
  // Add function definition here
}

</script>