<template>
  <UModal v-model="isOpen" :ui="{ width: 'sm:max-w-2xl' }">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div class="text-xl font-semibold">Inquiry Details</div>
          <UBadge
            :color="inquiry.status === 'new' ? 'primary' : 'gray'"
            size="sm"
          >
            {{ inquiry.status }}
          </UBadge>
        </div>
      </template>

      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div class="text-sm text-gray-500">Customer Name</div>
            <div class="font-medium">{{ inquiry.name }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-500">Email</div>
            <div class="font-medium">{{ inquiry.email }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-500">Phone</div>
            <div class="font-medium">{{ inquiry.phone || 'Not provided' }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-500">Service</div>
            <div class="font-medium">{{ inquiry.service }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-500">Date Submitted</div>
            <div class="font-medium">{{ inquiry.created_at }}</div>
          </div>
        </div>
        
        <div>
          <div class="text-sm text-gray-500">Message</div>
          <div class="mt-1 whitespace-pre-wrap">{{ inquiry.message }}</div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton
            color="gray"
            variant="ghost"
            @click="isOpen = false"
          >
            Close
          </UButton>
          <UButton
            v-if="inquiry.status !== 'archived'"
            color="primary"
            @click="$emit('archive')"
          >
            Archive Inquiry
          </UButton>
          <UButton
            v-else
            color="primary"
            @click="$emit('unarchive')"
          >
            Unarchive Inquiry
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
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

const props = defineProps<{
  modelValue: boolean
  inquiry: Inquiry
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'archive': []
  'unarchive': []
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>
