<template>
  <a-table
    v-bind="$attrs"
    ref="tableBodyRef"
    sticky
  >
    <template
      v-for="slot in Object.keys(slots)"
      #[slot]="data"
    >
      <slot
        :name="slot"
        v-bind="data || {}"
      />
    </template>
    <template
      v-if="$attrs.isFormTable"
      #bodyCell="{ column, text, record, index}"
    >
      <!-- 编辑项 -->
      <template v-if="isEditableColumn(editableColumns, column.dataIndex) && editingData[record.id]">
        <component
          :is="componentTypeMap[column.component]"
          v-model:value="editingData[record.id][getColumnDataIndexStr(column.dataIndex)]"
          v-bind="column.componentProps"
          @change="editErrorTips[record.id][getColumnDataIndexStr(column.dataIndex)] = ''"
        />
        <div class="text-red-500 ">
          {{ editErrorTips[record.id][getColumnDataIndexStr(column.dataIndex)] }}
        </div>
      </template>
      <!-- 操作栏 -->
      <template v-else-if="column.dataIndex === 'action'">
        <div class="editable-row-operations">
          <span v-if="editingData[record.id]">
            <a-typography-link
              class="mr-2"
              @click="save(record.id)"
            >保存</a-typography-link>

            <a-typography-link @click="cancel(record.id)">取消</a-typography-link>

            <!-- <a-popconfirm title="确认取消吗?" @confirm="cancel(record.id)">
              <a>取消</a>
            </a-popconfirm> -->
          </span>
          <span v-else>
            <a @click="edit(record.id)">编辑</a>
          </span>

          <!-- 其他外部配置的表格操作 -->
          <component :is="column.customRender({ index })" />
        </div>
      </template>

      <!-- 适配 customRender 函数 -->
      <template v-else-if="column.customRender">
        <template v-if="!isObject(column.customRender({ column, text, record }))">
          {{ column.customRender({ column, text, record }) }}
        </template>
        <component
          :is="column.customRender({ column, text, record })"
          v-else
        />
      </template>

      <!-- 其他只读数据 -->
      <template v-else>
        {{ text }}
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { isArray, isObject } from 'lodash-es'
import { parseDotStrObjToObj, transformObjToDotStrObj } from '@/utils/object'
import { componentTypeMap } from '@/components/form/components/component-type-map'

interface EditErrorTips {
  [id: number]: {
    [key:string]: any
  }
}

interface EditingData {
  [id: number]:Recordable
}

interface Attr {
  dataSource: any[]
  columnSchemas: IGridTable.ColumnProps[],
  onEditDataSave: Fn<Recordable[], Promise<any>>
}

const slots = useSlots()
const attr = useAttrs() as unknown as Attr

// 数据扁平化处理
const tableBodyRef = ref<ComponentRef>()
const editErrorTips = reactive<EditErrorTips>({})
const editingData = reactive<EditingData>({})
const editableColumns = computed(() => attr.columnSchemas?.filter(columnSchema => !!columnSchema.component) || [])

function getColumnDataIndexStr(dataIndex:readonly (string | number)[] | string | number):string {
  return (isArray(dataIndex) ? dataIndex.join('.') : dataIndex).toString()
}

function isEditableColumn(editableColumns:IGridTable.ColumnProps[], dataIndex:string[] | string | undefined) {
  if (dataIndex === undefined) {
    return false
  }
  return editableColumns.map(item => item.dataIndex).includes(getColumnDataIndexStr(dataIndex))
}

const edit = (ids: number | number[]) => {
  ids = isArray(ids) ? ids : [ids]
  ids.forEach(id => {
    editErrorTips[id] = {}
    editingData[id] = transformObjToDotStrObj(attr.dataSource.find(item => id === item.id))
  })
}

function getColumnRules(column:IGridTable.ColumnProps): IGridTable.ColumnRule[] {
  const rules = column.rules || []
  if (column.required) {
    rules.push({
      validator: (value: string) => {
        if (!value.toString().trim()) {
          return Promise.reject(new Error(`${column.title}不能为空`))
        }
        return Promise.resolve()
      },
    })
  }
  return rules
}

const validate = async (ids: number | number[], dataIndex: string | string[]) => {
  ids = isArray(ids) ? ids : [ids]
  let validatePass = true
  let lastErrorTips = ''
  const dataIndexes = isArray(dataIndex) ? dataIndex : [dataIndex]
  // 一个 id 代表一行数据项，即一个对象结构。下面的 for 用于遍历需要检验的多个数据对象
  for (let idIndex = 0; idIndex < ids.length; idIndex++) {
    const id = ids[idIndex]
    // 遍历数据项中的每一个表单属性
    for (let index = 0; index < dataIndexes.length; index++) {
      const dataIndexStr = dataIndexes[index]
      const columnSchema = attr.columnSchemas.find(columnSchema => getColumnDataIndexStr(columnSchema.dataIndex!) === dataIndexStr)!
      const itemValue = editingData[id][dataIndexStr]
      const columnRules = getColumnRules(columnSchema)

      // 遍历该表单属性中的每一个规则校验项
      for (let ruleIndex = 0; ruleIndex < columnRules.length; ruleIndex++) {
        const rule = columnRules[ruleIndex]
        const validatorFun = rule.validator
        // eslint-disable-next-line max-depth
        try {
          await validatorFun(itemValue)
        } catch (error) {
          console.log('rule error', error)
          lastErrorTips = editErrorTips[id][dataIndexStr] = (error as Error).message
          validatePass = false
        }
      }
    }
  }
  if (!validatePass) {
    throw new Error(lastErrorTips)
  }
}

const save = async (ids: number | number[]) => {
  ids = isArray(ids) ? ids : [ids]

  const checkDataIndexes:string[] = []
  for (let index = 0; index < editableColumns.value.length; index++) {
    const editableColumn = editableColumns.value[index]
    checkDataIndexes.push(getColumnDataIndexStr(editableColumn.dataIndex!))
  }
  await validate(ids, checkDataIndexes)

  // 保存成功，删除编辑数据
  ids.forEach(id => {
    Object.assign(attr.dataSource.find(item => id === item.id), parseDotStrObjToObj(editingData[id]))
    delete editingData[id]
    delete editErrorTips[id]
  })

  // 调用接口保存
  await attr.onEditDataSave!(...attr.dataSource.filter(item => (ids as number[]).includes(item.id)))
}

const cancel = (ids: number | number[]) => {
  ids = isArray(ids) ? ids : [ids]
  ids.forEach(id => {
    delete editingData[id]
    delete editErrorTips[id]
  })
}


const editAllEditData = () => {
  edit(attr.dataSource.map(dataItem => dataItem.id))
}

const cancelAllEditData = () => {
  cancel(Object.keys(editingData).map(id => Number(id)))
}

const saveAllEditData = async () => {
  await save(Object.keys(editingData).map(id => Number(id)))
}

const exposeData:IGridTable.TableBodyExpose = {
  tableBodyRef,
  editingData,
  saveAllEditData,
  editAllEditData,
  cancelAllEditData,
}
defineExpose(exposeData)
</script>
