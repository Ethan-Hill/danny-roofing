<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
    <PublicNavbar v-if="!isAdminRoute" />
    <AdminNavbar v-else />
    <main class="flex-grow">
      <div :class="{ 'container mx-auto': isAdminRoute }">
        <slot />
      </div>
    </main>
    <PublicFooter v-if="!isAdminRoute" />
  </div>
</template>

<script setup>
const route = useRoute()
const isAdminRoute = computed(() => route?.path?.startsWith('/admin') ?? false)
</script>