
import { ComputedRef, computed, unref } from 'vue'
import { isArray } from 'lodash-es'

// 创建默认消息提示
export function createDefaultMsg(schema: IForm.Schema, validateMassage = true) {
  const { component = 'Input', label } = schema
  if (component === 'DateRangePicker') {
    return ['请选择开始时间', '请选择结束时间']
  }

  let msg = ''
  switch (true) {
    case component.includes('Picker'):
    case component.includes('Select'):
    case component.includes('Cascader'):
    case component.includes('Checkbox'):
    case component.includes('Radio'):
    case component.includes('Switch'):
      msg = '请选择'
      break
    default:
      msg = '请输入'
      break
  }
  return validateMassage ? `${msg}${label}` : msg
}
// 创建表单配置规则
export function createSchemaRule(schema: IForm.Schema) {
  let rules = schema.rules ?? []

  if (schema.required && rules?.findIndex(rule => Reflect.get(rule, 'required')) < 0) {
    const validator = {
      required: schema.required,
      message: createDefaultMsg(schema, true)
    }
    if (isArray(rules)) {
      rules.push(validator)
    } else {
      rules = [rules, validator]
    }
  } else if (!schema.required) {
    rules = rules.filter(rules => !rules.required)
  }
  return rules
}

export function useFormRules(propsRef: ComputedRef<IForm.Props>) {
  const getRules = computed(() => {
    const { schemas, rules } = unref(propsRef)
    let schemasRules = {}
    schemas
      ?.filter(schema => schema.required || schema.rules)
      .forEach(schema => {
        let schemaRules = schema.rules ?? []
        if (schema.required && schemaRules?.findIndex(rule => Reflect.get(rule, 'required')) < 0) {
          const validator = {
            required: schema.required,
            message: createDefaultMsg(schema, true)
          }
          if (isArray(schemaRules)) {
            schemaRules.push(validator)
          } else {
            schemaRules = [schemaRules, validator]
          }
        }
        schemasRules[schema.field!] = schemaRules
      })
    return {
      ...rules,
      ...schemasRules,
    }
  })

  return {
    getRules,
  }
}
