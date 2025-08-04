import './assets/styles/normalize.scss'
import './assets/styles/global.scss'

import router from './router'
import StorePlugin from './plugins/StorePlugin'
import PrimePlugin from './plugins/PrimePlugin'
import LocalePlugin from './plugins/LocalePlugin'

import { createApp } from 'vue'
import { RouterView } from 'vue-router'


const app = createApp({
  render: () => {
    return (
      <RouterView />
    )
  }
})

app.use(router)
router.isReady().then(() => {
  app.use(PrimePlugin)
  app.use(LocalePlugin)
  app.use(StorePlugin)
  app.mount('#app')
})
