import { defineComponent, shallowReactive, shallowRef } from "vue"
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useRoute, useRouter } from 'vue-router'
import { z } from 'zod'

import style from './index.module.scss'
import type { FormSlots, FormSubmitEvent } from "@primevue/forms/form"
import { useI18n } from "vue-i18n"


export const componentName = 'login'
export default defineComponent({
  name: componentName,
  setup: () => {
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()
    const loading = shallowRef(false)
    const resolver = zodResolver(
      z.object({
        email: z.string().nonempty(t('login.form.email.rules.required')).and(z.email(t('login.form.email.rules.format'))),
        password: z.string().nonempty(t('login.form.password.rules.required')).and(z.string().min(6).regex(/[a-z]/).regex(/[A-Z]/).regex(/[0-9]/).regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/))
      })
    )
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
    const submit = (payload: FormSubmitEvent) => {
      console.log(payload.values);
    }

    return {
      user,
      submit,
      loading,
      resolver
    }
  },
  render() {
    return (
      <div id={style[componentName]}>
        <div class={style['brand-information']}></div>
        <div class={style['login-box']}>
          <div class={style['login-container']}>
            <PrimeForm
              initialValues={this.user}
              onSubmit={this.submit}
              resolver={this.resolver}
              validateOnBlur
            >
              {{
                default: (opt: Parameters<FormSlots['default']>[0]) => (
                  <>
                    <prime-form-field class={style['form-item']}>
                      <label for="email">
                        {this.$t('login.form.email.label')}
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
                              {opt.email?.error?.message}
                            </prime-message>
                          )
                        }
                      </label>
                    </prime-form-field>
                    <prime-form-field class={style['form-item']}>
                      <label for="password">
                        {this.$t('login.form.password.label')}
                        <prime-password
                          placeholder={this.$t('login.form.password.placeholder')}
                          name="password"
                          feedback={false}
                          id="password"
                          toggleMask
                          fluid
                        />
                        {
                          opt.password?.invalid && (
                            <prime-message
                              variant="simple"
                              severity="error"
                              size="small"
                            >
                              {opt.password?.error?.message}
                            </prime-message>
                          )
                        }
                      </label>
                    </prime-form-field>
                    <prime-form-field>
                      <prime-button
                        fluid
                        type="submit"
                        label={this.$t('login.form.submit')}
                      />
                    </prime-form-field>
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