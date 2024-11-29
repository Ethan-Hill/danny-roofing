<template>
  <div class="px-4 py-16">
    <h1 class="text-4xl font-bold text-center mb-12">Contact Us</h1>
    
    <div class="max-w-2xl mx-auto">
      <ClientOnly>
        <UCard v-if="submitted">
          <div class="text-center py-8">
            <UIcon
              name="i-heroicons-check-circle"
              class="w-16 h-16 mx-auto mb-4 text-green-500"
            />
            <h2 class="text-2xl font-bold mb-2">Thank You!</h2>
            <p class="text-gray-600 mb-6">
              We've received your message and will get back to you soon.
            </p>
            <UButton
              color="gray"
              variant="ghost"
              @click="resetForm"
            >
              Send Another Message
            </UButton>
          </div>
        </UCard>
        <UCard v-else>
          <form @submit.prevent="submitInquiry" class="space-y-6">
            <UFormGroup label="Name">
              <UInput
                v-model="form.name"
                placeholder="Your name"
                required
              />
            </UFormGroup>

            <UFormGroup label="Email">
              <UInput
                v-model="form.email"
                type="email"
                placeholder="your@email.com"
                required
              />
            </UFormGroup>

            <UFormGroup label="Phone (Optional)">
              <UInput
                v-model="form.phone"
                type="tel"
                placeholder="Your phone number"
              />
            </UFormGroup>

            <UFormGroup label="Service Needed">
              <USelect
                v-model="form.service"
                :options="serviceOptions"
                placeholder="Select a service"
                required
                class="w-full"
              >
                <template #option="{ item }">
                  {{ item.label }}
                </template>
              </USelect>
            </UFormGroup>

            <UFormGroup label="Message">
              <UTextarea
                v-model="form.message"
                placeholder="Tell us about your project"
                required
              />
            </UFormGroup>

            <UButton
              type="submit"
              block
              :loading="loading"
            >
              Send Message
            </UButton>
          </form>
        </UCard>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHead } from '#imports'

// SEO Configuration
useHead({
  title: 'Contact D&A Roofing Solutions | Get a Free Quote',
  meta: [
    {
      name: 'description',
      content: 'Contact D&A Roofing Solutions for all your roofing needs. Get a free quote, schedule a consultation, or request emergency roofing services. Available 24/7 for your roofing emergencies.'
    },
    {
      property: 'og:title',
      content: 'Contact D&A Roofing Solutions | Get a Free Quote'
    },
    {
      property: 'og:description',
      content: 'Contact D&A Roofing Solutions for all your roofing needs. Get a free quote, schedule a consultation, or request emergency roofing services.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'keywords',
      content: 'roofing quote, roofing consultation, emergency roofing service, contact roofer, roofing estimate, roof inspection request'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://danny-roofing.vercel.app/contact'
    }
  ]
})

const loading = ref(false)
const submitted = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: ''
})

// Fetch services
const { data: services } = await useFetch('/api/services')

// Transform services into options format
const serviceOptions = computed(() => {
  if (!services.value) return []
  
  return (services.value || []).map(service => ({
    label: service.title,
    value: service.id.toString() // Ensure ID is a string
  }))
})

async function submitInquiry() {
  if (loading.value) return

  loading.value = true
  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: {
        ...form,
        service: form.service
      }
    })

    if (response.success) {
      submitted.value = true
    }
  } catch (error) {
    useToast().add({
      title: 'Error',
      description: error.message || 'Something went wrong. Please try again.',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}

function resetForm() {
  submitted.value = false
  form.name = ''
  form.email = ''
  form.phone = ''
  form.service = ''
  form.message = ''
}
</script>