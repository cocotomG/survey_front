import { useEnv } from './env'
// import logoSrc from '@/assets/logo.png';

export const useSiteConfig = {
  logo: '',
  siteName: useEnv.siteName, // 项目名称
  slogan: '问卷，让每个声音都有力量！调查，探索，了解更多！',
  backendPrefix: '/', // 后台路由前缀
  copyright: 'survey ©2022 Created by yuk', // 版权文字
  table: {
    rowKey: 'id', // 行标志字段
    defaultColumnWidth: 120, // 默认列宽
    defaultPageSize: 15, // 默认单页显示记录数
    pageSizes: ['10', '50', '100'], // 单页显示记录数
    pageField: 'page', // 列表接口当前页的入参
    pageSizeField: 'size', // 列表接口单页显示记录数的入参
    resListField: 'records', // 响应列表数据的路径
    resTotalField: 'total', // 响应列表总数数据的路径
    exportMaxNum: 5000, // 导出最大值
  },
}
