module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    'vue/setup-compiler-macros': true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/recommended',
    './config/.eslintrc-auto-import.json',
    './config/.eslint-defaults'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    // 支持解析 vue 中的 lang='tsx' 的解析
    // https://eslint.vuejs.org/user-guide/#faq
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/parser/README.md#parseroptionsecmafeaturesjsx
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    XLS: false,
  },

  plugins: [
    'vue',
    '@typescript-eslint',
    'unused-imports', // 删除无用 imports 插件
  ],
  rules: {

    /* ts */
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-this-alias': 0,

    // 不使用未定义的变量，避免类型提升，因与 js 中相同配置冲突，暂不使用
    '@typescript-eslint/no-shadow': 0,

    // 要求中缀操作符周围有空格 |，& 等
    '@typescript-eslint/space-infix-ops': 2,

    // 强制关键字周围空格的一致性': 0,
    '@typescript-eslint/keyword-spacing': 2,

    // 去除分号
    '@typescript-eslint/semi': [2, 'never'],

    // 删除无用变量和 import 及变量，其配置项源自于 eslint 中的 no-unused-imports 和 no-unused-vars
    // 'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all', // 检测所有变量，包括全局环境中的变量。这是默认值。
        varsIgnorePattern: '_', // 忽略特定变量，使用正则匹配，忽略箭头函数中，无用的头，_
        args: 'after-used', // 不检查最后一个使用的参数之前出现的未使用的位置参数，即允许仅使用第二个参数，不使用第一个参数的情况
      }
    ],

    // 去除 vue 中，组件名必须多个单词的限制
    'vue/multi-word-component-names': 0,

    // 去除 v-model 中，不能指定绑定变量的限制，vue3 新特性，有指定绑定变量的需求
    'vue/no-v-model-argument': 0,

    // 设置 vue 组件中，template,script，style 的存放顺序
    'vue/component-tags-order': [
      'error', {
        order: ['style', 'template', 'script']
      }
    ],

    // 设置 vue 标签中属性的排序
    'vue/attributes-order': [
      'error', {
        order: [
          'DEFINITION', // v-is
          'CONDITIONALS', // v-if
          'LIST_RENDERING', // v-for
          'UNIQUE', // ref，key
          'RENDER_MODIFIERS', // v-once
          'TWO_WAY_BINDING', // v-model
          'CONTENT', // v-text,v-html
          'SLOT', // slot
          'OTHER_DIRECTIVES', // v-指令
          'GLOBAL', // id, class
          'OTHER_ATTR', // 其他属性
          'EVENTS', // @ 事件
        ],
        alphabetical: false // 大小写排序
      }
    ],

    // 当前处于起始阶段，经常需要 console 定位，暂时不加限制
    'no-console': 0,

    // 因使用配置项的关系，无法实现函数的先定义后使用特定，暂时忽略该配置项
    'no-use-before-define': 0,
    // 因为前面已经使用了 'unused-imports' 插件，起到了相同的作用，屏蔽原始规则，避免相同的警告
    'no-unused-imports': 0,
    'no-unused-vars': 0,

    // 对象结构，在直接取值时，不太方便，暂时放开
    'prefer-destructuring': 0,
    'max-len': 0, // 类名会超出
    'string-quotes': 0, // 不方便写行内样式

    // 顶部已经使用 ts 的相同配置，忽略此配置。原因是此配置无法检验 ts 中 enum 的定义，正常使用也会报错
    'no-shadow': 'off',

    'valid-jsdoc': [0, { requireReturn: false }], // 强制使用有效的 JSDoc 注释，JSDoc 使用教程 http://shouce.jb51.net/jsdoc/

  },

  /**
   * 针对特定文件的配置
   * 【】可以通过overrides对特定文件进行特定的eslint检测
   * 【】特定文件的路径书写使用Glob格式，一个类似正则的路径规则，可以匹配不同的文件
   * 【】配置几乎与 ESLint 的其他配置相同。覆盖块可以包含常规配置中的除了 extends、overrides 和 root 之外的其他任何有效配置选项，
   */
  overrides: [
    {
      files: ['*.ts', '*.vue', '*.tsx'],
      rules: {
        // 因 eslint 无法识别 ts 的 global.d.ts 定义，ts 类型报未定义的异常，故关闭该配置
        // 未定义的检查功能，由 ts 自带检测来完成，参考 https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/linting/TROUBLESHOOTING.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
        'no-undef': 'off'
      }
    },
    {
      // api 文档。因参数较多，且没有明确的参数类型，编写 JSDoc 暂无一样，暂不校验规则
      files: ['**/api/*.ts'],
      rules: {
        'valid-jsdoc': 0,
      }
    }
  ],

  globals: {
    definePageConfig: 'readonly',
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    process: 'readonly',
    defineAppConfig: 'readonly',
    module: 'readonly',
    require: 'readonly',
    __dirname: 'readonly',
  },
}
