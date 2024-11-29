<template>
  <nav class="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="text-xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          D&A Roofing Solutions
        </NuxtLink>
        <div class="flex items-center space-x-6">
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-4">
            <UButton
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              variant="ghost"
              color="gray"
              class="font-medium"
            >
              {{ item.label }}
            </UButton>
          </div>
          <!-- Mobile Menu Button -->
          <UButton
            color="gray"
            variant="ghost"
            class="md:hidden"
            @click="isMenuOpen = true"
          >
            <ClientOnly>
              <UIcon name="i-heroicons-bars-3" />
            </ClientOnly>
          </UButton>
        </div>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu Modal -->
  <UModal v-model="isMenuOpen" class="md:hidden">
    <div class="p-4 space-y-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">Menu</h2>
        <UButton color="gray" variant="ghost" @click="isMenuOpen = false">
          <ClientOnly>
            <UIcon name="i-heroicons-x-mark" />
          </ClientOnly>
        </UButton>
      </div>
      <div class="space-y-2">
        <UButton
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          variant="ghost"
          color="gray"
          class="w-full justify-start"
          @click="isMenuOpen = false"
        >
          <ClientOnly>
            <UIcon :name="getIconForRoute(item.to)" class="mr-2" />
          </ClientOnly>
          {{ item.label }}
        </UButton>
      </div>
    </div>
  </UModal>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' }
]

function getIconForRoute(route) {
  const icons = {
    '/': 'i-heroicons-home',
    '/services': 'i-heroicons-wrench',
    '/about': 'i-heroicons-information-circle',
    '/contact': 'i-heroicons-envelope'
  }
  return icons[route]
}
</script>