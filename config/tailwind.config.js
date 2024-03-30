module.exports = {
  important: true, // 是否将 tailwind 的样式设置为最高级
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {

    /* fontSize 12 14 16 18 20 24 30 36 48 60 72 96 128*/
    colors: theme => ({
      ...theme.colors,
      gray: { // 自定义灰色
        20: '#f7f9ff',
        50: '#eeeeee',
        100: '#f3f4f6',
        200: '#cccccc',
        300: '#d1d5db',
        400: '#999999',
        500: '#6b7280',
        600: '#666666',
        700: '#374151',
        800: '#24262C',
        900: '#111827',
      },
      blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#0a7cf6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a'
      },
      // 登录文字主色
      primaryColor: {
        default: '#448EF6'
      }
    }),
    screens: { // 屏幕断点自定义
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
