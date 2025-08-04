import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'

import { defineConfig } from 'vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import { resolve } from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      dts: false,
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
      resolvers: [
        PrimeVueResolver({
          components: {
            prefix: 'Prime'
          }
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
