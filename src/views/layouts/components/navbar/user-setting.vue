<template>
  <a-dropdown placement="bottomLeft" trigger="hover">
    <div class="px-2 cursor-pointer">
      <!-- <a-avatar
        :src="userStore.user?.headImg"
        size="small"
      /> -->
      <span class="ml-2">{{ userStore.user?.userName }}</span>
      <!-- <span class="ml-1 text-xs text-gray-500"> {{ userStore.user?.role.title }} </span> -->
    </div>
    <template #overlay>
      <a-menu @click="handleClickUserMenu">
        <a-menu-item key="resetPassword">
          <div class="flex items-center">
            <user-switch-outlined /> <span class="ml-2">修改登录密码</span>
          </div>
        </a-menu-item>
        <!-- <a-menu-divider />
        <a-menu-item key="resetPayPassword">
          <div class="flex items-center">
            <user-switch-outlined /> <span class="ml-2">修改支付密码</span>
          </div>
        </a-menu-item> -->
        <a-menu-divider />
        <a-menu-item key="logout">
          <div class="flex items-center">
            <logout-outlined />
            <span class="ml-2">退出登录</span>
          </div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { Modal } from 'ant-design-vue'
import { authApi } from '@/api/auth'
import { clientApi } from '@/api/system'
import { useUserStore } from '@/store'
import { Rule } from 'ant-design-vue/es/form'
import globalModelForm from '@/hooks/global-model-form'

const userStore = useUserStore()
async function handleClickUserMenu({ key }) {

  switch (key) {
    case 'resetPassword':
      // 等待模态框渲染完再清空回填密码
      await globalModelForm.init({
        title: '修改登录密码',
        schemas: [
          {
            label: '真实姓名',
            field: 'name',
            component: 'Input',
            componentProps: {
              disabled: true,
            },
            required: true,
          } as IForm.Schema<'Input'>,
          {
            label: '登录密码',
            field: 'password',
            component: 'InputPassword',
            componentProps: {
              autocomplete: 'new-password',
            },
            required: true,
            rules: [
              {
                validator: (rule: Rule, value: string) => {
                  if (!value) {
                    return Promise.reject(new Error('密码不能为空'))
                  }
                  if (value.trim().length < 8 || value.trim().length > 15) {
                    return Promise.reject(new Error('密码长度不正确，请输入 8-15 位密码'))
                  }
                  return Promise.resolve()
                }
              }
            ],
          } as IForm.Schema<'InputPassword'>,
          {
            label: '二次确认登录密码',
            field: 'passwordConfirm',
            component: 'InputPassword',
            componentProps: {
              autocomplete: 'new-password',
            },
            rules: [
              {
                required: true,
                trigger: 'blur',
                validator: (rule: Rule, value: string) => {
                  if (globalModelForm.formModel.password !== value) {
                    return Promise.reject(new Error('二次密码不一致，请重新输入'))
                  }
                  return Promise.resolve()
                },
              }
            ]
          } as IForm.Schema<'InputPassword'>,
          // {
          //   label: '验证码',
          //   field: 'captcha',
          //   component: 'InputCaptcha',
          // } as IForm.Schema<'InputCaptcha'>,
        ],
        model: userStore.user!,
        api: authApi.resetPassword,
        width: 480,
      })
      globalModelForm.formRef.setFormModel({ password: '' })
      break
    // case 'resetPayPassword':
    //   globalModelForm.init({
    //     title: '修改支付密码',
    //     schemas: [
    //       {
    //         label: '真实姓名',
    //         field: 'name',
    //         component: 'Input',
    //         componentProps: {
    //           disabled: true,
    //         },
    //         required: true,
    //       } as IForm.Schema<'Input'>,
    //       {
    //         label: '手机号码',
    //         field: 'mobile',
    //         component: 'Input',
    //         componentProps: {
    //           disabled: true,
    //           autocomplete: 'new-password',
    //         },
    //         required: true,
    //       } as IForm.Schema<'Input'>,
    //       {
    //         label: '支付密码',
    //         field: 'payPassword',
    //         component: 'InputPassword',
    //         componentProps: {
    //           autocomplete: 'new-password',
    //         },
    //         required: true,
    //         rules: [
    //           {
    //             validator: (rule: Rule, value: string) => {
    //               if (!value.trim()) {
    //                 return Promise.reject(new Error('支付密码不能为空'))
    //               }

    //               if (value.trim().length < 8 || value.trim().length > 15) {
    //                 return Promise.reject(new Error('支付密码长度不正确，请输入 8-15 位支付密码'))
    //               }

    //               return Promise.resolve()
    //             }
    //           }
    //         ],
    //       } as IForm.Schema<'InputPassword'>,
    //       {
    //         label: '二次确认支付密码',
    //         field: 'payPasswordConfirmation',
    //         component: 'InputPassword',
    //         componentProps: {
    //           autocomplete: 'false'
    //         },
    //         rules: [
    //           {
    //             required: true,
    //             trigger: 'blur',
    //             validator: (rule: Rule, value: string) => {
    //               if (globalModelForm.formModel.payPassword !== value) {
    //                 return Promise.reject(new Error('二次密码不一致，请重新输入'))
    //               }
    //               return Promise.resolve()
    //             },
    //           }
    //         ]
    //       } as IForm.Schema<'InputPassword'>,
    //       {
    //         label: '验证码',
    //         field: 'captcha',
    //         component: 'InputCaptcha',
    //       } as IForm.Schema<'InputCaptcha'>,
    //     ],
    //     model: userStore.user!,
    //     api: authApi.resetPayPassword,
    //     width: 480,
    //   })
    //   break
    case 'logout':
      Modal.confirm({
        title: '提醒',
        content: '确认退出登录吗？',
        onOk: async () => {
          await userStore.logout(true)
        },
      })
      break
    default:
      break
  }
}
</script>
