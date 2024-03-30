<template>
  <a-card class="h-full overflow-auto min-w-[1200px]">
    <a-button
      class="float-right w-20 h-8 cursor-pointer "
      @click="router.go(-1)"
    >
      返回
    </a-button>
    <div class="text-2xl font-semibold">
      新增测试套餐
    </div>
    <div class="w-[660px] my-3">
      <basic-form
        v-bind="basicInfoFormAttrs"
        ref="infoFormRef"
      />
    </div>
    <div class="g-title">
      填写测评详情
    </div>
    <div v-if="mentalTestInfo">
      <grid-table
        v-bind="bindGridTableAttr"
        ref="questionsTableRef"
      />
      <basic-modal
        v-bind="bindModalAttrs"
        v-model:visible="visible"
      >
        <basic-form
          v-bind="QuestionOneForm"
          ref="QuestionOneFormRef"
        />
        <basic-form
          v-bind="QuestionTwoForm"
          ref="QuestionTwoFormRef"
        />
      </basic-modal>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/store'
import { omit, find } from 'lodash-es'
import { useMessage } from '@/hooks/message'
import { mentalApi } from '@/api/mental'
import { globalApi } from '@/api/global'
import { BasicModalProps } from '@/components/modal/prop'
const { getReferenceItems } = useAppStore()
const router = useRouter()
// 测试套餐id
const route = useRoute()
const mentalTestId = ref(route.params.id)
// 套餐问题数组
const mentalTestInfo = ref<Model.MentalQuestionInfo>()
// 人格列表
const characterList = ref()
const getMentalTetInfo = async () => {
  mentalTestInfo.value = await mentalApi.getMentalTestDetail({ id: mentalTestId.value })
  characterList.value = await globalApi.getSelectorOptions({ type: 'mental_character' })
  infoFormRef.value?.setFormModel({ ...mentalTestInfo.value })
}
onMounted(() => {
  getMentalTetInfo()
})
// 当前编辑或插入的行
interface CurrentRecord {
  id: number | undefined,
  mentalTestId: number | undefined,
  beforeMentalQuestionId: number | undefined,
  questionsOptionsId: number[]
}
const currentRecord = reactive<CurrentRecord>({
  id: undefined, // 问题id
  mentalTestId: Number(mentalTestId.value), // 套餐id
  beforeMentalQuestionId: undefined, // 插入问题之前的id
  questionsOptionsId: []
})

const visible = ref(false)
// 模态框
const bindModalAttrs = computed((): BasicModalProps => ({
  title: currentRecord.id ? '编辑问题' : '新建问题',
  width: 1000,
  okText: '确定',
  destroyOnClose: true,
  onOk: async () => {
    await Promise.all([
      QuestionOneFormRef.value?.validate(),
      QuestionTwoFormRef.value?.validate()
    ]).then(async success => {
      if (currentRecord.id) {
        await mentalApi.updateMentalTestQuestion(Object.assign(
          {
            id: currentRecord.id,
            mentalTestId: currentRecord.mentalTestId
          },
          {
            mentalQuestionOptions: [
              {
                ...success[0],
                id: currentRecord.questionsOptionsId[0]
              },
              {
                ...success[1],
                id: currentRecord.questionsOptionsId[1]
              }
            ]
          }
        ))
        // 新建（插入）
      } else if (currentRecord.beforeMentalQuestionId) {
        await mentalApi.insertMentalTestQuestion(Object.assign(
          {
            mentalTestId: currentRecord.mentalTestId,
            beforeMentalQuestionId: currentRecord.beforeMentalQuestionId
          },
          { mentalQuestionOptions: [success[0], success[1]] }
        ))
      }
    })
    visible.value = false
    useMessage.success(currentRecord.mentalTestId ? '编辑成功' : '新增成功')
    // await getMentalTetInfo()
    questionsTableRef.value?.reload()
  },
  onCancel: () => {
    currentRecord.id = undefined
    currentRecord.beforeMentalQuestionId = undefined
    // currentRecord.mentalTestId = undefined
    currentRecord.questionsOptionsId = []
    console.log(currentRecord)

  },
}))

// 两个问题选项
const QuestionOneFormRef = ref<IForm.Expose>()
const QuestionTwoFormRef = ref<IForm.Expose>()
const QuestionOneForm = computed((): IForm.Props => ({
  actionable: false,
  baseItemCol: { span: 12 },
  schemas: [
    {
      label: '',
      span: 24,
      // isShow: false,
      component: 'PureDisplay',
      renderComponentContent: () => '选项1'
    } as IForm.Schema<'PureDisplay'>,
    {
      label: '',
      field: 'name',
      span: 12,
      required: true,
      component: 'Input',
    } as IForm.Schema<'Input'>,
    {
      label: '',
      field: 'mentalCharacterId',
      span: 12,
      required: true,
      component: 'RadioGroup',
      componentProps: {
        options: characterList.value
      }
    } as IForm.Schema<'RadioGroup'>,
  ]
}))
const QuestionTwoForm = computed((): IForm.Props => ({
  actionable: false,
  baseItemCol: { span: 12 },
  schemas: [
    {
      label: '',
      span: 24,
      // isShow: false,
      component: 'PureDisplay',
      renderComponentContent: () => '选项1'
    } as IForm.Schema<'PureDisplay'>,
    // {
    //   label: '',
    //   field: 'id',
    //   isShow: false
    // },
    {
      label: '',
      field: 'name',
      span: 12,
      required: true,
      component: 'Input',
    } as IForm.Schema<'Input'>,
    {
      label: '',
      field: 'mentalCharacterId',
      span: 12,
      required: true,
      component: 'RadioGroup',
      componentProps: {
        options: characterList.value
      }
    } as IForm.Schema<'RadioGroup'>,
  ]
}))

// 套餐问题列表
const questionsTableRef = ref<IGridTable.Expose>()
const bindGridTableAttr = computed((): IGridTable.Props => ({
  deleteable: true,
  api: {
    getList: mentalApi.getMentalQuestionList,
    del: async id => {
      await mentalApi.delMentalTestQuestion({
        id,
        mentalTestId: mentalTestId.value,
      })
      await getMentalTetInfo()
    }
  },
  getListApiParams: {
    mentalTestId: mentalTestId.value,
    // name: route.params.name
  },
  // dataSource: mentalTestInfo.value?.mentalQuestions,
  columnSchemas: [
    {
      title: '选项1',
      customRender: ({ record }) => {
        let mentalCharacterId = record.mentalQuestionOptions[0].mentalCharacterId
        return `${record.mentalQuestionOptions[0].name}${getQuestionCharacter(mentalCharacterId)}`
      }
    },
    {
      title: '选项2',
      customRender: ({ record }) => {
        let mentalCharacterId = record.mentalQuestionOptions[1].mentalCharacterId
        return `${record.mentalQuestionOptions[1].name}${getQuestionCharacter(mentalCharacterId)}`
      }
    },
  ],
  rowActionsWidth: 300,
  rowActions: [
    {
      label: '编辑',
      click: record => {
        visible.value = true
        currentRecord.beforeMentalQuestionId = undefined
        currentRecord.mentalTestId = Number(mentalTestId.value)
        currentRecord.id = record.id
        currentRecord.questionsOptionsId = [record.mentalQuestionOptions[0].id, record.mentalQuestionOptions[1].id]
        nextTick(() => {
          QuestionOneFormRef.value?.setFormModel({ ...record.mentalQuestionOptions[0] })
          QuestionTwoFormRef.value?.setFormModel({ ...record.mentalQuestionOptions[1] })
        })
      }
    },
    {
      label: '复制',
      click: async record => {
        await mentalApi.insertMentalTestQuestion(Object.assign(
          {
            mentalTestId: Number(mentalTestId.value),
            beforeMentalQuestionId: record.id
          },
          {
            mentalQuestionOptions: [
              {
                name: record.mentalQuestionOptions[0].name,
                mentalCharacterId: record.mentalQuestionOptions[0].mentalCharacterId
              }, {
                name: record.mentalQuestionOptions[1].name,
                mentalCharacterId: record.mentalQuestionOptions[1].mentalCharacterId
              }
            ]
          }
        ))
        questionsTableRef.value?.reload()
        useMessage.success('复制成功')
        // await console.log()

      }
    },
    {
      label: '在此题后插入新题',
      click: record => {
        visible.value = true
        currentRecord.id = undefined
        currentRecord.mentalTestId = Number(mentalTestId.value)
        currentRecord.beforeMentalQuestionId = record.id
      }
    },
  ],
  pagination: {
    pageSize: 20
  }
}))

// 套餐基本信息
const infoFormRef = ref<IForm.Expose>()
const basicInfoFormAttrs = computed((): IForm.Props => ({
  isReadOnly: true,
  layout: 'horizontal',
  actionAlign: 'center',
  formHeadTitle: '套餐基础信息',
  isFoldable: true,
  baseItemCol: { span: 24 },
  dataEditFromUpdateFun: params => mentalApi.updateBasicInfo(Object.assign({}, params, { id: mentalTestId.value })),
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
        precision: 2
      }
    } as IForm.Schema<'InputNumber'>,
    {
      label: '套餐折扣价',
      field: 'discountAmount',
      component: 'InputNumber',
      required: true,
      componentProps: {
        min: 0,
        precision: 2
      }
    } as IForm.Schema<'InputNumber'>,
    {
      label: '套餐耗时',
      field: 'description',
      required: true,
      component: 'Input',
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

const getQuestionCharacter = v => {
  let character = find(characterList.value, ['value', v])?.label
  return character ? `（${character}号型人格）` : ''
}

</script>