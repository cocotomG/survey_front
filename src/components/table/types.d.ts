import { ButtonProps } from 'ant-design-vue/es/button'
import { PaginationProps } from 'ant-design-vue/es/pagination'
import { ColumnType, TableProps } from 'ant-design-vue/es/table'
import { ExtractPropTypes, ComputedRef, Ref } from 'vue'
import type { ComponentType, ComponentProp } from '@/components/form/components/component-type-map'
import { gridTableProps } from './props'

declare global {
  namespace IGridTable {
    type Props = Partial<ExtractPropTypes<typeof gridTableProps>> &
      Omit<TableProps, 'title'>

    type Api =
      | Fn
      | {
          getList?: Fn; // 获取列表接口
          getDetail?: Fn; // 未实现功能
          store?: Fn; // 新增数据接口
          update?: (id: number | string, data: Recordable) => Promise<any>; // 更新数据接口
          del?: (id: number | string) => Promise<any>; //  删除数据接口
        }
    interface Action extends Partial<ButtonProps> {
      label: string; // 标签名
      click: (ids?: number[], rows?: Recordable[]) => any; // 单击回调，支持promise
      needSelection?: boolean; // 是否需求开启多选
      needReload?: boolean; // 是否操作后刷新数据
      confirm?: string; // 是否开票确认选框
      isShow?: boolean | ((record)=> any) ; // 是否渲染
      requiredPermission?: Permission; //
    }

    interface RowAction extends Omit<Action, 'click'> {
      click: (record: Recordable) => Promise<any> | void; // 单击回调，支持promise
    }

    interface ColumnRule { validator: Fn<any, Promise<any>>}
    interface ColumnProps extends ColumnType {
      exportRender?: Fn; // 表格导出格式化方法，使用 enumSchemas 的不能自动收集，使用 customRender 的会自动收集
      defaultHidden?: boolean; // 列初始隐藏
      thumbAble?: boolean; // 显示缩略图
      enumSchemas?: Reference.ReferenceItem[]; // 显示枚举类型
      flag?: 'index' | 'action' | 'drag'; // 列类型
      referenceKey?: Reference.ReferenceKey; // 枚举类型键名
      // table-form 相关配置
      required?: boolean, // 输入项是否必填
      rules?: ColumnRule[],
      component?: ComponentType,
      componentProps?: ComponentProp<ComponentType>,
    }

    interface GetColumnParam {
      ignoreDrag?: boolean;
      ignoreHidden?: boolean;
      ignoreIndex?: boolean;
      ignoreAction?: boolean;
    }
    interface FetchParam {
      searchParam?: Recordable;
      page?: number;
    }

    interface TableBodyExpose {
      tableBodyRef: Ref<ComponentRef>,
      editingData: Recordable,
      saveAllEditData: Fn,
      editAllEditData: Fn,
      cancelAllEditData: Fn,
    }

    type Expose = {
      wrapLlRef: Ref<HTMLDivElement>;
      setProps: Fn<Partial<Props>>;
      getProps: Fn<any, ComputedRef<Props>>;
      reload: Fn; // 重新加载
      setLoading: Fn<boolean>;
      getColumns: Fn<GetColumnParam>;
      setColumns: Fn;
      getDataSource: Fn;
      getTotal: Fn;
      getSearchParams: Fn;
      setPagination: Fn<Partial<PaginationProps> | boolean>;
      resetSelection: Fn;
      getSelectionKeys: Fn;
      getSelectionRows: Fn;
      setSelectedKeys: Fn;
      setSelectedRows: Fn;
    } & TableBodyExpose
  }
}
