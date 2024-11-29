<template>
  <div class="px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Customer Inquiries</h1>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary-500" />
      <span class="ml-2 text-gray-600">Loading inquiries...</span>
    </div>

    <div v-else>
      <div class="mb-8">
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
          New Inquiries
          <UBadge v-if="newInquiries.length" color="primary" size="sm">
            {{ newInquiries.length }}
          </UBadge>
        </h2>
        <UCard>
          <UTable
            :rows="newInquiries"
            :columns="columns"
            :empty-state="{ icon: 'i-heroicons-inbox', label: 'No new inquiries' }"
          >
            <template #status-data="{ row }">
              <UBadge
                color="primary"
                size="sm"
              >
                {{ row.status }}
              </UBadge>
            </template>
            <template #actions-data="{ row }">
              <div class="flex space-x-2">
                <UButton
                  icon="i-heroicons-eye"
                  color="gray"
                  variant="ghost"
                  size="sm"
                  title="View Inquiry"
                  @click="viewInquiry(row)"
                />
                <UButton
                  icon="i-heroicons-archive-box"
                  color="gray"
                  variant="ghost"
                  size="sm"
                  title="Archive Inquiry"
                  @click="updateInquiryStatus(row, 'archived')"
                />
              </div>
            </template>
          </UTable>
        </UCard>
      </div>

      <div>
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
          Archived Inquiries
          <UBadge v-if="archivedInquiries.length" color="gray" size="sm">
            {{ archivedInquiries.length }}
          </UBadge>
        </h2>
        <UCard>
          <UTable
            :rows="archivedInquiries"
            :columns="columns"
            :empty-state="{ icon: 'i-heroicons-archive-box', label: 'No archived inquiries' }"
          >
            <template #status-data="{ row }">
              <UBadge
                color="gray"
                size="sm"
              >
                {{ row.status }}
              </UBadge>
            </template>
            <template #actions-data="{ row }">
              <div class="flex space-x-2">
                <UButton
                  icon="i-heroicons-eye"
                  color="gray"
                  variant="ghost"
                  size="sm"
                  title="View Inquiry"
                  @click="viewInquiry(row)"
                />
                <UButton
                  icon="i-heroicons-arrow-up-tray"
                  color="gray"
                  variant="ghost"
                  size="sm"
                  title="Unarchive Inquiry"
                  @click="updateInquiryStatus(row, 'new')"
                />
              </div>
            </template>
          </UTable>
        </UCard>
      </div>
      
      <ConfirmModal
        v-model="showConfirmModal"
        :title="confirmTitle"
        :message="confirmMessage"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      />

      <InquiryDetailsModal
        v-model="showDetailsModal"
        :inquiry="selectedInquiry"
        @archive="selectedInquiry && updateInquiryStatus(selectedInquiry, 'archived')"
        @unarchive="selectedInquiry && updateInquiryStatus(selectedInquiry, 'new')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContentStore } from '~/stores/content'
import { ref, computed, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import { navigateTo } from '#app'

interface Inquiry {
  id: number
  name: string
  email: string
  phone?: string
  message: string
  status: string
  service: number | string
  created_at: string
  [key: string]: any
}

interface Service {
  id: number
  title: string
}

interface PendingAction {
  inquiry: Inquiry;
  status: string;
}

type PendingActionType = PendingAction | null

definePageMeta({
  middleware: 'auth'
})

const store = useContentStore()
const inquiries = computed(() => store.inquiries)
const services = computed(() => store.services)

// Modal state
const showConfirmModal = ref(false)
const showDetailsModal = ref(false)
const confirmTitle = ref('')
const confirmMessage = ref('')
const pendingAction = ref<PendingActionType>(null)
const selectedInquiry = ref<Inquiry>({
  id: 0,
  name: '',
  email: '',
  message: '',
  status: 'new',
  service: '',
  created_at: new Date().toISOString(),
})

const loading = ref(true)

const inquiriesWithServices = computed(() => {
  return inquiries.value.map(inquiry => ({
    ...inquiry,
    status: inquiry.status, // Preserve the status property
    service: services.value.find((s: Service) => s.id === inquiry.service)?.title || 'Not specified',
    created_at: new Date(inquiry.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }))
})

// Separate inquiries by status
const newInquiries = computed(() => {
  return inquiriesWithServices.value.filter(inquiry => inquiry.status !== 'archived')
})

const archivedInquiries = computed(() => {
  return inquiriesWithServices.value.filter(inquiry => inquiry.status === 'archived')
})

const columns = [
  {
    key: 'name',
    label: 'Customer Name'
  },
  {
    key: 'email',
    label: 'Email'
  },
  {
    key: 'service',
    label: 'Service'
  },
  {
    key: 'status',
    label: 'Status'
  },
  {
    key: 'created_at',
    label: 'Date'
  },
  {
    key: 'actions',
    label: 'Actions'
  }
]

onMounted(async () => {
  await store.fetchServices()
  await store.fetchInquiries()
  loading.value = false
})

const viewInquiry = (inquiry: Inquiry) => {
  selectedInquiry.value = inquiry
  showDetailsModal.value = true
}

const updateInquiryStatus = async (inquiry: Inquiry, status: string) => {
  const action = status === 'archived' ? 'archive' : 'unarchive'
  confirmTitle.value = 'Confirm Action'
  confirmMessage.value = `Are you sure you want to ${action} this inquiry?`
  pendingAction.value = { inquiry, status }
  showConfirmModal.value = true
}

const handleConfirm = async () => {
  if (!pendingAction.value) return

  const { inquiry, status } = pendingAction.value
  const client = useSupabaseClient()
  const { error } = await client.from('inquiries')
    .update({ status })
    .eq('id', inquiry.id)
  
  if (error) {
    console.error('Error updating inquiry:', error)
    return
  }

  // Refresh just this inquiry
  const { data: updatedInquiry } = await client
    .from('inquiries')
    .select('*')
    .eq('id', inquiry.id)
    .single()
  
  if (updatedInquiry) {
    store.updateInquiry(updatedInquiry)
  }
  
  pendingAction.value = null
}

const handleCancel = () => {
  pendingAction.value = null
}
</script>