<style lang="less" scoped>
.offcial-container {
  min-width: 1280px;

  .container {
    padding-right: 1rem;
    padding-left: 1rem;
    width: 100%;
  }

  .nav {
    position: fixed;
    top: 0;
    // left: 0;
    z-index: 100;
    width: 100%;
    transition: all 0.3s linear;

    .logo {
      height: 58px;
      width: 153px;
      font-weight: 400px;
    }
  }

  .nav-bg-white {
    --tw-text-opacity: 1;

    background: rgb(255 255 255);
    box-shadow: 0 0 6.25rem #00000033;

    .active-color {
      color: rgb(0 0 0 / var(--tw-text-opacity));
    }
  }

  .ant-carousel :deep(.slick-slide) {
    overflow: hidden;
    height: 714px;
    text-align: center;
  }

  .ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
    z-index: 1;
    height: 25px;
    width: 25px;
    font-size: 25px;
    color: #FFFFFF;
  }

  .ant-carousel :deep(.custom-slick-arrow::before) {
    display: none;
  }

  .ant-carousel :deep(.custom-slick-arrow:hover) {
    opacity: 0.8;
  }

  .g-banner_1 {
    background: url("@images/home/banner.png") no-repeat center/cover;
  }

  .g-banner_2 {
    background: url("@images/home/banner-2.png") no-repeat center/cover;
  }

  .g-banner_3 {
    background: url("@images/home/banner-3.png") no-repeat center/cover;
  }

  .dots {
    position: absolute;
    top: 625px;
    height: 168px;
    width: 100%;

    .active-card {
      border-bottom: 3px #448EF6 solid;
      opacity: 1 !important;
      transition: 0.2s;
    }
  }

  .service {
    .service-item {
      display: flex;
      border: 2px #448EF6 solid;
      border-radius: 8px;
      padding: 40px;
      height: 485px;
      flex-direction: column;

      h1 {
        font-size: 32px;
        font-weight: 600;
      }

      p {
        font-size: 15px;
      }

      ul li {
        flex: 50%;
        font-weight: 500;
      }

      ul li:nth-child(2n) {
        margin-right: 0;
      }
    }
  }

  .introduce {
    margin-top: 80px;
    text-align: center;

    .introduce-bg {
      height: 577px;
      width: 100%;
      background: url("@images/home/Rectangle95.png") no-repeat center/cover;

      .introdece-text {
        padding-top: 50px;

        .text-box {
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          flex-direction: column;

          img {
            height: 34px;
            width: 34px;
          }
        }

        .text-box:hover {
          transform: scale(1.1);
        }
      }
    }
  }

  .handbook {
    margin-top: 63px;
    text-align: center;
  }

  .customer {
    margin-top: 59px;
    text-align: center;
    background-image: radial-gradient(#4888E164 20%, white, white);

    img {
      width: 100%;
    }

    img:hover {
      --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%);

      box-shadow: var(--tw-ring-offset-shadow, 0 0 #00000000), var(--tw-ring-shadow, 0 0 #00000000), var(--tw-shadow);
    }
  }

  .contract {
    margin-top: 59px;
    height: 597px;
    width: 100%;
    background: url("@images/home/Mask-group.png") no-repeat center/cover;
  }
}
</style>
<template>
  <div class="offcial-container">
    <div ref="nav" class="nav">
      <div class="flex justify-between items-center max-w-screen-xl mx-auto container">
        <div class="p-0">
          <img ref="activeImg" class="logo" src="@images/home/logo-simple-white.png">
        </div>

        <div class="flex justify-center items-center text-base text-white ">
          <div class="rounded-sm border border-solid p-1 px-6 hover:text-blue-400 activeColor cursor-pointer"
            @click="toLogin">
            登录平台
          </div>
          <div class="ml-5 w-60px hover:text-blue-400 activeColor cursor-pointer" @click="toLogin">
            注册
          </div>
        </div>
      </div>
    </div>
    <a-back-top v-show="isShowBackTop">
      <div class="flex items-center justify-center w-12 h-12 rounded-full s-bgc-theme"
        style=" max-height: 40px;max-width: 40px;">
        <vertical-align-top-outlined :style="{ color: '#FFFFFF', fontSize: '30px' }"
          class="p-2 rounded-full bg-gray-400 hover:bg-black" />
      </div>
    </a-back-top>
    <div class="banner">
      <a-carousel ref="varousel" arrows :dots="false" :before-change="handleChangeCarousel">
        <template #prevArrow>
          <div class="custom-slick-arrow" style="left: 100px; z-index: 1;">
            <left-square-outlined :style="{ fontSize: '40px' }" />
          </div>
        </template>
        <template #nextArrow>
          <div class="custom-slick-arrow" style="right: 100px;">
            <right-square-outlined :style="{ fontSize: '40px' }" />
          </div>
        </template>

        <div class="g-banner_1 h-[714px] w-full">
          <div class="max-w-screen-xl mx-auto container">
            <div class="text-left mt-28 ">
              <h3 class="text-white" style="font-size: 24px;">
                yukces | 企业用工风险防范专家
              </h3>
              <h1 style="color: #448EF6;" class="text-6xl text-primaryColor-default">
                安全合规
              </h1>
              <h3 class="text-white" style="font-size: 40px;">
                银行级别安全保障，公安部信息系统等保
              </h3>
              <a-button type="primary" class="h-14 w-44 text-xl rounded-md" @click="toTry">
                立即试用
              </a-button>
            </div>
          </div>
        </div>
        <div class="g-banner_2 h-[714px] w-full">
          <div class="max-w-screen-xl mx-auto container">
            <div class="text-left mt-28">
              <h3 class="text-white" style="font-size: 24px;">
                yukces | 企业用工风险防范专家
              </h3>
              <h3 style=" font-size: 64px ;color: #448EF6;">
                行业首创
              </h3>
              <h3 class="text-white" style="font-size: 40px;">
                持续性数据监测，员工综合评测
              </h3>
              <a-button type="primary" class="h-14 w-44 text-xl rounded-md" @click="toTry">
                立即试用
              </a-button>
            </div>
          </div>
        </div>
        <div class="g-banner_3 h-[714px] w-full">
          <div class="max-w-screen-xl mx-auto container">
            <div class="text-left mt-28">
              <h3 class="text-white" style="font-size: 24px;">
                yukces | 企业用工风险防范专家
              </h3>
              <h3 style=" font-size: 64px ;color: #448EF6;">
                客观反馈
              </h3>
              <h3 class="text-white" style="font-size: 40px;">
                权威数据库和专业团队，客观还原真实履历
              </h3>
              <a-button type="primary" class="h-14 w-44 text-xl rounded-md" @click="toTry">
                立即试用
              </a-button>
            </div>
          </div>
        </div>
      </a-carousel>
      <div class="dots">
        <div class="max-w-screen-xl mx-auto h-full bg-white rounded-md shadow-xl flex justify-around items-center">
          <div :class="{ 'active-card': activeCard === 0 }"
            class="flex min-w-1/4 justify-between items-center h-full opacity-50 overflow-hidden" @click="changeDot(0)">
            <div style="height: 104px; width: 129px;">
              <img src="@images/home/Rectangle103.png">
            </div>
            <div class="ml-6">
              <h3 class="text-xl font-semibold">
                安全合规
              </h3>
              <p class="text-base whitespace-nowrap overflow-ellipsis">
                银行级别安全保障，公安部...
              </p>
            </div>
          </div>
          <div :class="{ 'active-card': activeCard === 1 }"
            class="flex min-w-1/4 justify-between items-center h-full opacity-50 overflow-hidden" @click="changeDot(1)">
            <div style="height: 104px; width: 129px;">
              <img src="@images/home/Rectangle106.png">
            </div>
            <div class="ml-6">
              <h3 class="text-xl font-semibold">
                行业首创
              </h3>
              <p class="text-base whitespace-nowrap overflow-ellipsis">
                持续性数据监测，员工综合...
              </p>
            </div>
          </div>
          <div :class="{ 'active-card': activeCard === 2 }"
            class="flex min-w-1/4 justify-around items-center h-full opacity-50 overflow-hidden" @click="changeDot(2)">
            <div style="height: 104px; width: 129px;">
              <img src="@images/home/Rectangle89.png">
            </div>
            <div class="ml-6">
              <h3 class="text-xl font-semibold">
                客观反馈
              </h3>
              <p class="text-base whitespace-nowrap overflow-ellipsis">
                持续性数据监测，员工综合...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="service">
      <div class="container max-w-screen-xl mx-auto">
        <div class="mt-56 mb-10 text-center">
          <h1 class="mb-2 text-4xl font-medium text-blue-500 font-semibold">
            产品与服务
          </h1>
          <p class="p-0 text-gray-200">
            PROEUCT AND SERVICE
          </p>
        </div>
        <div class="grid grid-flow-col grid-cols-2 grid-rows-1 gap-4 overflow-hidden">
          <div class="service-item">
            <div class="relative w-full h-full">
              <h1>基础版方案</h1>
              <p>基础版方案适用于保姆/保安/财务/工厂普工等基层人员的背景调查； 基础版方案会通过身份基础信息查询， 负面社会安全验证，
                法院涉诉及失信查询和金融信贷风险查询等方式来进行该人员的ces。确保基层人员的信息准确，让企业能够 “用” 得放心。</p>
              <a-divider class="mt-0" />
              <ul class="flex flex-wrap justify-between text-lg font-medium">
                <li>身份基础信息查询</li>
                <li>负面社会安全验证</li>
                <li>金融信贷风险查询</li>
                <li>法院涉诉及失信查询</li>
              </ul>
              <div class="absolute bottom-0 w-full text-xl text-center">
                <a-button type="primary" class="w-full h-12 text-xl rounded-lg" @click="toTry">
                  立即咨询
                </a-button>
              </div>
            </div>
          </div>
          <div class="service-item">
            <div class="relative h-full">
              <h1>进阶版方案</h1>
              <p>
                进阶版方案适用于财务总监/人事总监/工程行业老包/公司高管/关键客户/供应商等高层人员的背景调查；进阶版方案会在基础版的查询方式上，再增加上学历查询，个人工商查询等方式来合适该人员的ces。以确保保障企业的管理层的信息正确，让企业减少风险的发生。
              </p>
              <a-divider class="mt-0" />
              <ul class="flex flex-wrap justify-between text-lg font-medium">
                <li>身份基础信息查询</li>
                <li>负面社会安全验证</li>
                <li>金融信贷风险查询</li>
                <li>法院涉诉及失信查询</li>
                <li>学历查询</li>
                <li>个人工商查询</li>
              </ul>
              <div class="absolute bottom-0 w-full text-xl text-center">
                <a-button type="primary" class="w-full h-12 text-xl rounded-lg" @click="toTry">
                  立即咨询
                </a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="introduce">
      <div class="introduce-bg">
        <div class="introdece-text">
          <div>
            <h1 class="mb-2 text-4xl font-medium text-blue-500">
              yukces介绍
            </h1>
            <p class="p-0 text-gray-200">
              BCAK THE INTRODECTION
            </p>
          </div>
          <div class="container max-w-screen-xl mx-auto mt-10 text-lg text-left text-white">
            <p>
              是欢六科技推出的企业用工风险防范服务，是将传统的ces技术及经验与科学测评相结合，为用户提供员工雇前、雇后用工风险排查及预防。
              服务内容包括：身份信息核实、工作履历信息核验、金融征信信息核验、学历信息等内容，并且结合心理及能力测评系统，专业、高效地为客户提供互联网时代的线上云端及线下培训为一体的综合性用工风险防范服务，是企业用工风险解决专家。
            </p>
          </div>
          <div class="container flex items-start justify-between max-w-screen-xl mx-auto text-white mt-14">
            <div class="container mx-auto text-box">
              <div
                class="flex items-center justify-center w-16 h-16 border-blue-500 border-solid rounded-full border-1">
                <img src="@images/home/profile-line.png">
              </div>
              <div class="mt-6">
                <p class="text-2xl">
                  身份信息核实
                </p>
                <span class="w-32 text-xl text-gray-200">进行人员的身份信息背景调查核实</span>
              </div>
            </div>
            <div class="container mx-auto text-box">
              <div
                class="flex items-center justify-center w-16 h-16 border-blue-500 border-solid rounded-full border-1">
                <img src="@images/home/article-line.png">
              </div>
              <div class="mt-6 mix-w-[180px]">
                <p class="text-2xl">
                  工作履历信息核验
                </p>
                <span class="text-xl text-gray-200 w-44">履历信息人员核实调查</span>
              </div>
            </div>
            <div class="container mx-auto text-box">
              <div
                class="flex items-center justify-center w-16 h-16 border-blue-500 border-solid rounded-full border-1">
                <img src="@images/home/database.png">
              </div>
              <div class="mt-6 mix-w-[180px]">
                <p class="text-2xl">
                  金融征信信息核验
                </p>
                <span class="text-xl text-gray-200 w-44">查实雇工金融欠债核实</span>
              </div>
            </div>
            <div class="container mx-auto text-box">
              <div
                class="flex items-center justify-center w-16 h-16 border-blue-500 border-solid rounded-full border-1">
                <img src="@images/home/profile-line.png">
              </div>
              <div class="mt-6 mix-w-[180px]">
                <p class="text-2xl">
                  学历信息核验
                </p>
                <span class="text-xl text-gray-200 w-44">学历学院专人寻访调查</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="handbook">
      <div class="max-w-screen-xl mx-auto container">
        <div>
          <h1 class="mb-2 text-blue-500 text-4xl font-medium">
            ces指南
          </h1>
          <p class="text-gray-200 p-0">
            HANDBOOK
          </p>
        </div>
        <div class="flex flex-row text-left">
          <div class="text-2xl p-0 m-0 mr-14">
            <p class="p-0 m-0">
              2022.11.22
            </p>
          </div>
          <div>
            <h3 class="text-base font-semibold">
              你家保安做雇前背景调查了吗？快试试这个好用的家伙吧！<caret-right-outlined class="float-right" />
            </h3>
            <p class="text-gray-300 text-sm">
              近年来，保姆行业越来越火爆。在大城市的一些家庭中，很大一部分人聘请保姆帮忙带孩子或做家务。但是，雇用了保姆之后，虽然省心省力了，一些本不该发生的问题，也随之发生了——保姆虐待老人事件、保姆虐待孩子事件、保姆虐待行窃事件等等，尤其是近年来，“保姆事件”可谓层出不穷。雇前背景调查能规避和减少类似事件的发生。
            </p>
            <div class="text-right">
              <span class="border-b-2 border-x-0 border-t-0 border-solid border-blue-400">查看详情</span>
            </div>
          </div>
          <div class="h-50 w-56 ml-6">
            <img src="@images/home/Rectangle96.png">
          </div>
        </div>
        <a-divider />
        <div class="flex flex-row text-left">
          <div class="text-2xl p-0 m-0 mr-14">
            <p class="p-0 m-0">
              2022.11.22
            </p>
          </div>
          <div>
            <h3 class="text-base font-semibold">
              纳尼？ 从事保安服务需要无犯罪记录证明？<caret-right-outlined class="float-right" />
            </h3>
            <p class="text-gray-300 text-sm">
              人口红利消失？招人难？好不容易招到一个合适的，却因为无法提供无犯罪记录证明而无法录用。现在很多朋友们在找工作的时候都是比较重视的，毕竟找工作对于自己将来的生活有着很大的影响，如果要找工作的话，大家要注意一下，找正规的企业和单位，同时要注意入职的时候具体的办理手续，那么入职是否需要提供无犯罪记录证明？
            </p>
            <div class="text-right">
              <span class="border-b-2 border-x-0 border-t-0 border-solid border-blue-400">查看详情</span>
            </div>
          </div>
          <div class="h-50 w-56 ml-6">
            <img src="@images/home/Rectangle97.png">
          </div>
        </div>
        <a-divider />
        <div class="flex flex-row text-left">
          <div class="text-2xl p-0 m-0 mr-14">
            <p class="p-0 m-0">
              2022.11.22
            </p>
          </div>
          <div>
            <h3 class="text-base font-semibold">
              什么样的公司需要ces？<caret-right-outlined class="float-right" />
            </h3>
            <p class="text-gray-300 text-sm">
              多数求职者都不太想进行入职前ces，因为这样等于增加了一层入职风险，而且如今大数据越来越健全，一些很小的负面信息都有可能在ces环节暴露无遗。那么什么样的公司需要ces？求职者在面试时该如何甄别呢？
            </p>
            <div class="text-right">
              <span class="border-b-2 border-x-0 border-t-0 border-solid border-blue-400">查看详情</span>
            </div>
          </div>
          <div class="h-50 w-56 ml-6">
            <img src="@images/home/Rectangle98.png">
          </div>
        </div>
        <a-divider />
      </div>
      <!-- <div>
        <div>aa</div>
        <div>aa</div>
        <div>aa</div>
        <div>aa</div>
      </div> -->
    </div>
    <div class="customer">
      <div class="max-w-screen-xl mx-auto container">
        <div>
          <h1 class="mb-2 text-blue-500 text-4xl font-medium">
            合作客户
          </h1>
          <p class="text-gray-200 p-0">
            COOPERATIVE CLIENT
          </p>
        </div>
        <div class="grid grid-cols-4 gap-4 mt-8">
          <div>
            <img src="@images/home/Group1.png">
          </div>
          <div>
            <img src="@images/home/Group2.png">
          </div>
          <div>
            <img src="@images/home/Group3.png">
          </div>
          <div>
            <img src="@images/home/Group4.png">
          </div>
          <div>
            <img src="@images/home/Group5.png">
          </div>
          <div>
            <img src="@images/home/Group6.png">
          </div>
          <div>
            <img src="@images/home/Group7.png">
          </div>
          <div>
            <img src="@images/home/Group8.png">
          </div>
          <div>
            <img src="@images/home/Group9.png">
          </div>
          <div>
            <img src="@images/home/Group10.png">
          </div>
          <div>
            <img src="@images/home/Group11.png">
          </div>
          <div>
            <img src="@images/home/Group12.png">
          </div>
        </div>
      </div>
    </div>
    <div class="contract">
      <div
        class="grid grid-flow-col grid-cols-2 grid-rows-1 gap-4 overflow-hidden max-w-screen-xl mx-auto py-20 container items-center h-437px">
        <div class="overflow-hidden">
          <div class="w-full">
            <h1 class="mb-2 text-blue-500 text-4xl font-medium">
              联系方式
            </h1>
            <p class="text-gray-200 p-0 m-0">
              CONTRACT US
            </p>
          </div>
          <div class="w-full h-320px">
            <a-form ref="formRef" class="h-full pr-48" :model="contractForm" name="contractForm">
              <a-form-item class="w-full mt-10" name="name">
                <div
                  class="flex items-center justify-between border-x-0 border-t-0 border-b border-solid border-gray-200 pb-2 w-full">
                  <span class="text-white text-lg w-16 whitespace-nowrap">
                    姓名:
                  </span>
                  <a-input v-model:value="contractForm.name" :bordered="false" autocomplete="off"
                    class="text-lg text-white" />
                </div>
              </a-form-item>

              <a-form-item class="w-full mt-10" name="mobile">
                <div
                  class="flex items-center justify-between border-x-0 border-t-0 border-b border-solid border-gray-200 pb-2 w-full">
                  <span class="text-white text-lg w-16 whitespace-nowrap">
                    电话:
                  </span>
                  <a-input v-model:value="contractForm.mobile" :bordered="false" autocomplete="off"
                    class=" text-lg text-white" />
                </div>
              </a-form-item>
              <a-form-item class="w-full mt-10" name="companyName">
                <div
                  class="flex items-center justify-between border-x-0 border-t-0 border-b border-solid border-gray-200 pb-2 w-full">
                  <span class="text-white text-lg w-16 whitespace-nowrap">
                    公司:
                  </span>
                  <a-input v-model:value="contractForm.companyName" :bordered="false" autocomplete="off"
                    class=" text-lg text-white" />
                </div>
              </a-form-item>
              <a-form-item class="w-full mt-14" v-bind="contractForm">
                <a-button shape="round" :ghost="true" class="w-full ghost h-12 text-xl rounded-lg" @click="onSend">
                  <template #icon>
                    <mail-outlined />
                  </template>
                  立即发送
                </a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>

        <div class="">
          <img class="w-full" src="@images/home/Rectangle101.png">
        </div>
      </div>
    </div>
    <div class="footer mt-14">
      <div class="max-w-screen-xl mx-auto container">
        <div class="flex justify-between ">
          <div>
            <h2 class="text-xl">
              服务热线
            </h2>
            <h1 class="text-5xl">
              020-22091341
            </h1>
            <h2 class="text-xl">
              http://hc@gzhclw.com
            </h2>
            <h2 class="text-xl">
              广东番禺区东兴路317号碧桂园博耀中心14F-15F
            </h2>
          </div>
          <div class="w-183px h-173px bg-white">
            <img class="w-full" src="@images/home/qrcode.jpg">
          </div>
        </div>
        <a-divider />
        <div class="">
          <p class="text-sm p-0 m-0">
            Copyright © 2021 yuk集团技术中心, All Rights Reserved / 广州yuk人力咨询集团有限公司 / 粤ICP备16071409号
          </p>
          <p class="text-sm p-0 m-0">
            粤公网安备 44010602008888号 增值电信业务经营许可证：粤B2-20211202 营业执照
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref } from 'vue'
import logoWhite from '@images/home/logo-simple-white.png'
import logoColor from '@images/home/logo-color.png'
import { webSiteApi } from '@/api/web-site'
import { useMessage } from '@/hooks/message'
interface FormState {
  name: string,
  mobile: string,
  companyName: string,
}
const contractForm = ref<FormState>({
  name: '',
  mobile: '',
  companyName: '',
})
const router = useRouter()
// 走马灯
const varousel = ref()
const activeCard = ref(0)
const isShowBackTop = ref(true)
const changeDot = i => {
  activeCard.value = i
  varousel.value.goTo(i)
}

const activeImg = ref()

const toLogin = () => {
  router.push({
    name: 'login'
  })
}
const onSend = async () => {
  // console.log(contractForm.value)
  let res = await webSiteApi.contractUs(contractForm.value)
}
const nav = ref<null | HTMLElement>(null)
const handleChangeCarousel = (e1, e2) => {
  activeCard.value = e2
}

onMounted(() => {
  window.addEventListener('scroll', navTransition, true)
})
function navTransition() {
  const top = document.documentElement.scrollTop
  if (top > 10) {
    nav.value?.classList.add('nav-bg-white')
    nextTick(() => {
      // document.getElementById('activeImg').src = logoColor
      activeImg.value!.src = logoColor
    })
    isShowBackTop.value = true
  } else {
    nav.value?.classList.remove('nav-bg-white')
    nextTick(() => {
      // document.getElementById('activeImg').src = logoWhite
      activeImg.value!.src = logoWhite
    })
    isShowBackTop.value = false
  }
}
onBeforeUnmount(() => {
  window.removeEventListener('scroll', navTransition)
})
const toTry = () => {
  window.scrollTo({
    top: 3700,
    behavior: 'smooth'
  })
}
</script>
