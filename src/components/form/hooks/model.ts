import { ComputedRef, unref, reactive, watch } from 'vue'
import { isFunction, isUndefined } from 'lodash-es'

export function useModel(propsRef: ComputedRef<IForm.Props>) {
  // 表单模型
  const formModel = reactive<Recordable>({})
  const displayModel = reactive<Recordable>({})

  // 监听model属性
  watch(
    () => [propsRef.value.model],
    initFormModel,
    { immediate: true },
  )

  // 初始化 form 表单的内容
  function initFormModel() {
    // 获取整个 form 表单的 model 数据，及 schemas 模型配置项
    const { model = {}, schemas } = unref(propsRef)
    schemas
      ?.filter(schemaItem => schemaItem.field) // 过滤模型配置项，只设置还有后端字段值的配置
      .forEach(schemaItem => {
        let value: any = undefined // form 表单组件中的默认值

        // 如果 defaultValue 是个钩子处理函数，则传入数据对象，由外部进行设置
        if (isFunction(schemaItem.defaultValue)) {
          value = schemaItem.defaultValue(model)
        } else if ( // 如果没有钩子处理函数，而模型中有值，则使用模型中的值回填
          model
          && (model[schemaItem.field!] || (model[schemaItem.field!] === 0 && !schemaItem.zeroToUndefined))
        ) {
          value = model[schemaItem.field!]
        } else if (!isUndefined(schemaItem.defaultValue)) { // 否则使用配置默认值
          value = schemaItem.defaultValue
        }

        formModel[schemaItem.field!] = value
      })
  }

  // 设置表单模型
  function setFormModel(record: Recordable) {
    Object.keys(record).forEach(field => {
      formModel[field] = record[field]
    })
  }

  return {
    formModel,
    displayModel,
    setFormModel,
    initFormModel,
  }
}
