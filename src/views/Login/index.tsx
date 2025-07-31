import styles from './index.module.scss'

import { defineComponent, ref, shallowReactive, shallowRef, toRaw } from "vue"
import { useModal, type FormInst } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'


export default defineComponent({
  name: 'Login',
  setup: () => {
    const { t } = useI18n()
    const modal = useModal()
    const route = useRoute()
    const router = useRouter()
    const loading = shallowRef(false)
    const formRef = ref<FormInst | null>(null)
    const user = shallowReactive({
      email: '',
      password: '',
      protocol: false
    })

    const redirectRoute = () => {
      const redirect = route.query.redirect as string
      if (redirect) {
        const path = decodeURIComponent(redirect)
        router.replace(path)
        return
      }
      router.replace('/')
    }

    const handleSubmit = async (event: Event) => {
      const form = toRaw(formRef.value)
      if (form) {
        const valid = await form.validate()
        if (!valid) {
          return
        }
        // 如果没有勾选协议，则提示勾选
        if (!user.protocol) {
          modal.create({
            type: 'warning',
            title: t('login.modal.tooltip'),
            content: t('login.modal.content'),
            positiveText: t('login.modal.positiveText'),
            negativeText: t('login.modal.negativeText'),
            preset: 'confirm',
            onPositiveClick() {
              user.protocol = true
            }
          })
          return
        }
        // 调用登录接口
        loading.value = true
      }
    }

    return {
      user,
      loading,
      formRef,
      handleSubmit
    }
  },
  render() {
    return (
      <n-row id={styles.login}>
        <n-col span={12}>

        </n-col>
        <n-col
          span={12}
          class={styles['login-box']}
        >
          <n-tabs
            animated
            barWidth={72}
          >
            <n-tab-pane
              name="account"
              tab={this.$t('login.tab.account')}
            >
              <n-space
                vertical
                size={24}
                align="center"
              >
                <n-form
                  ref="formRef"
                  model={this.user}
                  requireMarkPlacement="left"
                  onSubmit={this.handleSubmit}
                >
                  <n-form-item
                    path="email"
                    label={this.$t('login.form.email')}
                    rule={[
                      {
                        required: true,
                        message: this.$t('login.form.email.rule.required')
                      },
                      {
                        type: 'email',
                        message: this.$t('login.form.email.rule.format')
                      }
                    ]}
                  >
                    <n-input
                      value={this.user.email}
                      onUpdate:value={val => this.user.email = val}
                      placeholder={this.$t('login.form.email.placeholder')}
                    />
                  </n-form-item>
                  <n-form-item
                    path="password"
                    label={this.$t('login.form.password')}
                    rule={[
                      {
                        required: true,
                        message: this.$t('login.form.password.rule.required')
                      },
                      {
                        min: 6,
                        message: this.$t('login.form.password.rule.minLength', { min: 6 })
                      }
                    ]}
                  >
                    <n-input
                      type="password"
                      value={this.user.password}
                      showPasswordOn="mousedown"
                      onUpdate:value={val => this.user.password = val}
                      placeholder={this.$t('login.form.password.placeholder')}
                    />
                  </n-form-item>
                  <n-space
                    justify="end"
                    class={styles['forget-box']}
                  >
                    <n-a class={styles['forget']}>{this.$t('login.form.password.forget')}</n-a>
                  </n-space>
                  <n-form-item
                    path="protocol"
                    showLabel={false}
                    showFeedback={false}
                  >
                    <n-space
                      vertical
                      size={20}
                      style={{ width: '100%' }}
                    >
                      <n-checkbox
                        checked={this.user.protocol}
                        onUpdate:checked={val => this.user.protocol = val}
                      >
                        {this.$t('login.form.protocol')}
                      </n-checkbox>
                      <n-button
                        block
                        type="primary"
                        loading={this.loading}
                        onClick={this.handleSubmit}
                      >
                        {this.$t('login.form.submit')}
                      </n-button>
                    </n-space>
                  </n-form-item>
                </n-form>
                <div>
                  {this.$t('login.noAccount')}
                  <n-a>{this.$t('login.toRegister')}</n-a>
                </div>
              </n-space>
            </n-tab-pane>
            <n-tab-pane
              name="qrcode"
              tab={this.$t('login.tab.qrcode')}
            >

            </n-tab-pane>
          </n-tabs>
        </n-col>
      </n-row>
    )
  }
})