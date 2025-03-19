// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app:{
    baseURL:'/nuxt-activity/',
    head:{
      title:'藝文活動平台',
      htmlAttrs:{
        lang:'zh-TW',
      },
      link:[
        {rel: 'icon',type:'image/x-icon',href:'/favicon.ico'}
      ]
    }
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css:['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  fontawesome: {
    icons: {
      solid: ['calendar-days', 'location-dot', 'dollar-sign', 'repeat', 'window-maximize', 'sitemap', 'phone', 'chevron-down', 'map-location-dot', 'chevron-up', 'sun', 'moon', 'bars']
    }
  },

  modules: ['@pinia/nuxt', '@vesp/nuxt-fontawesome'],
})