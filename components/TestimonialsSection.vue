<template>
  <section class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="testimonial in testimonials" :key="testimonial.id" 
           class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center mb-4">
          <UAvatar 
            :src="testimonial.avatar" 
            :alt="`${testimonial.name}'s photo`"
            size="lg" 
            class="bg-gray-100"
          />
          <div class="ml-4">
            <h4 class="font-semibold dark:text-black">{{ testimonial.name }}</h4>
            <p class="text-gray-600">{{ testimonial.location }}</p>
          </div>
        </div>
        <p class="text-gray-700">{{ testimonial.content }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = ref([
  {
    id: 1,
    name: 'John Smith',
    location: 'Local Homeowner',
    content: 'Excellent service! They completed the roof replacement efficiently and professionally. The team was courteous and kept the work area clean throughout the project.',
    avatar: '/img/avatars/default-1.svg'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    location: 'Business Owner',
    content: 'Very reliable team. They handled our commercial roofing project with great expertise and finished ahead of schedule.',
    avatar: '/img/avatars/default-2.svg'
  },
  {
    id: 3,
    name: 'Mike Wilson',
    location: 'Property Manager',
    content: 'Outstanding work on multiple properties. Their attention to detail and commitment to quality is impressive.',
    avatar: '/img/avatars/default-3.svg'
  }
])
</script>