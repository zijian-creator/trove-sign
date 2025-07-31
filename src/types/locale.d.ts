
import type { TranslationProps } from 'vue-i18n'
import type { HTMLAttributes, PublicProps } from 'vue'

declare module 'vue/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'i18n-t': HTMLAttributes & PublicProps & TranslationProps
    }
  }
}
