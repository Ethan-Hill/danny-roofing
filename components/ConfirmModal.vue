<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <div class="text-xl font-semibold">{{ title }}</div>
        </div>
      </template>

      <p class="text-gray-600">{{ message }}</p>

      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton
            color="gray"
            variant="ghost"
            @click="onCancel"
          >
            Cancel
          </UButton>
          <UButton
            color="primary"
            @click="onConfirm"
          >
            Confirm
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  title: string
  message: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  cancel: []
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

function onConfirm() {
  emit('confirm')
  isOpen.value = false
}

function onCancel() {
  emit('cancel')
  isOpen.value = false
}
</script>
