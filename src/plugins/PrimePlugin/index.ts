import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import { definePreset } from '@primeuix/themes'
import type { App } from 'vue'


const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#FFFCFA',
      100: '#FFF5EB',
      150: '#FFE9D1',
      200: '#FFD8B6',
      300: '#FFCB9F',
      400: '#FFBB84',
      500: '#FFA252',
      600: '#FF8707',
      700: '#FF8500',
      800: '#F27A00',
      900: '#C65A00',
    }
  }
})

export const install = (app: App) => {
  app.use(PrimeVue, {
    theme: {
      preset: MyPreset
    }
  })
}

export default {
  install
}