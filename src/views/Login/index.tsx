import { defineComponent, shallowReactive, shallowRef, useSlots } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { zodResolver } from '@primevue/forms/resolvers/zod'

import style from './index.module.scss'
import type { FormSlots } from "@primevue/forms/form"


export const componentName = 'login'
export default defineComponent({
  name: componentName,
  setup: () => {
    const route = useRoute()
    const router = useRouter()
    const slots = useSlots()
    const loading = shallowRef(false)
    const user = shallowReactive({
      email: '',
      password: '',
      protocol: false
    })

    // 登录成功后的路由重定向
    const redirectRoute = () => {
      const redirect = route.query.redirect as string
      if (redirect) {
        const path = decodeURIComponent(redirect)
        router.replace(path)
        return
      }
      router.replace('/')
    }

    // 提交登录
    const submit = () => {

    }

    return {
      user,
      submit,
      loading
    }
  },
  render() {
    return (
      <div id={style[componentName]}>
        <div class={style['brand-information']}></div>
        <div class={style['login-box']}>
          <div class={style['login-container']}>
            <prime-form
              initialValues={this.user}
              onSubmit={this.submit}
              resolver={zodResolver}
              validateOnBlur
              validateOnMount={['email']}
            >
              {{
                default: (opt: Parameters<FormSlots['default']>[0]) => (
                  <>
                    <div class={style['form-item']}>
                      <label for="email">
                        {this.$t('login.form.email')}
                        <prime-input-text
                          placeholder={this.$t('login.form.email.placeholder')}
                          name="email"
                          type="text"
                          id="email"
                          fluid
                        />
                        {
                          opt.email?.invalid && (
                            <prime-message
                              variant="simple"
                              severity="error"
                              size="small"
                            >
                              {this.$t('login.form.email.rule.required')}
                            </prime-message>
                          )
                        }
                      </label>
                    </div>
                    <div class={style['form-item']}>
                      <label for="password">
                        {this.$t('login.form.password')}
                        <prime-password
                          placeholder={this.$t('login.form.password.placeholder')}
                          name="password"
                          feedback={false}
                          id="password"
                          fluid
                        />
                        <prime-message
                          variant="simple"
                          severity="error"
                          size="small"
                        >
                          {this.$t('login.form.password.rule.required')}
                        </prime-message>
                      </label>
                    </div>
                  </>
                )
              }}
            </prime-form>
          </div>
        </div>
      </div>
    )
  }
})