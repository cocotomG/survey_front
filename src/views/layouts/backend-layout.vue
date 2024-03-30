<style lang="less" scoped>
@nav-size-height: 60px;
@layout-max-width: 1100px;

.layout {
  height: 100vh;
  width: 100%;
}

.layout-navbar {
  padding: 0;
  background-color: #FFFFFF;
  // background-color: #21209C;
}

.layout-sider {
  position: "fixed";
  top: 0;
  bottom: 0;
  left: 0;
  overflow: "auto";
  height: "100vh";

  .logo {
    margin: 4px 0;
    height: 50px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
    background-image: url("@images/logo-simple-white.png");

    &.collapsed {
      background-image: url("@images/logo-simple-white.png");
      margin: 0 12px;
    }
  }
}
</style>

<template>
  <a-layout class="layout" style="height: 100vh;" theme="light">
    <a-layout-sider v-model:collapsed="collapsed" class="layout-sider" collapsible :width="210" :collapsed-width="48"
      theme="dark">
      <div :class="{ logo: true, collapsed: collapsed }" />
      <!--
          <div class="logo">
            <img
              v-if="!collapsed"
              class="logo-text"
              src="@images/logo-text.png"
            >
            <img
              v-else
              src="@images/logo-simple.png"
              class="logo-collapsed"
            >
          </div> -->
      <Menu />
    </a-layout-sider>


    <a-layout>
      <a-layout-header class="flex shadow layout-navbar">
        <nav-bar />
      </a-layout-header>
      <a-layout-content class="overflow-auto">
        <Content />
      </a-layout-content>
      <!-- <a-layout-footer>
        <Footer />
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import NavBar from './components/navbar/index.vue'
import Menu from './components/menu.vue'
import Content from './components/content.vue'

const collapsed = ref(false)


</script>
