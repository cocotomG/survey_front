import { ModelFormProp } from '@/components/form/props'
import { omit } from 'lodash-es'

// 默认表格设置
const defaultFormProp: IForm.Props = {
  layout: 'vertical',
  baseItemCol: { span: 24 },
}

// 默认模态框设置
const defaultModalProp: ModelFormProp = {
  model: {},
  width: 580,
  okText: '提交',
  cancelText: '取消',
  successCallback: () => { },
}

// 模态框显示与隐藏
const visible = ref(false)

// 模态框引用
const modelFromRef = ref<IModalForm.Expose>()

/** 全局模态框，表单组件 */
const formRef = computed((): IForm.Expose => modelFromRef.value!.formRef)

/** 全局模态框，表单信息 */
const formModel = computed((): Recordable => formRef.value.formModel)

// 模态框是否渲染
// eslint-disable-next-line no-underscore-dangle
const _isRender = ref(false)

// 监听 visible 的变化，当关闭显示时，延迟 500 毫秒的动画，再关闭其渲染
watch(visible, newValue => {
  const CLOSE_ANIMATION_DURATION = 500
  if (newValue) {
    _isRender.value = newValue
  } else if (newValue === _isRender.value) {
    setTimeout(() => {
      _isRender.value = false
    }, CLOSE_ANIMATION_DURATION)
  }
})

const modelFormAttr = ref() as Ref<ModelFormProp>

// 初始化模态框，即显示模态框
async function init(props: ModelFormProp) {
  modelFormAttr.value = {
    formProp: Object.assign({}, defaultFormProp, props.formProp),
    modalProp: Object.assign({}, defaultModalProp, props.modalProp, { destroyOnClose: props.destroyOnClose }),
    ...omit(props, ['formProp', 'modalProp']),
  }
  await nextTick()
  visible.value = true
}


/** 全局模态框实例 */
const globalModelForm = reactive({

  /** 全局模态框初始化函数 */
  init,

  /** 全局模态框引用，用于提取内部值 */
  modelFromRef,

  /** 全局模态框，表单组件实例 */
  formRef,

  /** 全局模态框，表单信息 */
  formModel,

  /** 模态框的属性配置 */
  modelFormAttr,

  /** 模态框显示控制 */
  visible,

  /** 全局模态框是否渲染 */
  _isRender,

})


export default globalModelForm


