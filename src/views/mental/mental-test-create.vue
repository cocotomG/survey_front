<template>
  <a-card class="h-full overflow-auto min-w-[1200px] relative">
    <a-button
      class="float-right w-20 h-8 cursor-pointer "
      @click="router.go(-1)"
    >
      返回
    </a-button>
    <div class="text-2xl font-semibold">
      新增测试套餐
    </div>
    <div class="g-title">
      填写基础信息
    </div>
    <div class="w-[660px] my-3">
      <basic-form
        v-bind="formAttrs"
        ref="infoFormRef"
      />
    </div>
    <div class="g-title">
      填写测评详情
    </div>
    <div class="questionForm pl-10">
      <div
        v-for="(item, index) in mentalQuestions"
        :key="index"
      >
        <a-divider />
        <a-form
          ref="questionsFormRef"
          :model="item"
        >
          <div
            v-for="(questions, index2) in item.mentalQuestionOptions"
            :key="index2"
          >
            <div class="flex">
              <a-form-item
                :name="['mentalQuestionOptions', index2, 'name']"
                :rules="{ required: true, message: '请输入题目内容' }"
                class="mr-5 w-1/3"
              >
                <a-input
                  v-model:value="questions.name"
                  placeholder="请输入您要新增的题目"
                />
              </a-form-item>
              <a-form-item
                :name="['mentalQuestionOptions', index2, 'mentalCharacterId']"
                :rules="{ required: true, message: '请选择勾选答案' }"
              >
                <a-radio-group
                  v-model:value="questions.mentalCharacterId"
                  :options="characterList"
                />
              </a-form-item>
            </div>
          </div>
          <div class="mb-5">
            <!-- <span
              class="cursor-pointer hover:text-primaryColor-default mr-10 underline ..."
              @click="addQuestion(index)"
            >在此题后插入新题</span> -->
            <a-button
              class="mr-5"
              @click="addQuestion(index,'add')"
            >
              <plus-outlined />
              往下新增
            </a-button>
            <!-- <a-button
              class="mr-5"
              :type="item.disabled == 0 ? 'primary': ''"
              @click="editCurrentQuestion(index,item.disabled)"
            >
              {{ item.disabled == 0 ? '保存': '编辑' }}
            </a-button> -->
            <a-button
              class="mr-5"
              @click="addQuestion(index,'copy')"
            >
              <copy-outlined />
              复制
            </a-button>
            <a-button
              v-if="!(mentalQuestions.length == 1)"
              @click="deleteCurrentQuestion(index)"
            >
              <delete-outlined />
              删除
            </a-button>
          </div>
        </a-form>
      </div>
    </div>
    <div class="absolute right-[400px] bottom-[30px]">
      <a-button
        type="primary"
        @click="saveQuestion"
      >
        提交
      </a-button>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/store'
import { cloneDeep } from 'lodash-es'
import { useMessage } from '@/hooks/message'
import { mentalApi } from '@/api/mental'
const { getReferenceItems } = useAppStore()
const router = useRouter()
const infoFormRef = ref<IForm.Expose>()
const questionsFormRef = ref<IForm.Expose>()
import { globalApi } from '@/api/global'

// interface MentalQuestionOptions {
//   name: string, // 选项名称
//   mentalCharacterId: number // 选项结果
// }
// interface MentalQuestion {
//   ranking: number, // 排序
//   // disabled: boolean,
//   mentalQuestionOptions: Model.MentalQuestionOptions[]
// }
const mentalQuestion: Model.MentalQuestions = {
  ranking: 1, // 排序
  // disabled: false,
  mentalQuestionOptions: [ // 试题选项
    {
      name: '', // 选项名称
      mentalCharacterId: 1 // 选项结果
    },
    {
      name: '', // 选项名称
      mentalCharacterId: 1 // 选项结果
    }
  ]
}
const mentalQuestions = ref<Model.MentalQuestions[]>([
  {
    ranking: 1, // 排序
    // disabled: true,
    mentalQuestionOptions: [ // 试题选项
      {
        name: '', // 选项名称
        mentalCharacterId: 1 // 选项结果
      },
      {
        name: '', // 选项名称
        mentalCharacterId: 1 // 选项结果
      }
    ]
  }
])
const addQuestion = (index, action) => {
  // let newQuestion = Object.assign({}, cloneDeep(mentalQuestion), { ranking: index + 1 })

  if (action === 'add') {
    // mentalQuestions.value[index + 1] = mentalQuestions.value[index]
    mentalQuestions.value.splice(index + 1, 0, cloneDeep(mentalQuestion))
  } else if (action === 'copy') {
    mentalQuestions.value.splice(index + 1, 0, cloneDeep(mentalQuestions.value[index]))
  }
}
const deleteCurrentQuestion = index => {
  if (mentalQuestions.value.length == 1) {
    return false
  }
  mentalQuestions.value.splice(index, 1)
}
// const editCurrentQuestion = async (index, value) => {
//   if (mentalQuestions.value[index].disabled == 0) {
//     await questionsFormRef.value[index].validate()
//   }
//   mentalQuestions.value[index].disabled = !value
//   console.log(mentalQuestions.value[index])
// }
const saveQuestion = () => {
  // console.log(questionsFormRef.value)
  Promise.all([
    infoFormRef.value?.validate(),
    questionsFormRef.value?.forEach(item => {
      item?.validate()
    })
  ]).then(async () => {
    console.log()
    await mentalApi.addMentalTest(Object.assign({}, infoFormRef.value?.formModel, { mentalQuestions: mentalQuestions.value }))
    useMessage.success('提交成功')
    router.go(-1)
  })
}

const formAttrs = computed((): IForm.Props => ({
  actionable: false,
  baseItemCol: { span: 24 },
  schemas: [
    {
      label: '套餐名称',
      field: 'name',
      required: true,
      component: 'Input',
      componentProps: {
        maxlength: 30
      }
    } as IForm.Schema<'Input'>,
    {
      label: '套餐类型',
      field: 'type',
      component: 'ReferenceSelect',
      required: true,
      componentProps: {
        referenceKey: 'mentalTestTypeEnum'
      }
    } as IForm.Schema<'ReferenceSelect'>,
    {
      label: '套餐原价',
      field: 'amount',
      component: 'InputNumber',
      required: true,
      componentProps: {
        min: 0,
        precision: 2,
        addonAfter: '元'
      }
    } as IForm.Schema<'InputNumber'>,
    {
      label: '套餐折扣价',
      field: 'discountAmount',
      component: 'InputNumber',
      required: true,
      componentProps: {
        min: 0,
        precision: 2,
        addonAfter: '元'
      }
    } as IForm.Schema<'InputNumber'>,
    {
      label: '套餐耗时',
      field: 'description',
      component: 'Input',
      required: true,
      componentProps: {
        placeholder: '请输入套餐耗时（例：5-10分钟）',
        maxlength: 30
      }
    } as IForm.Schema<'Input'>,
    {
      label: '状态',
      field: 'isEnable',
      component: 'RadioGroup',
      required: true,
      defaultValue: 1,
      componentProps: {
        options: getReferenceItems('enableEnum'),
      }
    } as IForm.Schema<'RadioGroup'>,
  ]
}))
const characterList = ref()
onMounted(async () => {
  characterList.value = await globalApi.getSelectorOptions({ type: 'mental_character' })
})
</script>