import type { FormEmits, FormProps, FormSlots, FormSubmitEvent } from '@primevue/forms/form'
import type { FormFieldProps } from '@primevue/forms/formfield'
import type { InputTextProps } from 'primevue/inputtext'
import type { MessageProps } from 'primevue/message'
import type { PasswordProps } from 'primevue/password'
import type { ButtonProps } from 'primevue/button'
import type { DefineComponent, HTMLAttributes, PublicProps, Slot } from 'vue'

declare module 'vue/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'prime-form': HTMLAttributes & PublicProps & FormProps
      'prime-message': HTMLAttributes & PublicProps & MessageProps
      'prime-input-text': HTMLAttributes & PublicProps & InputTextProps
      'prime-password': HTMLAttributes & PublicProps & PasswordProps
      'prime-form-field': HTMLAttributes & PublicProps & FormFieldProps
      'prime-button': HTMLAttributes & PublicProps & ButtonProps
    }
  }
}

declare global {
  export const PrimeForm: DefineComponent<FormProps, FormSlots, FormEmits>
}
