<template>
  <nav class="bg-gray-800 dark:bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-3">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-8">
          <NuxtLink to="/admin" class="text-xl font-bold text-white">Dashboard</NuxtLink>
          <NuxtLink to="/admin/pages" class="text-gray-300 hover:text-white">Pages</NuxtLink>
          <NuxtLink to="/admin/services" class="text-gray-300 hover:text-white">Services</NuxtLink>
          <NuxtLink to="/admin/inquiries" class="text-gray-300 hover:text-white">Inquiries</NuxtLink>
        </div>
        <div class="flex items-center space-x-4">
          <UButton color="primary" variant="solid" @click="handleLogout">Logout</UButton>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useSupabaseClient} from '#imports'

const client = useSupabaseClient()

const handleLogout = async () => {
  await client.auth.signOut()
  navigateTo('/admin/login')
}
</script>