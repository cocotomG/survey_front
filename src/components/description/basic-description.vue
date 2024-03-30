<style>
/* tsx模板，存在antd css失效问题 */
.ant-descriptions-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.ant-descriptions-title {
  overflow: hidden;
  font-size: 16px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgb(0 0 0 / 85%);
  flex: auto;
  line-height: 1.5715;
}

.ant-descriptions-extra {
  margin-left: auto;
  font-size: 14px;
  color: rgb(0 0 0 / 85%);
}

.ant-descriptions-view {
  border-radius: 2px;
  width: 100%;
}

.ant-descriptions-view table {
  width: 100%;
  table-layout: fixed;
}

.ant-descriptions-row > th,
.ant-descriptions-row > td {
  padding-bottom: 0;
}

.ant-descriptions-row:last-child {
  border-bottom: none;
}

.ant-descriptions-item-label {
  font-size: 14px;
  font-weight: normal;
  text-align: start;
  color: rgb(0 0 0 / 85%);
  line-height: 1.5715;
}

.ant-descriptions-item-label::after {
  content: ":";
  position: relative;
  top: -0.5px;
  margin: 0 8px 0 2px;
}

.ant-descriptions-item-label.ant-descriptions-item-no-colon::after {
  content: " ";
}

.ant-descriptions-item-no-label::after {
  margin: 0;
  content: "";
}

.ant-descriptions-item-content {
  display: table-cell;
  font-size: 14px;
  color: rgb(0 0 0 / 85%);
  flex: 1;
  line-height: 1.5715;
  word-break: break-word;
  overflow-wrap: break-word;
}

.ant-descriptions-item {
  padding-bottom: 0;
  vertical-align: top;
}

.ant-descriptions-item-container {
  display: flex;
}

.ant-descriptions-item-container .ant-descriptions-item-label,
.ant-descriptions-item-container .ant-descriptions-item-content {
  display: inline-flex;
  align-items: baseline;
}

.ant-descriptions-middle .ant-descriptions-row > th,
.ant-descriptions-middle .ant-descriptions-row > td {
  padding-bottom: 0;
}

.ant-descriptions-small .ant-descriptions-row > th,
.ant-descriptions-small .ant-descriptions-row > td {
  padding-bottom: 0;
}

.ant-descriptions-bordered .ant-descriptions-view {
  border: 1px solid #F0F0F0;
}

.ant-descriptions-bordered .ant-descriptions-view > table {
  table-layout: auto;
  border-collapse: collapse;
}

.ant-descriptions-bordered .ant-descriptions-item-label,
.ant-descriptions-bordered .ant-descriptions-item-content {
  border-right: 1px solid #F0F0F0;
  padding: 16px 24px;
}

.ant-descriptions-bordered .ant-descriptions-item-label:last-child,
.ant-descriptions-bordered .ant-descriptions-item-content:last-child {
  border-right: none;
}

.ant-descriptions-bordered .ant-descriptions-item-label {
  background-color: #FAFAFA;
}

.ant-descriptions-bordered .ant-descriptions-item-label::after {
  display: none;
}

.ant-descriptions-bordered .ant-descriptions-row {
  border-bottom: 1px solid #F0F0F0;
}

.ant-descriptions-bordered .ant-descriptions-row:last-child {
  border-bottom: none;
}

.ant-descriptions-bordered.ant-descriptions-middle .ant-descriptions-item-label,
.ant-descriptions-bordered.ant-descriptions-middle .ant-descriptions-item-content {
  padding: 12px 24px;
}

.ant-descriptions-bordered.ant-descriptions-small .ant-descriptions-item-label,
.ant-descriptions-bordered.ant-descriptions-small .ant-descriptions-item-content {
  padding: 8px 16px;
}

.ant-descriptions-rtl {
  direction: rtl;
}

.ant-descriptions-rtl .ant-descriptions-item-label::after {
  margin: 0 2px 0 8px;
}

.ant-descriptions-rtl.ant-descriptions-bordered .ant-descriptions-item-label,
.ant-descriptions-rtl.ant-descriptions-bordered .ant-descriptions-item-content {
  border-right: none;
  border-left: 1px solid #F0F0F0;
}

.ant-descriptions-rtl.ant-descriptions-bordered .ant-descriptions-item-label:last-child,
.ant-descriptions-rtl.ant-descriptions-bordered .ant-descriptions-item-content:last-child {
  border-left: none;
}

.basic-description-container .ant-image-img {
  height: 100%;
  width: 100%;
}

.basic-description-container .ant-image {
  margin-right: 4px;
}
</style>
<script lang="tsx">
import { Descriptions, DescriptionsItem } from 'ant-design-vue/es'
import { get } from 'lodash-es'
import { basicDescriptionProps, DescItem } from './props'


export default defineComponent({
  props: basicDescriptionProps,
  setup(props, context) {
    // const { schemas, model, paddingBottom } = props
    const { attrs } = context
    let getItems: DescItem[] = []

    // 行距
    let rowPaddingBottom = props.paddingBottom ?? getPaddingBottom(attrs?.size)
    // 列数 antd 默认列数3
    const column: number = attrs?.column as number ?? 3

    function getValue(schema: IGridTable.ColumnProps) {
      if (!props.model) {
        return ''
      }
      const { customRender, enumSchemas } = schema
      let value = get(props.model, schema.dataIndex!)
      if (customRender) {
        value = customRender({
          text: value,
          record: props.model
        } as any)
      } else if (enumSchemas) {
        value = enumSchemas.find(s => s.value == value)?.label
      }
      return value || (!props.zeroToLine && value === 0) ? value : '--'
    }

    function getPaddingBottom(size): number {
      if (size === 'middle') {
        return 16
      } else if (size === 'small') {
        return 8
      } else {
        return 12
      }
    }


    return () => {
      getItems = props.schemas?.map(c => ({
        label: c.title as string,
        value: getValue(c),
      })) ?? []
      // let rowBottom = 0
      // console.log(getItems.length, column, getItems.length % column !== 0, 'getItems.length > column && getItems.length % column !== 0')
      // if (getItems.length > column && getItems.length % column !== 0) {
      //   let mo = getItems.length % column
      //   console.log(getItems[getItems.length - mo])
      // }
      // getItems?.forEach((item, index) => {
      //   console.log(index !== 0 && (index + 1) <= getItems!.length - column ? rowPaddingBottom : 0, 'index !== 0 && (index + 1) <= getItems!.length - column ? rowPaddingBottom : 0')
      // })
      // console.log()
      return (
        <Descriptions class="basic-description-container">
          {getItems?.map((item, index) => {
            let rowBottom = 0
            if (getItems.length > column && getItems.length % column !== 0) {
              let mo = getItems.length % column
              if (index < getItems.length - mo) {
                rowBottom = rowPaddingBottom
              }
            } else if (column === 1 && index !== getItems.length - 1) {
              rowBottom = rowPaddingBottom
            }
            return (
              <DescriptionsItem style={({ paddingBottom: `${rowBottom}px` })} key={item.label} labelStyle={({
                color: '#6b7280',
              })} label={item.label}>{item.value}
              </DescriptionsItem>)
          })}
        </Descriptions>
      )
    }
  }
})


</script>
