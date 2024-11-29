<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8">Our Services</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <UCard v-for="service in services" :key="service.title">
        <template #header>
          <h2 class="text-xl font-semibold">{{ service.title }}</h2>
        </template>
        <p class="text-gray-600 dark:text-gray-300">{{ service.description }}</p>
      </UCard>
    </div>
  </div>
</template>

<script setup>
const services = [
  {
    title: 'Roof Installation',
    description: 'Professional installation of new roofs with high-quality materials and expert craftsmanship.'
  },
  {
    title: 'Roof Repair',
    description: 'Quick and reliable repair services for all types of roof damage and leaks.'
  },
  {
    title: 'Maintenance',
    description: 'Regular maintenance and inspection services to extend the life of your roof.'
  },
  {
    title: 'Emergency Services',
    description: '24/7 emergency repair services for urgent roofing problems.'
  },
  {
    title: 'Gutter Installation',
    description: 'Installation and repair of gutters and drainage systems.'
  },
  {
    title: 'Inspection',
    description: 'Thorough roof inspections and detailed condition reports.'
  }
]
</script>
