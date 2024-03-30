<style lang="less" scoped>
.login-bg {
  background: url("@images/bg-sur.png") no-repeat;
  background-size: 100% 100%;
}

.login-container {
  margin: auto;
  height: 100%;
  max-width: 1920px;

  .login-white {
    margin-top: 16px;
    height: 58px;
  }
}

:deep(.ant-tabs-tab-btn) {
  font-size: 32px;
}

:deep(.ant-tabs-tab:not(.ant-tabs-tab-active)) {
  color: #A8A8A8;
}

:deep(.ant-tabs-tab+.ant-tabs-tab) {
  margin: 0 0 0 88px;
}
</style>

<template>
  <div class="h-screen login-bg">
    <div class="login-container">
      <div class="ml-10 ">
        <img class="login-white" src="@images/logo-simple.png" alt="logo">
      </div>
      <div class="flex items-center h-full pb-20">
        <!-- <div class="flex-1 ml-10 text-4xl text-white bg-center bg-no-repeat bg-contain">
          <div class="mb-5">
            洞察之窗
          </div>
          <div class="mb-5">
            问卷，让每个声音都有力量！调查，探索，了解更多！
          </div>
          <div class="text-2xl">
            <div class="mb-2">
              Traditional back modulation techniques
            </div>
            <div>and experience are combined with scientific evaluation</div>
          </div>
        </div> -->
        <div class="flex-1 ml-10 text-[46px] text-white bg-center bg-no-repeat bg-contain">
          <div class="mb-5">
            洞察之窗
          </div>
          <div class="mb-5">
            问卷，让每个声音都有力量！调查，探索，了解更多！
          </div>
          <div class="text-[24px]">
            <div class="mb-2">
              Traditional technique and experience are combined with scientific evaluation
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center flex-1">
          <a-card class="mr-6 overflow-auto" style="height: 570px;width: 520px;">
            <a-tabs v-if="currentStatus === Status.LoginByAccount || currentStatus === Status.LoginByMobile"
              size="small" centered>
              <a-tab-pane key="1" tab="密码登陆">
                <login-by-account v-if="currentStatus === Status.LoginByAccount" class="mt-6 text-left"
                  @resetPassword="currentStatus = Status.ResetPassword" @loginSuccess="loginSuccess" />
                <div class="mt-6 ">
                  还没有账号？<span class="cursor-pointer text-primaryColor-default"
                    @click="currentStatus = Status.ResetPassword">立即注册</span>
                </div>
              </a-tab-pane>
              <a-tab-pane :key="2" tab="验证码登陆">
                <login-by-mobile class="mt-6" @loginSuccess="loginSuccess"
                  @loginByAccount="currentStatus = Status.LoginByMobile" />
                <div class="mt-6">
                  还没有账号？<span class="text-primaryColor-default curs">立即注册</span>
                </div>
              </a-tab-pane>
            </a-tabs>
            <!-- <login-by-account
              v-if="currentStatus === Status.LoginByAccount"
              @loginSuccess="loginSuccess"
              @loginByMobile="currentStatus = Status.LoginByMobile"
              @resetPassword="currentStatus = Status.ResetPassword"
            /> -->

            <!-- <login-by-mobile
                    v-else-if="currentStatus === Status.LoginByMobile"
                    @loginSuccess="loginSuccess"
                    @loginByAccount="currentStatus = Status.LoginByAccount"
                  /> -->
            <reset-password v-else-if="currentStatus === Status.ResetPassword"
              @loginByAccount="currentStatus = Status.LoginByAccount" />
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginByAccount from './components/login-by-account.vue'
import LoginByMobile from './components/login-by-mobile.vue'
import ResetPassword from './components/reset-password.vue'
import { notification } from 'ant-design-vue'
import { HttpCode, ProjectCode } from '@/utils/request'
import type { LocationQueryValue } from 'vue-router'
import { authApi } from '@/api/auth'
import { useMessage } from '@/hooks/message'
import { useUserStore } from '@/store'

const router = useRouter()
const { query } = useRoute()
const userStore = useUserStore()

const enum Status {
  LoginByAccount,
  LoginByMobile,
  ResetPassword,
}

const currentStatus = ref(Status.LoginByAccount)

// 校验 token 是否有效，token 有效则沿用 token，直接进入页面，无需登录
async function checkToken() {
  let { code, msg } = await authApi.checkToken()
  code === ProjectCode.Success && router.replace({ name: 'root' })
  code === HttpCode.TokenExpired && useMessage.error(msg)
}

// 登录成功
function loginSuccess() {
  // 登录成功后清除历史标签页记录
  localStorage.getItem('historyTab') && localStorage.removeItem('historyTab')
  notification.success({
    message: '登录成功!',
    description: `欢迎回来，${userStore.user?.userName}！`,
    duration: 2,
  })

  function isValidRefererUrl(url: string | null) {
    return url && url !== '/' // 避免重定向会官网页面
  }

  if (isValidRefererUrl(query.refererUrl as LocationQueryValue)) {
    router.replace(decodeURIComponent(query.refererUrl as string))
  } else {
    router.replace({ name: 'root' })
  }
}

checkToken()

</script>
