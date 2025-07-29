import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

import enUS from '@/locale/en-US'
import zhCN from '@/locale/zh-CN'
import { LOCALE } from '@/settings'

export const i18n = createI18n({
  legacy: false,
  locale: LOCALE,
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export const install = (app: App) => {
  app.use(i18n)
}

export default {
  install
}
