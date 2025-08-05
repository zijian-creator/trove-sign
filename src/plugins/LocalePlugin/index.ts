import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

import { LOCALE } from '@/settings'

export type Locale = 'zh-CN' | 'en-US'

export type ESModule = Record<string, unknown> & { default: Record<string, string> }

function isESModule(module: unknown): module is ESModule {
  return typeof module === 'object' && module !== null && 'default' in module;
}

const importContent = (locale: Locale) => {
  let contentModules: Record<string, ESModule> | null = null
  if (locale === 'en-US') {
    contentModules = import.meta.glob('../../locale/en-US/**/*.{yml,yaml}', {
      eager: true
    })
  } else if (locale === 'zh-CN') {
    contentModules = import.meta.glob('../../locale/zh-CN/**/*.{yml,yaml}', {
      eager: true
    })
  }
  if (!contentModules) {
    throw new Error('Could not find any content files')
  }
  const contents = Object.entries(contentModules).map(([path, module]) => {
    if (!isESModule(module)) throw new Error(`${path} is not an ES module`);
    return module.default;
  })
  return contents.reduce((acc, cur) => ({ ...acc, ...cur }), {})
}

export const i18n = createI18n({
  legacy: false,
  locale: LOCALE,
  messages: {
    'zh-CN': {
      ...importContent('zh-CN')
    },
    'en-US': {
      ...importContent('en-US')
    }
  }
})

export const install = (app: App) => {
  app.use(i18n)
}

export default {
  install
}
