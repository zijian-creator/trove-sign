import type { FormProps, FormSlots } from '@primevue/forms/form'
import type { InputTextProps } from 'primevue/inputtext'
import type { MessageProps } from 'primevue/message'
import type { PasswordProps } from 'primevue/password'
import type { HTMLAttributes, PublicProps, Slot } from 'vue'

declare module 'vue/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'prime-form': HTMLAttributes & PublicProps & FormProps
      'prime-message': HTMLAttributes & PublicProps & MessageProps
      'prime-inputtext': HTMLAttributes & PublicProps & InputTextProps
      'prime-password': HTMLAttributes & PublicProps & PasswordProps
    }
  }
}