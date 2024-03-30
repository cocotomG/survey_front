import { useMessage } from '@/hooks/message'
import { isFunction } from 'lodash-es'
import { ComputedRef, unref } from 'vue'
import globalModelForm from '@/hooks/global-model-form'
import { transformObjToDotStrObj } from '@/utils/object'

export function useAction(propsRef: ComputedRef<IGridTable.Props>, reload: Fn) {
  function handleCreate() {
    const { api, title, modalWidth, formSchemas, draftable, createdCallback, modalDestroyOnClose } = unref(propsRef)
    if (!api || isFunction(api)) {
      useMessage.error('接口错误！')
      return
    }
    globalModelForm.init({
      title: title ? `新增${title}` : '快捷新增',
      api: async params => {
        await api.store!(params)
        return '新增成功！'
      },
      modalProp: {
        destroyOnClose: modalDestroyOnClose,
      },
      schemas: formSchemas?.filter(schema => !schema.onlyEdit) || [],
      successCallback: () => {
        reload()
        isFunction(createdCallback) && createdCallback()
      },
      ...(draftable ? { draftable } : {}),
      ...(modalWidth ? { width: modalWidth } : {}),
    })
  }

  function handleEdit(record: Recordable) {

    const { api, title, modalWidth, formSchemas, draftable, editedCallback, modalDestroyOnClose } = unref(propsRef)
    if (!api || isFunction(api)) {
      useMessage.error('接口错误！')
      return
    }
    globalModelForm.init({
      title: title ? `修改${title}` : '快捷修改',
      api: async params => {
        await api.update!(record.id, params)
        return '修改成功！'
      },
      modalProp: {
        destroyOnClose: modalDestroyOnClose,
      },
      schemas: formSchemas?.filter(schema => !schema.onlyCreate) || [],
      model: transformObjToDotStrObj(record),
      successCallback: () => {
        reload()
        isFunction(editedCallback) && editedCallback()
      },
      ...(draftable ? { draftable } : {}),
      ...(modalWidth ? { width: modalWidth } : {}),
    })
  }

  async function handleDel(record: Recordable) {
    const { api, rowKey = 'id', deletedCallback } = unref(propsRef)

    try {
      if (isFunction(api)) {
        return
      }
      await api?.del!(record[rowKey! as string])
      reload()
      isFunction(deletedCallback) && deletedCallback()
      useMessage.success('删除成功！')
    } catch (err) {
      console.log(err)
    }
  }

  return {
    handleCreate,
    handleEdit,
    handleDel,
  }
}
