<style scoped lang="less">
.ant-input-number-affix-wrapper {
  width: 100%;
}
</style>
<script lang="tsx">
import { Col, Form, FormItemProps } from 'ant-design-vue/es'
import { omit, pick, isFunction } from 'lodash-es'
import { computed, defineComponent, PropType } from 'vue'
import { componentTypeMap } from './component-type-map'
import { useFormContext } from '../hooks/context'
import { createDefaultMsg, createSchemaRule } from '../hooks/rule'


export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<IForm.Schema>,
      required: true,
    },
    formProps: {
      type: Object as PropType<IForm.Props>,
      default: () => ({}),
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const formContext = useFormContext()

    // 是否允许折叠
    const isNotCollapsed = computed(() => !props.schema.collapsible || !props.collapsed)

    // 是否显示
    const isShow = computed((): boolean => {
      const { isShow = true } = props.schema

      return isFunction(isShow) ? isShow({
        schema: props.schema,
        values: { ...formContext.formModel },
        field: props.schema.field!
      }) : isShow
    })

    // 操作项数据更新回调函数
    function handleUpdateValue(value) {
      formContext.setFormModel({ [props.schema.field!]: value })
      formContext.validate([props.schema.field!])
    }

    // col 容器配置
    const colAttrs = computed(() => ({
      span: props.schema.span,
      ...pick(props.schema, ['span']),
    }))

    // componentProps抽取required是否表单必填
    let { componentProps } = props.schema
    // 组件的属性是否为外部回调函数
    if (isFunction(componentProps)) {
      componentProps = componentProps({
        schema: props.schema,
        values: { ...formContext.formModel },
        field: props.schema.field,
        actions: omit(formContext, ['formModel']),
      })
    }

    // componentProps?.required 控制必填 非必填
    if (componentProps?.required !== undefined && typeof componentProps?.required === 'boolean') {
      props.schema!.required = componentProps?.required
    }


    // formItem 属性配置
    const formItemAttrs = computed(() => {
      const labelWidth = '120px' // label宽度
      const { formProps } = props
      return {
        name: props.schema.field,
        rules: createSchemaRule(props.schema),
        labelCol: { style: { width: formProps.layout !== 'vertical' ? labelWidth : '100%' } },
        wrapperCol: { style: { width: formProps.layout !== 'vertical' ? `calc(100% - ${labelWidth})` : '100%' } },
        ...omit(props.schema, ['name', 'component', 'componentProps', 'defaultValue', 'span', 'rules', 'required']),
        validateTrigger: '',
      } as FormItemProps
    })

    // 监听 formModel（即本组件对应的 model 值变化）的变化，重置组件内容，如重置组件的 value 等属性
    const comAttrs = computed(() => {
      let { component: componentName } = props.schema

      // 已抽取到外部,提取required
      // 组件的属性是否为外部回调函数
      // if (isFunction(componentProps)) {
      //   componentProps = componentProps({
      //     schema: props.schema,
      //     values: { ...formContext.formModel },
      //     field: props.schema.field,
      //     actions: omit(formContext, ['formModel']),
      //   })
      // }

      // 检查本组件是否是勾选类型的组件
      const isCheckComponent = componentName && ['Switch', 'Checkbox'].includes(componentName)
      return {
        allowClear: true, // 是否允许清除
        placeholder: createDefaultMsg(props.schema), // placeholder 提示语
        fieldName: props.schema.field, // 字段名
        ...componentProps, // 其他配置项
        disabled: formContext.isReadOnly.value || componentProps?.disabled, // todo
        [isCheckComponent ? 'checked' : 'value']: formContext.formModel[props.schema.field!], // 监听 form model 中，本组件的数据变化，重置组件的值
        [isCheckComponent ? 'onUpdate:checked' : 'onUpdate:value']: handleUpdateValue,
      }
    })

    // 渲染具体组件的函数
    function renderCom() {
      const { component = 'Input', customComponent, renderComponentContent } = props.schema
      let Com: ReturnType<typeof defineComponent> = null
      if (customComponent) {
        Com = toRaw(customComponent) // 转化为普通对象，避免响应式依赖，频繁变动
      } else {
        Com = componentTypeMap[component] as ReturnType<typeof defineComponent>
      }

      return renderComponentContent ? (
        <Com {...comAttrs.value} v-slots={renderComponentContent}></Com>
      ) : (
        <Com {...comAttrs.value} />
      )
    }

    return () => (
      isShow.value && (
        <Col {...colAttrs.value} v-show={isNotCollapsed.value}>
          <Form.Item {...formItemAttrs.value}>{renderCom()}</Form.Item>
        </Col>
      )
    )
  },
})
</script>
