<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section -->
    <div class="relative bg-primary-600 text-white pb-24">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="container mx-auto px-4 py-20 relative">
        <h1 class="text-5xl md:text-6xl font-bold mb-4">About D&A Roofing Solutions</h1>
        <p class="text-xl md:text-2xl max-w-2xl opacity-90">
          Building trust through quality craftsmanship and exceptional service since 1995
        </p>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 -mt-16 relative z-10">
        <UCard v-for="stat in stats" :key="stat.label" class="text-center">
          <h3 class="text-3xl md:text-4xl font-bold text-primary-600">{{ stat.value }}</h3>
          <p class="text-gray-600 dark:text-gray-400 mt-2">{{ stat.label }}</p>
        </UCard>
      </div>
    </div>

    <!-- Our Story Section -->
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Founded in 1995, D&A Roofing Solutions has grown from a small family business to one of the most trusted names in roofing. Our journey is built on a foundation of quality, integrity, and dedication to our craft.
        </p>
      </div>

      <!-- Timeline -->
      <div class="max-w-4xl mx-auto space-y-8">
        <div v-for="(milestone, index) in milestones" :key="index" class="flex items-center gap-8">
          <div class="w-24 text-right font-bold text-primary-600">{{ milestone.year }}</div>
          <div class="flex-grow">
            <UCard>
              <h3 class="text-xl font-semibold mb-2">{{ milestone.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400">{{ milestone.description }}</p>
            </UCard>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="bg-gray-100 dark:bg-gray-800 py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">Meet Our Team</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard v-for="member in team" :key="member.name" class="text-center">
            <UAvatar
              :src="member.avatar"
              :alt="`${member.name}'s photo`"
              size="2xl"
              class="mb-4 mx-auto"
            />
            <h3 class="text-xl font-semibold">{{ member.name }}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ member.role }}</p>
            <p class="text-sm">{{ member.bio }}</p>
          </UCard>
        </div>
      </div>
    </div>

    <!-- Values Section -->
    <div class="container mx-auto px-4 py-16">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">Our Core Values</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <UCard v-for="value in values" :key="value.title" class="text-center">
          <UIcon :name="value.icon" class="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 class="text-xl font-semibold mb-4">{{ value.title }}</h3>
          <p class="text-gray-600 dark:text-gray-400">{{ value.description }}</p>
        </UCard>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-primary-600 text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Work Together?</h2>
        <p class="text-xl mb-8 opacity-90">Let's discuss your roofing needs and how we can help.</p>
        <UButton
          to="/contact"
          size="xl"
          color="white"
          variant="solid"
          class="font-semibold"
        >
          Contact Us Today
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { value: '25+', label: 'Years Experience' },
  { value: '1000+', label: 'Projects Completed' },
  { value: '100%', label: 'Satisfaction Rate' },
  { value: '50+', label: 'Team Members' }
]

const team = [
  {
    name: 'John Smith',
    role: 'Founder & CEO',
    avatar: '/img/avatars/default-1.png',
    bio: 'With over 25 years of experience, John leads our team with passion and expertise.'
  },
  {
    name: 'Sarah Johnson',
    role: 'Operations Manager',
    avatar: '/img/avatars/default-2.png',
    bio: 'Sarah ensures every project runs smoothly from start to finish.'
  },
  {
    name: 'Mike Williams',
    role: 'Lead Contractor',
    avatar: '/img/avatars/default-3.png',
    bio: 'Mike brings technical excellence and attention to detail to every project.'
  }
]

const milestones = [
  {
    year: '1995',
    title: 'Company Founded',
    description: 'Started as a small family business with a commitment to quality roofing.'
  },
  {
    year: '2005',
    title: 'Major Expansion',
    description: 'Expanded services to commercial properties and grew our team.'
  },
  {
    year: '2015',
    title: 'Industry Recognition',
    description: 'Received multiple awards for excellence in roofing and customer service.'
  },
  {
    year: '2023',
    title: 'Sustainability Focus',
    description: 'Launched green roofing solutions and eco-friendly practices.'
  }
]

const values = [
  {
    title: 'Quality First',
    icon: 'i-heroicons-star',
    description: 'We never compromise on the quality of our materials or workmanship.'
  },
  {
    title: 'Customer Focus',
    icon: 'i-heroicons-heart',
    description: 'Your satisfaction is our top priority. We listen, adapt, and deliver.'
  },
  {
    title: 'Innovation',
    icon: 'i-heroicons-light-bulb',
    description: 'We stay ahead with the latest roofing technologies and techniques.'
  }
]
</script>
