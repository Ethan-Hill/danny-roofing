<template>
  <div v-if="error" class="container mx-auto px-4 py-12">
    <h1 class="text-2xl font-bold text-red-600 mb-4">{{ error }}</h1>
    <NuxtLink to="/" class="text-primary-600 hover:text-primary-800">
      Return to Home
    </NuxtLink>
  </div>

  <div v-else-if="loading" class="container mx-auto px-4 py-12">
    <div class="flex items-center justify-center">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary-500" />
      <span class="ml-2 text-gray-600">Loading page...</span>
    </div>
  </div>

  <article v-else class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8">{{ page.value?.title }}</h1>
    <div class="prose prose-lg max-w-none dark:prose-invert" v-html="renderedContent" />
  </article>
</template>

<script setup>
import { marked } from 'marked'
import { useFetch, useRoute, createError } from 'nuxt/app'

const route = useRoute()

const { data: page, error: pageError, pending: loading } = await useFetch(`/api/pages/${route.params.slug}`, {
  key: route.params.slug
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found'
  })
}

const error = ref(null)

// Computed property to render markdown content
const renderedContent = computed(() => {
  if (!page.value?.content) return ''
  return marked(page.value.content)
})

// Watch for 404 errors
watch(pageError, (newError) => {
  if (newError?.statusCode === 404) {
    error.value = 'Page not found'
  } else if (newError) {
    error.value = 'An error occurred while loading the page'
  }
})
</script>
