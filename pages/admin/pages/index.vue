<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Pages Management</h1>
      <UButton
        icon="i-heroicons-plus"
        to="/admin/pages/new"
      >
        Add Page
      </UButton>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary-500" />
      <span class="ml-2 text-gray-600">Loading pages...</span>
    </div>

    <UCard v-else>
      <UTable
        :rows="pages"
        :columns="columns"
      >
        <template #actions-data="{ row }">
          <div class="flex space-x-2">
            <UButton
              icon="i-heroicons-pencil"
              color="gray"
              variant="ghost"
              size="sm"
              @click="editPage(row)"
            />
            <UButton
              icon="i-heroicons-trash"
              color="red"
              variant="ghost"
              size="sm"
              @click="deletePage(row)"
            />
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
const pages = computed(() => store.pages)
const loading = ref(true)

const columns = [
  {
    key: 'title',
    label: 'Page Title'
  },
  {
    key: 'slug',
    label: 'URL Slug'
  },
  {
    key: 'actions',
    label: 'Actions'
  }
]

onMounted(async () => {
  await store.fetchPages()
  loading.value = false
})

const editPage = (page) => {
  navigateTo(`/admin/pages/${page.id}/edit`)
}

const deletePage = async (page) => {
  if (await confirm('Are you sure you want to delete this page?')) {
    const client = useSupabaseClient()
    await client.from('pages').delete().eq('id', page.id)
    await store.fetchPages()
  }
}
</script>