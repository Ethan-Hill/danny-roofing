<template>
  <div class="container mx-auto px-4 py-12">
    <BreadcrumbNav />
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Our Services</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <UCard v-for="service in services" :key="service.title">
        <template #header>
          <h2 class="text-xl font-semibold">{{ service.title }}</h2>
        </template>
        <p class="text-gray-600 dark:text-gray-300">{{ service.description }}</p>
      </UCard>
    </div>

    <!-- FAQ Section -->
    <section class="mt-16">
      <h2 class="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
      <div class="space-y-6">
        <UAccordion v-model="openedFaq" :items="faqs" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHead } from '#imports'

const openedFaq = ref([])
const faqs = ref([
  {
    label: 'How long does a typical roof installation take?',
    content: 'A typical residential roof installation usually takes 1-3 days, depending on the size and complexity of the project. Commercial projects may take longer.',
    icon: 'i-heroicons-question-mark-circle'
  },
  {
    label: 'What types of roofing materials do you work with?',
    content: 'We work with all major roofing materials including asphalt shingles, metal roofing, tile, slate, and flat roof systems.',
    icon: 'i-heroicons-question-mark-circle'
  },
  {
    label: 'Do you offer warranties on your work?',
    content: 'Yes, we offer comprehensive warranties on both materials and workmanship. Our standard workmanship warranty is 10 years.',
    icon: 'i-heroicons-question-mark-circle'
  },
  {
    label: 'How do I know if I need a roof repair or replacement?',
    content: 'We provide free inspections to assess your roof\'s condition. Factors include age, extent of damage, and cost-effectiveness of repairs versus replacement.',
    icon: 'i-heroicons-question-mark-circle'
  },
  {
    label: 'What should I do in case of a roofing emergency?',
    content: 'Contact our 24/7 emergency service line immediately. We\'ll dispatch a team to assess and address the situation to prevent further damage.',
    icon: 'i-heroicons-question-mark-circle'
  }
])

const services = [
  {
    title: 'Roof Installation',
    description: 'Professional installation of new roofs with high-quality materials and expert craftsmanship.'
  },
  {
    title: 'Roof Repair',
    description: 'Quick and reliable repair services for all types of roof damage.'
  },
  {
    title: 'Maintenance',
    description: 'Regular maintenance programs to extend the life of your roof and prevent costly repairs.'
  },
  {
    title: 'Emergency Services',
    description: '24/7 emergency repair services for urgent roofing problems.'
  },
  {
    title: 'Inspection',
    description: 'Thorough roof inspections to identify potential issues before they become major problems.'
  },
  {
    title: 'Gutter Services',
    description: 'Installation, repair, and maintenance of gutters and downspouts.'
  }
]

// SEO Configuration with FAQ Schema
useHead({
  title: 'Professional Roofing Services | D&A Roofing Solutions',
  meta: [
    {
      name: 'description',
      content: 'Comprehensive roofing services including installation, repair, maintenance, and emergency services. Expert solutions for residential and commercial properties.'
    },
    {
      property: 'og:title',
      content: 'Professional Roofing Services | D&A Roofing Solutions'
    },
    {
      property: 'og:description',
      content: 'Comprehensive roofing services including installation, repair, maintenance, and emergency services. Expert solutions for residential and commercial properties.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'keywords',
      content: 'roof installation, roof repair, roof maintenance, emergency roofing, commercial roofing, residential roofing, roof inspection, gutter services'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://danny-roofing.vercel.app/services'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.value.map(faq => ({
          '@type': 'Question',
          name: faq.label,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.content
          }
        }))
      })
    }
  ]
})
</script>
