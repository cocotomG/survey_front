<template>
  <a-tree v-if="treeDataOptions.length" v-bind="bindAttrs" />
</template>
<script lang="ts" setup>
import { TreeProps } from 'ant-design-vue'
import { DataNode } from 'ant-design-vue/es/tree';
import { isFunction } from 'lodash-es'
import { computed, onMounted, ref, useAttrs } from 'vue'
import { treeApiSelectProps, TreeApiSelectProps } from './props'

const props = defineProps(treeApiSelectProps)
const attrs = useAttrs()
type EmitEvents = {
  (e: 'change', ...value): void,
  (e: 'update:value', ...value): void
}
const emits = defineEmits<EmitEvents>()
const treeDataOptions = ref<DataNode[]>([])
onMounted(() => {
  fetch()
})

const checkedIds = ref<any>([])

if (props.value) {
  checkedIds.value = props.value
}

const bindAttrs = computed((): TreeProps => ({
  ...attrs,
  treeData: treeDataOptions.value,
  checkable: true,
  selectable: false,
  checkStrictly: props.checkStrictly, // false onCheck v的格式['v'], true onCheck v格式：v: { checked: []，: Key[];}, options：CheckInfo
  checkedKeys: unref(checkedIds),
  onCheck: (v: any, options) => {
    console.log(props.checkStrictly, 'props.checkStrictly')
    if (props.checkStrictly) {
      let checked = v.checked
      if (options.checked) {
        if (options.node.children) {
          checked = checkedItem(checked, options.node.children)
        }
      } else {
        checked = cancelCheckedItem(checked, options.node.children)
      }
      checkedIds.value = checked
      emits('update:value', checked)
    } else {
      checkedIds.value = v
      console.log(v)
      emits('update:value', v)
    }

  }
}))

//勾选
function checkedItem(arr, children): string[] {
  let checkeds: string[] = arr
  children.forEach(item => {
    checkeds.push(item.id)
    if (item.children.length > 0) {
      checkedItem(checkeds, item.children)
    }
  })
  return checkeds
}

//取消勾选
function cancelCheckedItem(arr, children): string[] {
  let checkeds: string[] = arr

  for (let i = 0; i < checkeds.length; i++) {
    let item = checkeds[i]
    children.forEach(child => {
      if (child.id === item) {
        checkeds.splice(i, 1)
        i--;
      }
      if (child.children.length > 0) {
        cancelCheckedItem(checkeds, child.children)
      }
    })
  }

  return checkeds
}


async function fetch() {
  const { api, apiParams, valueToString } = props
  if (!api && !isFunction(api)) {
    return
  }
  let result = await api(apiParams)
  if (valueToString && attrs?.fieldNames !== undefined) {
    transforms(result, attrs?.fieldNames?.key)
  }
  treeDataOptions.value = result
}

function transforms(arr, valueKey) {
  arr.forEach(item => {
    item[valueKey] = item[valueKey].toString()
    if (item.children) {
      transforms(item.children, valueKey)
    } else {
      delete item.children
    }
  })
}
</script>
