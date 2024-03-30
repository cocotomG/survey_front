import { ComputedRef, computed, unref, ref } from 'vue'

import { merge, isArray } from 'lodash-es'

export function useSchema(propsRef: ComputedRef<IForm.Props>) {
  // 默认操作列
  const defaultActionCol = 6

  // 总渲染列
  let totalSpan = 0

  // 是否折叠
  const collapsed = ref(true)

  // 配置
  const schemasRef = ref<IForm.Schema[]>([])

  // 获取配置，性能问题，每次都会返回新的对象，导致后续 computed 全部更新
  const getSchemas = computed(() => {
    totalSpan = 0
    const { schemas: propSchemas, collapsible, layout } = unref(propsRef)
    const schemas = unref(schemasRef).length > 0 ? unref(schemasRef) : propSchemas
    const baseCol = unref(propsRef).baseItemCol
    return schemas!.map(schema => {
      const span = (schema.span ?? baseCol?.span ?? (layout === 'vertical' ? 24 : defaultActionCol)) as number
      totalSpan += span
      // 在原对象中进行合并，避免对象地址发生变更，导致后续依赖 schema 的 computed 无谓重新执行
      return Object.assign(schema, {
        key: Symbol(schema.field),
        span,
        collapsible: !!(collapsible && totalSpan > 24 - defaultActionCol),
      })
    })
  })

  // 切换折叠状态
  function toggleCollapse() {
    const { collapsible } = unref(propsRef)
    if (collapsible) {
      collapsed.value = !collapsed.value
    }
  }

  // 更新原有配置，不额外新增，或是删除配置
  function updateSchema(schema: Partial<IForm.Schema> | Partial<IForm.Schema>[]) {
    let updateSchemas: Partial<IForm.Schema>[] = []
    updateSchemas = isArray(schema) ? schema : [schema]
    const schemas: IForm.Schema[] = []
    updateSchemas
      .filter(schema => !!schema.field)
      .forEach(newSchema => {
        unref(getSchemas).forEach(oldSchema => {
          if (oldSchema.field === newSchema.field) {
            schemas.push(merge({}, oldSchema, newSchema))
          } else {
            schemas.push(oldSchema)
          }
        })
      })

    schemasRef.value = schemas
  }

  // 在头部插入配置，在特定元素前
  function insertSchema(schema: IForm.Schema | IForm.Schema[], baseField?: string) {
    const newSchemas = isArray(schema) ? schema : [schema]
    schemasRef.value = unref(getSchemas)
    let baseFieldIndex = 0
    if (baseField) {
      baseFieldIndex = schemasRef.value.findIndex(schema => schema.field === baseField)
    }
    schemasRef.value.splice(baseFieldIndex, 0, ...newSchemas)
  }

  // 在尾部补充配置，在特定元素后
  function appendSchema(schema: IForm.Schema | IForm.Schema[], baseField?: string) {
    const newSchemas = isArray(schema) ? schema : [schema]
    schemasRef.value = unref(getSchemas)
    let baseFieldIndex = baseField ? schemasRef.value.findIndex(schema => schema.field === baseField) : -1
    if (baseFieldIndex === -1) {
      baseFieldIndex = schemasRef.value.length
    }
    schemasRef.value.splice(baseFieldIndex + 1, 0, ...newSchemas)
  }

  // 删除配置项
  function deleteSchema(field?: string | string[]) {
    const deleteFields = isArray(field) ? field : [field]
    schemasRef.value = unref(getSchemas).filter(schema => deleteFields.indexOf(schema.field) === -1)
  }

  // 操作列
  const actionSpan = computed(() => (!collapsible.value || !collapsed.value ? 24 - (totalSpan % 24) : defaultActionCol))

  // 是否折叠
  const collapsible = computed(() => {
    const { collapsible } = unref(propsRef)
    return collapsible && totalSpan > 24 - defaultActionCol
  })

  return {
    getSchemas,
    insertSchema,
    appendSchema,
    updateSchema,
    deleteSchema,
    collapsible,
    collapsed,
    toggleCollapse,
    actionSpan,
  }
}
