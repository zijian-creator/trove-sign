import './assets/styles/normalize.scss'
import './assets/styles/global.scss'

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
      <NConfigProvider
        abstract
        themeOverrides={{
          common: {
            primaryColor: '#FF8500',
            primaryColorHover: '#F27A00',
            primaryColorPressed: '#F27A00',
          }
        }}
      >
        <n-modal-provider>
          <RouterView />
        </n-modal-provider>
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
