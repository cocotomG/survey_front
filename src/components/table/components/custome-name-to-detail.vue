<template>
  <span
    :title="props.title"
    class="cursor-pointer hover:text-primaryColor-default underline ..."
    @click="handleToDetail(props.id, props?.text)"
  >{{ props.text }}</span>
</template>
<script lang='ts' setup>
import { router } from '@/router'
export interface Props {
  title?: string,
  text: string,
  id: string | number,
  type:'worker' | 'project' | 'payroll',
}
const props = withDefaults(defineProps<Props>(), {
  title: '去详情页'
})
const handleToDetail = (id: string | number, text?: string) => {
  switch (props.type) {
    case 'project':
      router.push({
        name: 'projectDetail',
        query: { id }
      })
      break
    case 'worker':
      router.push({
        name: 'workerDetail',
        params: { id }
      })
      break
    case 'payroll':
      router.push({
        name: 'payrollDetail',
        params: {
          id,
        },
        query: {
          payrollName: text
        }
      })
      break
    default:

  }

}
</script>
