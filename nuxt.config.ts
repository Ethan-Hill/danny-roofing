import { defineNuxtConfig } from 'nuxt/config'
import type { ModuleOptions } from '@nuxt/ui'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/image'
  ],

  components: {
    global: true,
    dirs: ['~/components']
  },

  ui: {
    global: true,
    icons: ['heroicons', 'simple-icons'],
    primary: 'primary',
    colors: ['primary']
  } as Partial<ModuleOptions>,

  colorMode: {
    preference: 'light'
  },

  supabase: {
    redirect: false
  },

  devtools: { enabled: true },

  image: {
    provider: 'ipx',
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          width: 80,
          height: 80
        }
      }
    }
  },

  nitro: {
    compressPublicAssets: true,
    minify: true
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'D&A Roofing Solutions - Professional Roofing Services',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'Professional roofing services for residential and commercial properties. Expert installations, repairs, and maintenance by D&A Roofing Solutions.' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#2563eb', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#1e40af', media: '(prefers-color-scheme: dark)' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'application-name', content: 'D&A Roofing' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'apple-touch-icon', href: '/android-chrome-192x192.png' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#2563eb' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://danny-roofing.vercel.app'
    }
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://danny-roofing.vercel.app',
    name: 'D&A Roofing Solutions',
  },

  robots: {
    rules: [
      {
        UserAgent: '*',
        Allow: '/',
        Sitemap: (process.env.NUXT_PUBLIC_SITE_URL || 'https://danny-roofing.vercel.app') + '/sitemap.xml'
      }
    ]
  } as any,

  sitemap: {
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://danny-roofing.vercel.app',
    exclude: ['/admin/**'],
    defaults: {
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString()
    },
    urls: [
      {
        loc: '/',
        changefreq: 'weekly',
        priority: 1.0
      },
      {
        loc: '/services',
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: '/about',
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        loc: '/contact',
        changefreq: 'monthly',
        priority: 0.7
      }
    ]
  },

  experimental: {
    viewTransition: true,
    renderJsonPayloads: true
  },

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-11-29'
})