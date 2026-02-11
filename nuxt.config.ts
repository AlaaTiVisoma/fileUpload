// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content','@nuxtjs/tailwindcss'],
  tailwindcss: {
    config: {
      plugins: [require('@tailwindcss/forms')],
    }
  },
  nitro: {
    preset: 'node-server'
  }
})