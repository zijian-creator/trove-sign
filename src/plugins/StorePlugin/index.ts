import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import type { App } from 'vue'

const piniaPluginPersistedstate = createPersistedState({
  key: (id) => `trove_sign_${id}`,
  storage: {
    getItem: (key) => {
      return localStorage.getItem(key)
    },
    setItem: (key, value) => {
      localStorage.setItem(key, value)
    }
  }
})

export const store = createPinia()
store.use(piniaPluginPersistedstate)

export const install = (app: App) => {
  app.use(store)
}

export default {
  install
}
