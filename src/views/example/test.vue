<template>
  <div>
    test
    <!-- <SocailTableFormSimple ref="socailTableFormSimple" v-model:value="data.details">
    </SocailTableFormSimple> -->
    <SocailTableForm ref="socailTableFormSimple" v-model:value="plans"></SocailTableForm>
    <a-button @click="clean">重置</a-button>
    <a-button @click="submitData">提交</a-button>
  </div>
</template>
<script setup lang="ts">
import SocailTableForm from '@/components/form/components/business-components/social-table-form/social-table-form.vue'
const socailTableFormSimple = ref()
const plans = ref([])
async function submitData() {
  await socailTableFormSimple.value.validate()
}

function clean() {
  socailTableFormSimple.value.resetFields()
}

</script>