const {
  VITE_PUBLIC_PATH,
  VITE_API_BASE_URL,
  VITE_API_UPLOAD_URL,
  VITE_SITE_NAME,
  VITE_APP_ENV,
} = import.meta.env

type Env = {

  /** 公共路径 */
  publicPath: string;

  /** 基础请求路径，已实现代理 */
  baseApiUrl: string;

  /** 文件上传路径 */
  uploadApiUrl: string;

  /** 项目名称 */
  siteName: string;

  /** 当前程序运行环境 */
  appEnv: 'development' | 'test' | 'production';

  /** 当前是否为开发环境 */
  isDevelopment: boolean;

  /** 当前是否为测试环境 */
  isTest: boolean;

  /** 当前是否为生产环境 */
  isProduction: boolean;
}

console.log('VITE_APP_ENV', VITE_APP_ENV)

export const useEnv: Env = {
  publicPath: VITE_PUBLIC_PATH as string,
  baseApiUrl: VITE_API_BASE_URL as string,
  uploadApiUrl: VITE_API_UPLOAD_URL as string,
  siteName: VITE_SITE_NAME as string,

  appEnv: VITE_APP_ENV,
  isDevelopment: VITE_APP_ENV === 'development',
  isTest: VITE_APP_ENV === 'test',
  isProduction: VITE_APP_ENV === 'production',
}
