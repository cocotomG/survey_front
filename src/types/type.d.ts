// 类型工具泛型

// 该字段可以为 null，或 undefined，为了解决 strict 模式的影响（基础数据类型不能为 null 和 undefined）
declare type Nullable<T = any> = T | null | undefined

// 定义对象，key 全局为 string
declare type Recordable<T = any> = Record<string, T>

// 将对象的特定 key 修改为必填
type RequiredKey<T extends Record<string, any>, K extends string> = Required<Pick<T, Extract<keyof T, K>>> & T

// 可通过字面量获取的类型，暂时未找到使用场景
declare type Indexable<T = any> = {
  [key: string]: T;
}

// 快速定义一个函数，对出参入参都不做校验
declare type Fn<T = any, R = any> = (...arg: T[]) => R

// 定义只包含 $el 的对象结构，针对 vue 组件实例，仅用于获取 el 对象
// 为何只定义 $el，而不包含其他组件的属性，如果用到具体组件的其他属性，应该有该组件的类型负责，由具体组件的 type 继承本类型，进行扩展
// 而不是开放全部其他属性，用到那些属性，再扩展那些属性，维持最小影响范围
declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T;
}

// 定义可能为空的，包含 $el 的对象结构，针对 vue 组件实例
declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = Nullable<ComponentElRef<T>>

// 定义可能为空的原生 element 标签属性
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

// 事件类型
declare type EmitType = (event: any, ...args: any[]) => void
