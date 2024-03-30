<template>
  <div>
    <grid-table v-bind="bindGridTableAttr" ref="TableRef">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'status'">
          <a-switch
            :checked="text"
            :checked-value="1"
            :un-checked-value="0"
            @change="updateAccountStatus(record, $event)"
          />
        </template>
      </template>
    </grid-table>
  </div>
</template>
<script lang="tsx" setup>
import { adminApi, roleApi } from "@/api/system";
import { useAppStore } from "@/store";
import { useMessage } from "@/hooks/message";
import { pick, get } from "lodash-es";
const { getReferenceItems, getReferenceConstantMap } = useAppStore();

const TableRef = ref<IGridTable.Expose>();
const bindGridTableAttr = ref<IGridTable.Props>({
  title: "用户",
  // creatable: true,
  editable: true,
  deleteable: true,
  api: {
    getList: adminApi.getAdmins,
    // store: adminApi.addAdmin,
    del: adminApi.delAdmin,
    update: (id, params) => adminApi.updateAdmin({ id, ...params }),
  },
  columnSchemas: [
    {
      title: "用户名称",
      dataIndex: "userName",
    },
    {
      title: "昵称",
      dataIndex: "nickName",
    },
    {
      title: "电话",
      dataIndex: "mobile",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "账号状态",
      dataIndex: "status",
      // enumSchemas: getReferenceItems('enableStatusLocalEnum')
    },
    {
      title: "性别",
      dataIndex: "sex",
      enumSchemas: getReferenceItems("GenderTypeEnum"),
    },
    {
      title: "更新人",
      dataIndex: "updatedBy",
    },
    {
      title: "创建人",
      dataIndex: "createdBy",
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
    },
  ],
  searchSchemas: [
    {
      label: "用户名",
      field: "userName",
    } as IForm.Schema<"Input">,
  ],
  formSchemas: [
    {
      label: "用户名",
      field: "userName",
      required: true,
    } as IForm.Schema<"Input">,
    // {
    //   label: '密码',
    //   field: 'password',
    //   required: true,
    //   component: 'InputPassword',
    // } as IForm.Schema<'InputPassword'>,
    // {
    //   label: '确认密码',
    //   field: 'confirmPassword',
    //   required: true,
    //   component: 'InputPassword',
    // } as IForm.Schema<'InputPassword'>,
    {
      label: "昵称",
      field: "nickName",
    } as IForm.Schema<"Input">,
    {
      label: "角色名称",
      field: "roleId",
      component: "CustomApiSelect",
      required: true,
      componentProps: {
        immediate: true,
        api: roleApi.getRoleList,
        valueField: "id",
        labelField: "roleName",
      },
    } as IForm.Schema<"CustomApiSelect">,
    {
      label: "邮箱",
      field: "email",
      component: "Input",
    } as IForm.Schema<"Input">,
    {
      label: "性别",
      field: "sex",
      component: "ReferenceSelect",
      componentProps: {
        referenceKey: "GenderTypeEnum",
      },
    } as IForm.Schema<"ReferenceSelect">,
    {
      label: "头像",
      field: "avatar",
      component: "Upload",
      componentProps: {
        acceptType: "img",
        maxNum: 1,
      },
    } as IForm.Schema<"Upload">,
    {
      label: "手机号",
      field: "mobile",
      span: 24,
      component: "InputMobile",
      componentProps: {
        allowClear: false,
      },
    } as IForm.Schema<"InputMobile">,
  ],
});

/* 更新用户状态 */
async function updateAccountStatus(record, status) {
  await adminApi.updateStatus({ ...pick(record, "id"), status });
  if (TableRef.value) {
    TableRef.value?.reload();
    useMessage.success("更新成功");
  } else {
    useMessage.error("获取表格组件实例失败");
  }
}
</script>
