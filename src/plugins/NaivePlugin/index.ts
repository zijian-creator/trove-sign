import {
  NButton
} from 'naive-ui'
import type { App } from 'vue'

const components = [
  NButton
]

export const install = (app: App) => {
  components.forEach(component => {
    app.component(component.name!, component)
  })
}

export default {
  install
}