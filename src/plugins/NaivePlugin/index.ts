import {
  NButton,
  NCol,
  NRow,
  create,
  NForm,
  NFormItem,
  NInput,
  NSpace,
  NA,
  NCheckbox,
  NModalProvider,
  NTabs,
  NTabPane
} from 'naive-ui'
import type { App } from 'vue'

const naive = create({
  components: [
    NButton,
    NRow,
    NCol,
    NForm,
    NFormItem,
    NInput,
    NSpace,
    NA,
    NCheckbox,
    NModalProvider,
    NTabs,
    NTabPane
  ]
})

export const install = (app: App) => {
  app.use(naive)
}

export default {
  install
}