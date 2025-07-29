import { TOKEN_NAME } from "@/settings"
import { defineStore } from "pinia"

export const useAuthStore = defineStore('auth', {
  state: () => ({
    [TOKEN_NAME]: ''
  }),
  actions: {
    setToken(token: string) {
      this[TOKEN_NAME] = token
    }
  },
  persist: true
})
