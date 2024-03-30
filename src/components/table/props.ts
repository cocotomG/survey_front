import { PropType } from 'vue'
import { DraftType } from '../../hooks/draft-box'

export const gridTableProps = {

  /** 标题 */
  title: String,

  /** 增、删、改、查 */
  api: [Function, Object] as PropType<IGridTable.Api>,

  /** 列表请求额外参数 */
  getListApiParams: Object,

  /** 列表搜索配置项 */
  searchSchemas: Array as PropType<IForm.Schema[]>,

  /** 增、改 配置项 */
  formSchemas: Array as PropType<
    (IForm.Schema & {

      /** 仅在编辑时显示 */
      onlyEdit?: boolean;

      /** 仅在创建时显示 */
      onlyCreate?: boolean;
    })[]
  >,

  /** 列渲染配置项 */
  columnSchemas: {
    type: Array as PropType<IGridTable.ColumnProps[]>,
    required: true,
  },

  /** 表格操作 */
  tableActions: Array as PropType<IGridTable.Action[]>,

  /** 表格行操作 */
  rowActions: Array as PropType<IGridTable.RowAction[]>,

  /** 表格行操作宽度 */
  rowActionsWidth: Number as PropType<number>,

  immediate: {
    type: Boolean,
    default: true,
  },

  /** 数据是否可拖拽 */
  draggable: Boolean,

  /** 是否展示行序号 */
  indexable: Boolean,

  /** 是否可以选择行 */
  selectable: Boolean,

  /** 是否可导出 */
  exportable: Boolean,

  actionable: Boolean as PropType<boolean>, //
  /** 导出数据表格处理函数 */
  exportHandler: Function as PropType<(params:{
    tableHeader:string[],
    tableData:(string | number)[][],
    apiData:any[],
    filename:string,
  }) => Promise<void>>,

  /** 是否启用草稿功能 */
  draftable: String as PropType<DraftType>,

  /** 是否可以创建新数据 */
  creatable: {
    type: [Boolean, Function] as PropType<boolean | Fn>,
    default: () => false,
  },

  /** 创建新数据成功后的回调 */
  createdCallback: Function,

  /** 创建文字 */
  createText: String,

  /** 是否可以更新数据 */
  editable: {
    type: [Boolean, Function] as PropType<boolean | Fn>,
    default: () => false,
  },

  /** 数据编辑成功后的回调 */
  editedCallback: Function,

  /** 是否可以删除数据 */
  deleteable: {
    type: [Boolean, Function] as PropType<boolean | Fn>,
    default: () => false,
  },

  /** 数据删除成功后的回调 */
  deletedCallback: Function,

  modalWidth: Number as PropType<number>, //

  /** 是否表单表格 */
  isFormTable: {
    type: Boolean,
    default: false,
  },

  onEditDataSave: {
    type: Function as PropType<Fn<Recordable>>,
    default: () => false,
  },

  /** 显示表格头部 */
  showTableHeader: {
    type: Boolean,
    default: true,
  },

  /** 显示表格工具栏 */
  showTools: {
    type: Boolean,
    default: true,
  },

  /** 表格多选禁止状态 */
  getCheckboxProps: {
    type: Function,
  },

  /** 弹出窗关闭时是否删除子元素 */
  modalDestroyOnClose: {
    type: Boolean,
    default: false
  },

}
