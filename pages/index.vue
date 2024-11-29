<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white py-32">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" :style="{ backgroundImage: 'url(\'data:image/svg+xml;base64,' + bgPattern + '\')' }" />
      </div>
      
      <div class="container mx-auto px-4 relative">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
            Transform Your Property with Expert Roofing Solutions
          </h1>
          <p class="text-xl md:text-2xl mb-10 text-blue-100 dark:text-blue-50">
            Professional roofing services that protect what matters most - your home and business
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton
              size="xl"
              color="white"
              to="/contact"
              icon="i-heroicons-phone-arrow-up-right"
              class="hover:bg-white hover:text-blue-700"
            >
              Get Free Estimate
            </UButton>
            <UButton
              size="xl"
              color="gray"
              variant="ghost"
              to="/services"
              icon="i-heroicons-clipboard-document-list"
              class="text-white hover:bg-white/20"
            >
              View Our Services
            </UButton>
          </div>
          
          <!-- Trust Indicators -->
          <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="flex flex-col items-center">
              <UIcon name="i-heroicons-trophy" class="w-10 h-10 mb-2 text-yellow-400 dark:text-yellow-300" />
              <div class="font-bold text-2xl text-white">15+</div>
              <div class="text-blue-100 dark:text-blue-50">Years Experience</div>
            </div>
            <div class="flex flex-col items-center">
              <UIcon name="i-heroicons-home" class="w-10 h-10 mb-2 text-yellow-400 dark:text-yellow-300" />
              <div class="font-bold text-2xl text-white">2,500+</div>
              <div class="text-blue-100 dark:text-blue-50">Projects Completed</div>
            </div>
            <div class="flex flex-col items-center">
              <UIcon name="i-heroicons-star" class="w-10 h-10 mb-2 text-yellow-400 dark:text-yellow-300" />
              <div class="font-bold text-2xl text-white">4.9/5</div>
              <div class="text-blue-100 dark:text-blue-50">Customer Rating</div>
            </div>
            <div class="flex flex-col items-center">
              <UIcon name="i-heroicons-users" class="w-10 h-10 mb-2 text-yellow-400 dark:text-yellow-300" />
              <div class="font-bold text-2xl text-white">50+</div>
              <div class="text-blue-100 dark:text-blue-50">Team Members</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="py-20">
      <ServicesSection />
    </section>

    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4 mb-12">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose roofing?</h2>
          <p class="text-gray-600 dark:text-gray-300">Experience the difference with our commitment to quality and customer satisfaction</p>
        </div>
      </div>
      
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8">
          <UCard class="dark:bg-gray-700">
            <template #header>
              <div class="flex items-center">
                <UIcon name="i-heroicons-shield-check" class="w-8 h-8 text-primary-500 dark:text-primary-400 mr-3" />
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Quality Guaranteed</h3>
              </div>
            </template>
            <p class="text-gray-600 dark:text-gray-300">We use only the highest quality materials and back our work with comprehensive warranties.</p>
          </UCard>
          
          <UCard class="dark:bg-gray-700">
            <template #header>
              <div class="flex items-center">
                <UIcon name="i-heroicons-clock" class="w-8 h-8 text-primary-500 dark:text-primary-400 mr-3" />
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Timely Service</h3>
              </div>
            </template>
            <p class="text-gray-600 dark:text-gray-300">Our efficient team ensures your project is completed on time and within budget.</p>
          </UCard>
          
          <UCard class="dark:bg-gray-700">
            <template #header>
              <div class="flex items-center">
                <UIcon name="i-heroicons-currency-dollar" class="w-8 h-8 text-primary-500 dark:text-primary-400 mr-3" />
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Competitive Pricing</h3>
              </div>
            </template>
            <p class="text-gray-600 dark:text-gray-300">Get the best value for your investment with our transparent and competitive pricing.</p>
          </UCard>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white dark:bg-gray-900">
      <TestimonialsSection />
    </section>

    <!-- CTA Section -->
    <section class="bg-primary-600 dark:bg-primary-700 text-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Roofing Project?</h2>
          <p class="text-xl mb-8 text-white/90">Contact us today for a free consultation and estimate</p>
          <UButton
            size="xl"
            color="white"
            to="/contact"
            icon="i-heroicons-arrow-right"
          >
            Get Started
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const bgPattern = ref('PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEg0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')

definePageMeta({
  layout: 'default'
})
</script>