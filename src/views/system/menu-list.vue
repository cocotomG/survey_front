<template>
  <div>
    <grid-table v-bind="bindGridTableAttr" />
  </div>
</template>
<script lang="tsx" setup>
import { menuApi } from '@/api/system'


const bindGridTableAttr = ref<IGridTable.Props>({
  title: '菜单',
  creatable: true,
  editable: true,
  deleteable: true,
  api: {
    getList: menuApi.getMenuList,
    store: menuApi.addMenu,
    del: menuApi.removeMenu,
    update: menuApi.updateMenu
  },
  columnSchemas: [
    {
      title: '菜单名称',
      dataIndex: 'menuName'
    },
    {
      title: '权限名称',
      dataIndex: 'perms'
    },
    {
      title: '备注',
      dataIndex: 'remark'
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
      label: '菜单名称',
      field: 'menuName',
      component: 'Input'
    } as IForm.Schema<'Input'>
    // {
    //   label: '套餐名称',
    //   field: 'name',
    //   component: 'Input'
    // } as IForm.Schema<'Input'>,
    // {
    //   label: '修改时间',
    //   field: 'updatedAt',
    //   componentProps: {
    //     valueFormat: 'YYYY-MM-DD'
    //   },
    //   component: 'DateRangePicker'
    // } as IForm.Schema<'DateRangePicker'>
  ],
  formSchemas: [
    {
      label: '菜单名称',
      field: 'menuName',
      required: true,
    },
    {
      label: '菜单名称',
      field: 'perms',
      required: true,
    },
    {
      label: '菜单名称',
      field: 'remark',
      required: true,
    },
    //     {
    //       label: '封面图片',
    //       field: 'coverUrl',
    //       component: 'Upload',
    //       required: true,
    //       componentProps: {
    //         acceptType: 'img',
    //         maxNum: 1,
    //       }
    //     } as IForm.Schema<'Upload'>,
    //     {
    //       label: '跳转微信公众号链接',
    //       field: 'jumpUrl',
    //       required: true,
    //     },
    //     {
    //       label: '排序',
    //       field: 'orderby',
    //       required: true,
    //       component: 'InputNumber',
    //       componentProps: {
    //         placeholder: '请输入排序（越小越靠前)'
    //       }
    //     } as IForm.Schema<'InputNumber'>,
    //     {
    //       label: '内容',
    //       field: 'content',
    //       component: 'InputTextArea',
    //       required: true,
    //     } as IForm.Schema<'InputTextArea'>,
    //     {
    //       label: '描述',
    //       field: 'description',
    //       component: 'InputTextArea',
    //     } as IForm.Schema<'InputTextArea'>,
  ]
})
</script>