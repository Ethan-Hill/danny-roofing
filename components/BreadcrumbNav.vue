<template>
  <nav aria-label="Breadcrumb" class="px-4 py-2">
    <ol class="flex items-center space-x-2 text-sm">
      <li>
        <NuxtLink to="/" class="text-gray-500 hover:text-gray-700">Home</NuxtLink>
      </li>
      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
        <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
        <NuxtLink 
          :to="crumb.path" 
          :class="[
            index === breadcrumbs.length - 1 
              ? 'text-gray-900 font-medium' 
              : 'text-gray-500 hover:text-gray-700'
          ]"
          :aria-current="index === breadcrumbs.length - 1 ? 'page' : undefined"
        >
          {{ crumb.name }}
        </NuxtLink>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '#imports'

const route = useRoute()

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter(Boolean)
  return pathArray.map((path, index) => {
    return {
      name: path.charAt(0).toUpperCase() + path.slice(1),
      path: '/' + pathArray.slice(0, index + 1).join('/')
    }
  })
})

// Add structured data for breadcrumbs
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://danny-roofing.vercel.app'
          },
          ...breadcrumbs.value.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 2,
            name: crumb.name,
            item: `https://danny-roofing.vercel.app${crumb.path}`
          }))
        ]
      })
    }
  ]
})
</script>
