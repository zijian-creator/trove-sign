import type {
  RowProps,
  ColProps,
  FormProps,
  FormItemProps,
  InputProps,
  SpaceProps,
  ButtonProps,
  AProps,
  CheckboxProps,
  ModalProviderProps,
  TabsProps,
  TabPaneProps
} from "naive-ui";
import type { HTMLAttributes, PublicProps } from "vue";

declare module 'vue/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'n-row': HTMLAttributes & PublicProps & RowProps
      'n-col': HTMLAttributes & PublicProps & ColProps
      'n-form': HTMLAttributes & PublicProps & FormProps
      'n-form-item': HTMLAttributes & PublicProps & FormItemProps
      'n-input': HTMLAttributes & PublicProps & InputProps
      'n-space': HTMLAttributes & PublicProps & SpaceProps
      'n-button': HTMLAttributes & PublicProps & ButtonProps
      'n-a': HTMLAttributes & PublicProps & AProps
      'n-checkbox': HTMLAttributes & PublicProps & CheckboxProps
      'n-modal-provider': HTMLAttributes & PublicProps & ModalProviderProps
      'n-tabs': HTMLAttributes & PublicProps & TabsProps
      'n-tab-pane': HTMLAttributes & PublicProps & TabPaneProps
    }
  }
}