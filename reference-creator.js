
/* eslint-disable @typescript-eslint/no-var-requires */
// 根据后端 reference 接口，自动前端 ts 枚举值
const fs = require('fs')
const axios = require('axios')
const outputFilePath = './src/types/reference.d.ts'
const localReferenceOutputFilePath = './src/types/local-reference.ts'
// 前端 固定不变的枚举数据 以LocalEnum命名做区分
const localReference = {
  enableStatusLocalEnum: [
    {
      label: '启用',
      value: 1,
      key: 'ENABLE'
    },
    {
      label: '禁止',
      value: 0,
      key: 'DISABLE'
    }
  ],
  salaryIsSendStatusLocalEnum: [
    {
      label: '未发送',
      value: 0,
      key: 'UNSEND'
    },
    {
      label: '已发送',
      value: 1,
      key: 'SENDED'
    }
  ],
  salaryIsLookStatusLocalEnum: [
    {
      label: '未查看',
      value: 0,
      key: 'UNLOOK'
    },
    {
      label: '已查看',
      value: 1,
      key: 'LOOKED'
    }
  ],
  sureStatusLocalEnum: [
    {
      label: '未确认',
      value: 0,
      key: 'UNSURE'
    },
    {
      label: '已确认',
      value: 1,
      key: 'SURED'
    }
  ],
  isOpenStatusLocalEnum: [
    {
      label: '权限校验有效',
      value: 1,
      key: 'USED'
    },
    {
      label: '权限校验无效',
      value: 0,
      key: 'UNUSE'
    },
  ]
}

// 本地生成reference文件
let localReferenceStr = 'export const localReference = {'
Object.keys(localReference).forEach(key => {
  localReferenceStr += `\r\n    ${key}: ${JSON.stringify(localReference[key])},`
})
localReferenceStr += '\r\n  }'
fs.writeFileSync(localReferenceOutputFilePath, localReferenceStr)


axios({
  url: 'http://localhost:8083/api/admin/reference',
  method: 'get',
}).then(res => {
  let { data } = res.data
  data = Object.assign(localReference, data)
  let fileStr = ''
  let constantTypeStr = ''
  let constantKeyMapStr = 'type ConstantKeyMap = {'
  Object.keys(data).forEach(key => {
    if (data[key][0]?.key) {
      let constantItemStr = ''
      data[key].forEach(item => {
        constantItemStr += `\r\n  | '${item.key}' // ${item.label}`
      })
      constantTypeStr += `  type ${key.replace(key[0], key[0].toUpperCase())} = Record<${constantItemStr}\r\n  , ReferenceItem>\r\n\r\n`

      constantKeyMapStr += `\r\n    ${key}: ${key.replace(key[0], key[0].toUpperCase())}`
    } else {
      console.log(key, 'ˆ')
    }
  })

  constantKeyMapStr += '\r\n  }'


  fileStr += `

declare namespace Reference {

  /** refer 枚举值 */
  interface ReferenceItem {

    /** 中文标题 */
    label: string;

    /** 数据库标识值 */
    value: any;

    /** 常量名 */
    key?: string;

    /** 前端自行定制的属性，为了在应用中设置颜色 */
    color?: string;

    /** 前端自行定制的属性，为了在应用中设置背景颜色 */
    bgColor?: string;

    [k: string]: any;
  }

  /** 具体常量配置项 */
${constantTypeStr}
  /** 常量枚举键值类型 */
  ${constantKeyMapStr}

  /** reference 枚举键 */
  type ReferenceKey = keyof ConstantKeyMap

  /** reference 对应常量枚举值 */
  type ConstantMap = ConstantKeyMap[ReferenceKey]

}

`

  fs.writeFileSync(outputFilePath, fileStr)

})

