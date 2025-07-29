import LocalePlugin from './plugins/LocalePlugin'
import NaivePlugin from './plugins/NaivePlugin'
import StorePlugin from './plugins/StorePlugin'
import router from './router'

import { NConfigProvider } from 'naive-ui'
import { createApp } from 'vue'
import { RouterView } from 'vue-router'

const app = createApp({
  render: () => {
    return (
      <NConfigProvider>
        <RouterView />
      </NConfigProvider>
    )
  }
})

app.use(router)
router.isReady().then(() => {
  app.use(NaivePlugin)
  app.use(LocalePlugin)
  app.use(StorePlugin)
  app.mount('#app')
})
