<template>
  <section class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">Our Services</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="service in services" :key="service.id" class="bg-white p-6 rounded-lg shadow-md">
          <UIcon 
            :name="service.icon || 'i-heroicons-wrench'" 
            class="w-12 h-12 text-primary-600 mb-4" 
          />
        <h3 class="text-xl font-semibold mb-3 dark:text-black">{{ service.title }}</h3>
        <p class="text-gray-600">{{ service.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const { data: services } = await useFetch('/api/services', {
  default: () => []
})
</script>