### 运行网址

- 开发环境：https://bd.test.gzhcll.com/gm
- 测试环境：https://bd.test.gzhcll.com/gm
- 生产环境：https://back.gzhcll.com/gm

### 接口地址

- 开发环境：bd.test.gzhcll.com
- 测试环境：bd.test.gzhcll.com
- 正式环境：back.gzhcll.com

### 接口文档

- https://yapi.gzhclw.com/group/147

### 原型及设计稿

- https://lanhuapp.com/web/#/item/project/stage?tid=13b1fd8d-17a9-4841-826f-5dbd5086493c&pid=da653039-0698-44ce-bb89-0334d0a2dfc5

### 开发约定

- 新建数据，涉及到时间范围，统一使用单个字段的数组形式，用 createdAt 保存开始时间与结束时间的范围，不拆分两个字符串

### 后端 reference 枚举值在前端中的使用

- 约定
  - 前端沿用后端的常量值，使用到的常量，在全局的 reference 接口的 key 字段获取
  - key 对应的值，为 reference 的具体配置
  - 常量 key 在 `types/reference.d.ts` 中定义
- 快速更新 reference 常量配置
  - 将后端 reference 的整个返回值拷贝到 `reference-creator.js` 文件的 data 变量中
  - 在根目录执行`node ./reference-creator.js`，将自动生成新的 `types/reference.d.ts` 文件，完成数据同步

### 坑

```
// 1，cos 需要在请求头中添加 origin 请求头，才可以返回 cors 响应头，才可以解决跨域问题
// 2，在 chrome 浏览器中，在资源已经在 get 请求调用成功的情况下，目前为止的特殊情况下，再次调用会导致 origin 请求头丢失，导致无法返回 cors 响应头，导致跨域。而当使用 no-cache 功能时则恢复正常
// 3，故目前通过添加时间戳的方式，每次都获取最新资源，解决该问题
// 4, 相关参考
// https://stackoverflow.com/questions/69199174/getting-cors-error-on-cloudfront-hls-js
// https://bugs.chromium.org/p/chromium/issues/detail?id=409090
// hack
downloadFile(`${qrCodeUrl.value}?timestemp=${new Date().getTime()}`, {}, `${billDetail.value.sn} - 发薪二维码`, 'png')
// downloadFile(qrCodeUrl.value, {}, `${billDetail.value.sn} - 发薪二维码`, 'png')

```

- 账号密码自动填充问题

  - Input 普通输入框，type='text' 可以通过 autocomplete 设置为 off 来禁止默认填充
  - InputPassword 密码输入框，type='password'，在特定浏览器中设置 autocomplete 设置为 off，并不能真正生效
    - 这时，需要通过 autocomplete = 'new-password' 来禁止浏览器默认填充

- inject 及 provide 函数调用时机
  - 只能在 setup 函数顶层被调用，同理，运用到 inject 技术的全局存储，也只能在 setup 顶部被调用，不能在局部函数中使用，如 useRoute
  - https://v3.cn.vuejs.org/api/composition-api.html#provide-inject
  - 通过源码阅读得知，在 setup 函数中，会先执行'setCurrentInstance(instance)'，然后将 instance 置空 'unsetCurrentInstance()'
  - 而 inject 函数中，使用到 instance 实例，所以 inject 只能在 setup 函数中被执行，否则 instance 将拿不到

```
if (setup) {
  const setupContext = (instance.setupContext =
      setup.length > 1 ? createSetupContext(instance) : null);
  setCurrentInstance(instance);
  reactivity.pauseTracking();
  const setupResult = callWithErrorHandling(setup, instance, 0 /* SETUP_FUNCTION */, [reactivity.shallowReadonly(instance.props) , setupContext]);
  reactivity.resetTracking();
  unsetCurrentInstance();
```

- form 表单，id 重复问题

```
<!-- 为 form 添加动态 name，使得 form item 中的 item 的 id 的以唯一区分，解决多个 form 表单，使用了统一 id 的问题 -->
<a-form
  ref="formElRef"
  :name="`base-form-${new Date().getTime().toString()}`"
  v-bind="bindAttrs"
>
```

- ant-design-vue 版本锁死为 3.2.1

  - ant-design-vue ^3.2.2 版本以上版本，
  - `<a-date-picker />` 在本地运行时无问题，但当打包发布线上后，选择日期后不生效
  - `<a-range-picker />` 则在打包后，点击选择框，不弹出日期选择器。
  - 故将 ant-design-vue 版本锁死为 3.2.1 规避该问题
  - 具体问题是 vite 打包 build test 命令出错,运行生命令没出现问题

- xslx-style 源码修改
- https://blog.csdn.net/weixin_45042868/article/details/124867964
- 注意，修改的 `xlsx.js` 文件，是 `xlsx-style` 的一级目录，而不是 dist 中的问题

### TS 类型工具库

- https://github.com/piotrwitek/utility-types#requiredt-k

### 工具函数新增前自检 checklist

- lodash：工具函数
- validator：数据校验器
