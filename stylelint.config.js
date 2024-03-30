// 注释
// 忽略整个文件 /* stylelint-disable */
// 忽略行 /* stylelint-disable-next-line */
// 忽略多行 /* stylelint-disable */

module.exports = {
  extends: [
    'stylelint-config-standard', // stylelint 基础配置规则
    'stylelint-config-html/html', // stylelint-config-html 文件解析器，解析 html，vue 等文件中的 css，应用 stylelint 的规则配置
    'stylelint-config-html/vue', // stylelint-config-html 文件解析器，解析 html，vue 等文件中的 css，应用 stylelint 的规则配置
  ],
  overrides: [
    // 扫描.vue/html文件中的<style>标签内的样式
    {
      files: ['**/*.(scss|css|sass)'],
      customSyntax: 'postcss-scss'
    },
    {
      files: ['**/*.(less)'],
      customSyntax: 'postcss-less'
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html'
    }
  ],
  // 忽略 iconfont 文件样式
  ignoreFiles: ['src/assets/**/*.*'],
  plugins: [
    'stylelint-scss', // 解析 scss，sass 文件
    'stylelint-less', // 解析 scss，sass 文件
    'stylelint-order' // 定制 css 顺序
  ],
  rules: {
    // background-img 图片链接，不需要使用引号
    'function-url-quotes': 'always',
    // 允许文件不写 css，即无 style 标签
    'no-empty-source': null,
    // 兼容最新 css 方法
    'function-no-unknown': [true],
    // 兼容 rpx 单位
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    // 颜色指定大写
    'color-hex-case': 'upper',
    // 颜色6位长度
    'color-hex-length': 'long',
    // 兼容自定义标签名
    'selector-type-no-unknown': [
      true, {
        ignoreTypes: []
      }
    ],
    // 禁止低优先级的选择器出现在高优先级的选择器之后。
    'no-descending-specificity': null,
    // 不验证@未知的名字，为了兼容scss的函数
    'at-rule-no-unknown': null,
    // 禁用未知属性
    'property-no-unknown': [
      true, {
        ignoreProperties: ['composes', // css-module 中的组合功能
        ]
      }
    ],
    // 禁用未知的伪类选择器
    'selector-pseudo-class-no-unknown': [
      true, {
        ignorePseudoClasses: [
          'global', // css-module 中的定义全局样式的伪类 :global(className)
          'deep', // 兼容 vue 中的 deep 伪类属性
        ]
      }
    ],
    // 样式值统一用小写
    'value-keyword-case': [
      'lower', {
        ignoreProperties: ['composes']// css-module 中的组合功能
      }
    ],
    // css 编写顺序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'height',
      'min-height',
      'max-height',
      'width',
      'min-width',
      'max-width',
      'font-size',
      'font-family',
      'font-weight',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition'
    ]
  }
}
