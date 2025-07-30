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
  NModalProvider
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
    NModalProvider
  ]
})

export const install = (app: App) => {
  app.use(naive)
}

export default {
  install
}