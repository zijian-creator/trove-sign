import { useModal, type FormInst } from 'naive-ui'
import styles from './index.module.scss'

import { defineComponent, ref, shallowReactive, shallowRef, toRaw } from "vue"
import { useRoute, useRouter } from 'vue-router'


export default defineComponent({
  name: 'Login',
  setup: () => {
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

    const handleSubmit = async () => {
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
          title: '提示',
          content: '是否阅读并同意《用户协议》和《隐私政策》？',
          positiveText: '同意',
          negativeText: '不同意',
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
          <n-form
            model={this.user}
            ref="formRef"
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
              <n-space
                vertical
                align="flex-end"
                wrapItem={false}
                class={styles['password-box']}
              >
                <n-input
                  type="password"
                  value={this.user.password}
                  showPasswordOn="mousedown"
                  onUpdate:value={val => this.user.password = val}
                  placeholder={this.$t('login.form.password.placeholder')}
                />
                <n-a>{this.$t('login.form.password.forget')}</n-a>
              </n-space>
            </n-form-item>
            <n-form-item
              path="protocol"
              showLabel={false}
            >
              <n-checkbox
                checked={this.user.protocol}
                onUpdate:checked={val => this.user.protocol = val}
              >
                {this.$t('login.form.protocol')}
              </n-checkbox>
            </n-form-item>
            <n-form-item showLabel={false}>
              <n-button
                block
                type="primary"
                attrType="submit"
                loading={this.loading}
              >
                {this.$t('login.form.submit')}
              </n-button>
            </n-form-item>
          </n-form>
        </n-col>
      </n-row>
    )
  }
})