import { defineStore } from 'pinia'
import { globalApi } from '@/api/global'
import { isNumber, isString } from 'lodash-es'
import { localReference } from '@/types/local-reference'
const referenceColorMap = {
  green: '#00B42A',
  orange: '#FF9A2E',
  red: '#F53F3F',
}

interface GlobalState {

  /** 枚举类型 */
  reference: Nullable<
    Partial<{ [key in Reference.ReferenceKey]: Reference.ReferenceItem[] }>
  >;
  referenceColorMap: typeof referenceColorMap;
}

/** app 全局信息 */
export const useAppStore = defineStore('App', {
  state: (): GlobalState => ({
    reference: null,

    /** reference 中配置的颜色转换器 */
    referenceColorMap,
  }),

  actions: {

    /** 获取枚举值详情 */
    getReferenceLabel(
      referenceKey: Reference.ReferenceKey,
      value: number
    ): string {
      const referenceItem = this.getReferenceItems(referenceKey)
      if (!isNumber(value) && !isString(value)) {
        return ''
      }
      return (
        referenceItem.find(item => item.value.toString() === value.toString())
          ?.label || ''
      )
    },

    /** 获取枚举值列表 */
    getReferenceItems(referenceKey: Reference.ReferenceKey): Reference.ReferenceItem[] {
      return this.reference?.[referenceKey] || []
    },

    /** 获取枚举值的值映射列表 */
    getReferenceItemsValueMap(referenceKey: Reference.ReferenceKey): Record<number, Reference.ReferenceItem> {
      let valueMap: Record<number, Reference.ReferenceItem> = {}
      this.getReferenceItems(referenceKey).forEach(item => {
        valueMap[item.value] = toRaw(item)
      })
      return valueMap
    },

    /** 获取枚举值的值映射列表 */
    getReferenceItemsLabelMap(referenceKey: Reference.ReferenceKey): Record<string, Reference.ReferenceItem> {
      let labelMap: Record<string, Reference.ReferenceItem> = {}
      this.getReferenceItems(referenceKey).forEach(item => {
        labelMap[item.label] = toRaw(item)
      })
      return labelMap
    },

    /** 获取枚举值常量 map */
    getReferenceConstantMap<T extends Reference.ReferenceKey>(referenceKey: T): Reference.ConstantKeyMap[T] {
      let constantMap = {}
      this.getReferenceItems(referenceKey).forEach(item => {
        constantMap[item.key!] = toRaw(item)
      })
      return constantMap as Reference.ConstantKeyMap[T]
    },

    /** 重置枚举值 */
    async refreshReference() {
      this.reference = await globalApi.getReference()

      this.reference = Object.assign(localReference, this.reference)
      console.log(this.reference, "console.log(this.reference);");
      /** 设置枚举颜色值 */

      const enableEnum = this.getReferenceConstantMap('enableStatusLocalEnum')
      enableEnum.DISABLE.color = 'red'
      enableEnum.ENABLE.color = 'green'

      // const auditStatusEnum = this.getReferenceConstantMap('auditStatusEnum')
      // auditStatusEnum.PASS.color = 'green'
      // auditStatusEnum.WAIT.color = 'orange'
      // auditStatusEnum.REJECT.color = 'red'

      // const orderInvoiceTypeEnum = this.getReferenceConstantMap('orderInvoiceTypeEnum')
      // orderInvoiceTypeEnum.ORDER_INVOICE_FINISH.color = 'green'
      // orderInvoiceTypeEnum.ORDER_INVOICE_FALLBACK.color = 'red'
      // orderInvoiceTypeEnum.ORDER_INVOICE_WAITING.color = 'orange'
      // orderInvoiceTypeEnum.ORDER_INVOICE_READY.color = 'orange'

      // const contractSignStatusEnum = this.getReferenceConstantMap('contractSignStatusEnum')
      // contractSignStatusEnum.DRAFT.color = 'red'
      // contractSignStatusEnum.SIGNED.color = 'green'
      // contractSignStatusEnum.SIGNING.color = 'orange'
      // contractSignStatusEnum.CANCEL.color = '#c1c1c1'

      // const backSystemLevelEnum = this.getReferenceConstantMap('backSystemLevelEnum')
      // backSystemLevelEnum.BLUE.color = '#5ca3ef'
      // backSystemLevelEnum.BLUE.bgColor = 'blue'
      // backSystemLevelEnum.RED.color = '#e717a'
      // backSystemLevelEnum.RED.bgColor = 'red'
      // backSystemLevelEnum.GREEN.color = '#74cf4e'
      // backSystemLevelEnum.GREEN.bgColor = 'green'
      // backSystemLevelEnum.YELLOW.color = '#d9b400'
      // backSystemLevelEnum.YELLOW.bgColor = 'yellow'

      // const backSystemStatusEnum = this.getReferenceConstantMap('backSystemStatusEnum')
      // backSystemStatusEnum.NOT_STARTED.color = '#c1c1c1'
      // backSystemStatusEnum.AUTHING.color = 'blue'
      // backSystemStatusEnum.DONE.color = 'green'
      // backSystemStatusEnum.DOING.color = 'orange'
      // backSystemStatusEnum.CANCEL.color = 'red'

      // const withdrawalTypeEnum = this.getReferenceConstantMap('withdrawalTypeEnum')
      // withdrawalTypeEnum.RECHARGE_GIFT.color = 'blue'
      // withdrawalTypeEnum.WECHAT_CASH.color = 'green'
      // // withdrawalTypeEnum.UNKNOWN.color = '#c1c1c1'


      // const withdrawalStatusEnum = this.getReferenceConstantMap('withdrawalStatusEnum')
      // withdrawalStatusEnum.ALL_WITHDRAWAL.color = 'green'
      // withdrawalStatusEnum.ALL_WITHDRAWAL.bgColor = 'green'
      // withdrawalStatusEnum.PART_WITHDRAWAL.color = 'blue'
      // withdrawalStatusEnum.PART_WITHDRAWAL.bgColor = 'blue'
      // withdrawalStatusEnum.WAIT_WITHDRAWAL.color = 'orange'
      // withdrawalStatusEnum.WAIT_WITHDRAWAL.bgColor = 'orange'
    },
  },
})
