import { FormProps } from 'ant-design-vue/es'
import { NamePath } from 'ant-design-vue/es/form/interface'
import { ExtractPropTypes, VNode } from 'vue'
import { basicFormProps } from './props'

import type { ComponentType, ComponentProp } from './components/component-type-map'

declare global {
  namespace IModalForm {
    type Expose = {
      formRef: IForm.Expose
    }
  }

  namespace IForm {
    type Props = Partial<ExtractPropTypes<typeof basicFormProps>> & FormProps

    /** api 接口调用的下拉框 */
    interface CustomApiSelectProps {

      /** 接口调用的 api */
      api: Fn<Nullable, Promise<any>>,

      /** 调用接口时传递的参数 */
      apiParams?: Recordable,

      /** 取值的key */
      valueField?: string | Fn,

      /** 显示用的数据key */
      labelField?: string | Fn,

      /** 是否马上调用接口 */
      immediate?: boolean

      /** 是否多选 */
      mode?: 'multiple',

      /** 是否显示个数？ */
      showCount?: boolean,

      [K: string]: any,
    }

    /** 选择器参数 */
    interface CommonProps {

      /** 是否禁用，只读 */
      disabled: boolean

      [K: string]: any,
    }

    interface SelectProps {

      /** 使用的枚举类型 */
      referenceKey: Reference.ReferenceKey

      [K: string]: any,
    }

    type Schema<T extends ComponentType = ComponentType> = {

      /** 字段名，唯一绑定了该组件的属性配置，包括 value 等。 */
      field: string;

      /** 该 form 表格项的 label 文案提示 */
      label?: string;

      /** 使用那个组件填充该表单项 */
      component?: T;

      /** 自定义组件，在具体页面中注入 */
      customComponent?: ReturnType<typeof defineComponent>;

      /** 使用的组件的属性配置 */
      // componentProps?: Recordable | CommonProps | CustomApiSelectProps | CommonApiSelectProps | SelectProps | Fn<RenderCallbackParams, Recordable>;
      componentProps?: ComponentProp<T> | Fn<RenderCallbackParams, Recordable>;

      /** 默认值，可以设置的值，也可以是处理函数 */
      defaultValue?: any;

      /** 当前项所占宽度，一行总额为 24 份 */
      span?: number;

      /** 该 form 表单项是否可折叠，主要针对 table 顶部的搜索栏 */
      collapsible?: boolean;

      /** 该字段必选 */
      required?: boolean | Fn<RenderCallbackParams, boolean>;

      /** 是否显示，默认为显示 */
      isShow?: boolean | Fn<RenderCallbackParams, boolean>;
      renderComponentContent?: string | VNode | Fn<RenderCallbackParams, string | VNode>;

      /** 表单验证规则 */
      rules?: Recordable[];
      zeroToUndefined?: boolean;
      helpMessage?: string;
    }

    interface RenderCallbackParams {
      schema: Schema;
      values: Recordable;
      field: string;
      actions?: Expose;
    }

    type Expose = {
      submit: Fn;
      setFormModel: Fn;
      formModel: Recordable;
      setProps: Fn<Props>;
      resetFields: () => Promise<void>;
      setFold:(isFold: boolean) => void;
      setReadOnly: (isReadOnly: boolean) => void;
      clearValidate: (name?: string | string[]) => void;
      updateSchema: (data: Partial<Schema> | Partial<Schema>[]) => void;
      appendSchema: (newSchema: Schema | Schema[], baseField?: string) => void;
      insertSchema: (newSchema: Schema | Schema[], baseField?: string) => void;
      deleteSchema: (field: string | string[]) => void;
      validate: (nameList?: NamePath[]) => any;
    }

    type Content = Omit<Expose, 'setReadOnly'> & {
      isReadOnly:Ref<boolean>
    }
  }
}