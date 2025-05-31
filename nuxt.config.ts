// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss'
  ],
  css: ['~/assets/css/tailwind.css'],
  ui: {
    // Theme customization will be handled via Tailwind classes in components
  },
  ssr: true,
  nitro: {
    preset: 'static'
  }
})
