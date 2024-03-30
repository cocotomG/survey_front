/* eslint-disable new-cap */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend' // 使得 setup 文件中可直接使用 name 属性，无需写两个 script 标签
import AutoImport from 'unplugin-auto-import/vite' // 依赖的函数的自动导入，定义那些方法出自哪里，由 vite 自定寻找，不需要程序员显式导入，如 vue 的函数 ref, reactive 等
import Components from 'unplugin-vue-components/vite' // 组件自动导入
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers' // ant-design 组件路径解析器，提供的 unplugin 做路径索引
import {
  createStyleImportPlugin,
  AndDesignVueResolve,
} from 'vite-plugin-style-import' // style 文件自动引入
import { createHtmlPlugin } from 'vite-plugin-html' // html 处理器
import { resolve } from 'path' // 路径解析

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, pathResolve('config'))
  console.log(env)
  return {
    // 项目基础路径
    base: env.VITE_PUBLIC_PATH,

    envDir: pathResolve('config'),

    // 添加接口跨域配置
    server: {
      cors: true, // 默认启用并允许任何源
      proxy: {

        '/api': {
          // target: 'https://bd.test.gzhcll.com',
          target: 'http://localhost:8083/api/admin',
          // target: 'https://back.gzhcll.com',
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, '')
        },
      },
    },

    // 打包器配置，配置别名
    resolve: {
      alias: [
        {
          find: '@/',
          replacement: `${pathResolve('src')}/`,
        },
        {
          find: '@images',
          replacement: `${pathResolve('src/assets/images')}/`,
        },
      ],
    },

    // css 解析器，为了配合 AndDesignVueResolve 自动导入样式而使用的配置
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${pathResolve('src/styles/antdv.less')}"`,
          },
          javascriptEnabled: true,
        },
      },
    },

    // 编译超时时间
    build: {
      chunkSizeWarningLimit: 15000,
      sourcemap: true, // 生成代码映射，并保留注释信息
    },

    // 使用的插件，扩展那些功能
    plugins: [
      // vue
      vue(),

      // vue 中使用 jsx
      vueJsx(),

      // 使得 setup 文件中可直接使用 name 属性，无需写两个 script 标签
      vueSetupExtend(),

      // html 处理器
      createHtmlPlugin({
        minify: true, // 是否压缩
        inject: {
          // 注入占位符替换值，将 title 替换为具体的值
          data: {
            title: env.VITE_SITE_NAME,
            description: env.VITE_SITE_DESCRIPTION,
            updateTime: new Date().toLocaleString(),
          },
        },
      }),

      // 库函数自动导入功能
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'], //  设置自动导入那些库的函数
        include: [
          // 接管那些文件的解析
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, // .vue
        ],
        // ts, eslint 的配置文件内容，会有 autoImport 工具自动生成，无需要程序员自己编写
        dts: './src/types/auto-imports.d.ts', // 自动导入的数据的 ts 声明，使得 ts 能够正确解析
        eslintrc: {
          enabled: true, // 是否开启 eslint 检查
          filepath: './config/.eslintrc-auto-import.json', // 导出 eslint 的配置项，将自动导入的函数，定义为 eslint 的 global 全局变量，解决 eslint 无法识别问题
          globalsPropValue: true, // // 设置全局属性值的类型，开放那些权限，能否重写 (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),

      // ant-design 组件的按需自动导入
      Components({
        dts: './src/types/components.d.ts', // 默认使用 components.d.ts 组件声明文件，也可以传入具体的文件路径，自定义保存的文件路径
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less', // 按需加载 ant-design 中的样式，这里处理 less 的变化
            resolveIcons: true,
          }),
        ], // 自动导入 ant-design 的组件
      }),

      // style 文件自动引入，避免 ant-design 中各个组件的手动引入样式文件的麻烦，如果不添加，全局 message 将丢失样式
      createStyleImportPlugin({
        resolves: [AndDesignVueResolve()],
        libs: [
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            resolveStyle: name => `ant-design-vue/es/${name}/style/index`,
          },
        ],
      }),
    ],
  }
})
