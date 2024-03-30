<style lang='less' scoped>

</style>

<template>
  <div>
    <div
      style=" margin-top: -20px; margin-left: -18px; width: calc(100% + 36px); background-color: white;"
      class="flex  sticky top-0 pt-5 h-20 shadow"
    >
      <div
        v-for="item in 5"
        :key="item"
        class="flex-1 text-center bg-blue-200 mx-6 leading-8 cursor-pointer text-l rounded text-primaryColor-default h-8 "
      >
        全部
      </div>

      <div class="w-10 rounded text-center bg-blue-200 text-primaryColor-default h-8 ">
        ...
      </div>
    </div>
    <div
      v-for="item in 100"
      :key="item"
      class="cursor-pointer w-full duration-300 h-100 mt-8 py-5 mr-9 rounded-md box-border hover:shadow-xl"
    >
      <div class="mx-5  flex justify-between align-bottom">
        <div class="font-semibold ">
          导入提醒
        </div> <div>2022-08-1</div>
      </div>
      <div class="mx-5 flex  justify-between">
        <div class="text-xs  mt-4 text-gray-300">
          管理员admin8在乱搞，系统烂了
        </div>
        <div class="mt-4 text-primaryColor-default cursor-pointer">
          删除
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'

</script>