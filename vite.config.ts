import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'

import { defineConfig } from 'vite'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    ViteYaml(),
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
