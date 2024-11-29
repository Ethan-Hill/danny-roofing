<template>
  <footer class="bg-gray-800/90 dark:bg-gray-900/90 text-white py-12 mt-auto backdrop-blur-sm">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4 flex items-center">
            D&A Roofing Solutions
          </h3>
          <p class="text-gray-300">Professional roofing services for residential and commercial properties.</p>
          <div class="mt-6 flex space-x-4">
            <UButton
              v-for="social in socials"
              :key="social.icon"
              :icon="social.icon"
              color="white"
              variant="ghost"
              class="hover:scale-110 transition-transform"
              :aria-label="social.label"
            />
          </div>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-4 flex items-center">
            <UIcon name="i-heroicons-link" class="w-5 h-5 mr-2" />
            Quick Links
          </h4>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.to">
              <ULink
                :to="link.to"
                class="text-gray-300 hover:text-white transition-colors flex items-center"
              >
                <UIcon :name="link.icon" class="w-5 h-5 mr-2" />
                {{ link.label }}
              </ULink>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-4 flex items-center">
            <UIcon name="i-heroicons-phone" class="w-5 h-5 mr-2" />
            Contact Info
          </h4>
          <ul class="space-y-3 text-gray-300">
            <li class="flex items-center">
              <UIcon name="i-heroicons-phone" class="w-5 h-5 mr-2" />
              (555) 123-4567
            </li>
            <li class="flex items-center">
              <UIcon name="i-heroicons-envelope" class="w-5 h-5 mr-2" />
              info@proroofing.com
            </li>
            <li class="flex items-start">
              <UIcon name="i-heroicons-map-pin" class="w-5 h-5 mr-2 mt-1" />
              123 Roofing Street,<br>City, State 12345
            </li>
          </ul>
        </div>
      </div>

    </div>
      <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
        <p>&copy; {{ new Date().getFullYear() }} D&A Roofing Solutions. All rights reserved.</p>
      </div>
  </footer>
</template>

<script setup>
const quickLinks = [
  { label: 'Services', to: '/services', icon: 'i-heroicons-wrench' },
  { label: 'About Us', to: '/about', icon: 'i-heroicons-information-circle' },
  { label: 'Contact', to: '/contact', icon: 'i-heroicons-envelope' }
]

const socials = [
  { icon: 'i-simple-icons-facebook', label: 'Facebook' },
  { icon: 'i-simple-icons-twitter', label: 'Twitter' },
  { icon: 'i-simple-icons-instagram', label: 'Instagram' },
  { icon: 'i-simple-icons-linkedin', label: 'LinkedIn' }
]
</script>