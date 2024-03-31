<template>
  <div>
    <grid-table v-bind="bindGridTableAttr" ref="TableRef">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'status'">
          <a-switch :checked="text" :checked-value="1" :un-checked-value="0"
            @change="updateRoleStatus(record, $event)" />
        </template>
      </template>
    </grid-table>
  </div>
</template>
<script lang="tsx" setup>
import { menuApi, roleApi } from '@/api/system'
import { useAppStore } from '@/store'
import { useMessage } from '@/hooks/message'
import { omit } from 'lodash-es'
const { getReferenceItems, getReferenceConstantMap } = useAppStore()

const TableRef = ref<IGridTable.Expose>()
const bindGridTableAttr = ref<IGridTable.Props>({
  title: '用户',
  // creatable: true,
  editable: true,
  deleteable: true,
  api: {
    getList: roleApi.getRoleList,
    // store: adminApi.addAdmin,
    // del: roleApi.delAdmin,
    update: (id, params) => roleApi.updateRole({ ...params, id })
  },
  columnSchemas: [
    {
      title: '用户名称',
      dataIndex: 'roleName'
    },
    {
      title: '角色标识',
      dataIndex: 'roleKey'
    },
    {
      title: '角色状态',
      dataIndex: 'status'
    },
    {
      title: '更新人',
      dataIndex: 'updatedBy'
    },
    {
      title: '创建人',
      dataIndex: 'createdBy'
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt'
    }
  ],
  searchSchemas: [
    {
      label: '角色名称',
      field: 'roleName',
    } as IForm.Schema<'Input'>,
  ],
  formSchemas: [
    {
      label: '角色名称',
      field: 'roleName',
      required: true,
    } as IForm.Schema<'Input'>,
    {
      label: '角色标识',
      field: 'roleKey',
    } as IForm.Schema<'Input'>,
    {
      label: '角色状态',
      field: 'status',
      component: 'ReferenceSelect',
      componentProps: {
        referenceKey: 'enableStatusLocalEnum'
      }
    } as IForm.Schema<'ReferenceSelect'>,
    {
      label: '角色权限',
      field: 'permissions',
      component: 'CustomApiSelect',
      componentProps: {
        immediate: true,
        api: menuApi.getMenuList,
        valueField: "id",
        labelField: "menuName",
        mode: 'multiple'
      }
    } as IForm.Schema<'CustomApiSelect'>,
  ]
})

/* 更新角色状态 */
async function updateRoleStatus(record, status) {
  await roleApi.updateRole({ ...omit(record, ['status', 'updatedAt', 'updatedBy']), status })
  if (TableRef.value) {
    TableRef.value?.reload()
    useMessage.success('更新成功')
  } else {
    useMessage.error('获取表格组件实例失败')
  }
}
</script>