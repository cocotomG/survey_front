<template>
  <a-card>
    <div class="flex justify-between">
      <div class="g-title">
        菜单列表
      </div>
      <a-button
        type="primary"
        @click="visible = true"
      >
        新增
      </a-button>
    </div>
    <a-table
      v-if="dataSource.length"
      v-bind="bindTableAttrs"
      ref="tableRef"
    >
      <template #bodyCell="{ column, text, record }">
        <div
          v-if="column.dataIndex === 'rowActions'"
          class="flex"
        >
          <a-button
            type="text"
            class="text-primaryColor-default"
            @click="editRow(record)"
          >
            编辑
          </a-button>
          <a-button
            type="text"
            class="text-primaryColor-default"
            @click="setPermission(record)"
          >
            分配
          </a-button>
          <a-popconfirm
            title="确定删除吗"
            @confirm="deleteRow(record)"
          >
            <a-button
              type="text"
              class="text-primaryColor-default"
            >
              删除
            </a-button>
          </a-popconfirm>
        </div>
      </template>
    </a-table>
    <basic-modal
      v-bind="bindModalAttrs"
      v-model:visible="visible"
    >
      <basic-form
        v-bind="bindModalFormAttrs"
        ref="modalBasicFormRef"
      />
    </basic-modal>
  </a-card>
</template>
<script lang="tsx" setup>
import { menuApi, permissionApi } from '@/api/system'
import { BasicModalProps } from '@/components/modal/prop'
import globalModelForm from '@/hooks/global-model-form'
import { useMessage } from '@/hooks/message'
import { TableProps } from 'ant-design-vue/es'
const dataSource = ref<Recordable[]>([])
const visible = ref<boolean>(false)
const tableRef = ref()
const bindTableAttrs = computed((): TableProps => ({
  defaultExpandAllRows: true,
  columns: [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '路由',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '排序',
      dataIndex: 'orderby',
      key: 'orderby'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '操作',
      dataIndex: 'rowActions',
      width: 160,
      align: 'center'
    }
  ],
  dataSource: dataSource.value,
  pagination: false
}))
const menuTreeOptions = ref<Recordable[]>([])

async function getMenuList() {
  let result = await menuApi.getMenuList()

  function deep(arr) {
    return arr.map(item => {
      item.key = item.id
      item.value = item.id
      item.title = item.name
      if (item?.children) {
        deep(item?.children)
      }
      if (item?.children?.length === 0) {
        delete item?.children
      }
      return item
    })
  }
  // dataSource.value = result
  let arr = deep(result)

  dataSource.value = arr

  // 树形选择器 跟菜单
  menuTreeOptions.value = [
    {
      title: '根菜单',
      value: 0,
      key: 0,
      children: arr
    }
  ]
}
getMenuList()

const modalBasicFormRef = ref<IForm.Expose>()
const bindModalAttrs = computed((): BasicModalProps => ({
  title: '菜单',
  width: 800,
  okText: '确定',
  destroyOnClose: true,
  onOk: async () => {
    await modalBasicFormRef.value?.validate()
    await menuApi.addMenu(modalBasicFormRef.value?.formModel)
    visible.value = false
    useMessage.success(modalBasicFormRef.value?.formModel.id ? '修改成功' : '新增成功')
    await getMenuList()
  },
}))

const bindModalFormAttrs = computed((): IForm.Props => ({
  layout: 'vertical',
  baseItemCol: { span: 24 },
  actionable: false,
  schemas: [
    {
      label: '名称',
      field: 'name',
      required: true,
    },
    {
      label: '路由',
      field: 'path',
      required: true,
    },
    {
      label: '排序',
      field: 'orderby',
      required: true,
      component: 'InputNumber',
      defaultValue: 0,
    } as IForm.Schema<'InputNumber'>,
    {
      label: '上级菜单',
      field: 'pid', // 记录当前id
      component: 'TreeSelect',
      required: true,
      componentProps: {
        treeDefaultExpandAll: true,
        treeData: unref(menuTreeOptions),
      }
    } as IForm.Schema<'TreeSelect'>,
  ],
}))

function editRow(record) {
  visible.value = true
  nextTick(() => {
    modalBasicFormRef.value?.setFormModel(record)
  })
}
async function deleteRow(record) {
  console.log(record)

  await menuApi.removeMenu(record.id)
  useMessage.success('删除成功')
  await getMenuList()
}

function setPermission(record) {
  globalModelForm.init({
    title: record.name,
    model: record,
    schemas: [
    // {
    //   label: '角色名称',
    //   field: 'roleId',
    //   component: 'CustomApiSelect',
    //   componentProps: {
    //     immediate: true,
    //     api: roleApi.getRoleList,
    //     valueField: 'id',
    //     labelField: 'text'
    //   }
    // } as IForm.Schema<'CustomApiSelect'>,
      {
        label: '权限',
        component: 'TreeApiSelect',
        field: 'menuList',
        required: true,
        componentProps: {
          api: permissionApi.getPermissionList,
          fieldNames: {
            key: 'id',
            title: 'text'
          },
          checkStrictly: false,
          valueToString: true,
        }
      } as IForm.Schema<'TreeApiSelect'>
    ],
    successCallback: async v => {
      await permissionApi.setPermission({
        id: record.id,
        ...v
      })
      console.log(v)

      await getMenuList()
    },
  })

}
</script>