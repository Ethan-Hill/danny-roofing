<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Create New Page</h1>
    </div>

    <UCard>
      <form @submit.prevent="savePage" class="space-y-6">
        <UFormGroup 
          label="Page Title"
          :error="errors.title"
        >
          <UInput
            v-model="form.title"
            placeholder="Enter page title"
            @blur="validateField('title')"
          />
        </UFormGroup>

        <UFormGroup 
          label="URL Slug"
          :error="errors.slug"
        >
          <UInput
            v-model="form.slug"
            placeholder="enter-url-slug"
            @blur="validateField('slug')"
          />
        </UFormGroup>

        <UFormGroup 
          label="Content"
          :error="errors.content"
        >
          <UTextarea
            v-model="form.content"
            rows="10"
            placeholder="Enter page content (Markdown supported)"
            @blur="validateField('content')"
          />
        </UFormGroup>

        <div class="flex justify-end space-x-4">
          <UButton
            color="gray"
            variant="ghost"
            to="/admin/pages"
          >
            Cancel
          </UButton>
          <UButton
            type="submit"
            :loading="loading"
            :disabled="!isValid"
          >
            Create Page
          </UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>

<script setup>
import { pageSchema } from '~/utils/validation'

definePageMeta({
  middleware: 'auth'
})

const client = useSupabaseClient()
const router = useRouter()

const form = ref({
  title: '',
  slug: '',
  content: ''
})

const errors = ref({
  title: '',
  slug: '',
  content: ''
})

const loading = ref(false)
const isValid = computed(() => {
  return !Object.values(errors.value).some(error => error) &&
         Object.values(form.value).every(value => value)
})

const validateField = (field) => {
  try {
    const schema = pageSchema.pick({ [field]: true })
    schema.parse(form.value)
    errors.value[field] = ''
  } catch (error) {
    errors.value[field] = error.errors[0].message
  }
}

const validateForm = () => {
  try {
    pageSchema.parse(form.value)
    return true
  } catch (error) {
    error.errors.forEach(err => {
      errors.value[err.path[0]] = err.message
    })
    return false
  }
}

const savePage = async () => {
  if (!validateForm()) return

  try {
    loading.value = true
    const { error } = await client
      .from('pages')
      .insert(form.value)
    
    if (error) throw error

    useToast().add({
      title: 'Success',
      description: 'Page created successfully',
      color: 'green'
    })
    
    router.push('/admin/pages')
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