

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
  type EnableStatusLocalEnum = Record<
  | 'ENABLE' // 启用
  | 'DISABLE' // 禁止
  , ReferenceItem>

  type SalaryIsSendStatusLocalEnum = Record<
  | 'UNSEND' // 未发送
  | 'SENDED' // 已发送
  , ReferenceItem>

  type SalaryIsLookStatusLocalEnum = Record<
  | 'UNLOOK' // 未查看
  | 'LOOKED' // 已查看
  , ReferenceItem>

  type SureStatusLocalEnum = Record<
  | 'UNSURE' // 未确认
  | 'SURED' // 已确认
  , ReferenceItem>

  type IsOpenStatusLocalEnum = Record<
  | 'USED' // 权限校验有效
  | 'UNUSE' // 权限校验无效
  , ReferenceItem>

  type EnableCodeEnum = Record<
  | 'disable' // 禁用
  | 'enable' // 启用
  , ReferenceItem>

  type ChannelCodeEnum = Record<
  | 'MOBILE_MESSAGE' // 短信
  | 'QRCODE' // 二维码
  , ReferenceItem>

  type SurveyTypeCode = Record<
  | 'SATISFACTION_SURVEY' // 满意度调查
  | 'MARKET_RESEARCH' // 市场调研
  | 'SOCIAL_SURVEY' // 社会调查
  | 'HEALTH_SURVEY' // 健康调查
  | 'EDUCATION_SURVEY' // 教育调查
  | 'HUMAN_RESOURCES_SURVEY' // 人力资源调查
  | 'GOVERNMENT_SURVEY' // 政府调查
  | 'ACADEMIC_RESEARCH_SURVEY' // 学术研究调查
  , ReferenceItem>

  type BusinessCodeEnum = Record<
  | 'AGRICULTURE' // 农业
  | 'TECHNOLOGY' // 科技
  | 'CATERING' // 饮食
  | 'FINANCIAL' // 金融
  , ReferenceItem>

  type GenderTypeEnum = Record<
  | 'FEMAN' // 女
  | 'MAN' // 男
  , ReferenceItem>

  type QuestionTypeEnum = Record<
  | 'INPUT' // 填空题
  | 'RADIO' // 单选题
  | 'CHECK_BOX' // 多选题
  | 'TITLE' // 标题
  | 'ONLY_READ' // 只读
  , ReferenceItem>


  /** 常量枚举键值类型 */
  type ConstantKeyMap = {
    enableStatusLocalEnum: EnableStatusLocalEnum
    salaryIsSendStatusLocalEnum: SalaryIsSendStatusLocalEnum
    salaryIsLookStatusLocalEnum: SalaryIsLookStatusLocalEnum
    sureStatusLocalEnum: SureStatusLocalEnum
    isOpenStatusLocalEnum: IsOpenStatusLocalEnum
    EnableCodeEnum: EnableCodeEnum
    ChannelCodeEnum: ChannelCodeEnum
    SurveyTypeCode: SurveyTypeCode
    BusinessCodeEnum: BusinessCodeEnum
    GenderTypeEnum: GenderTypeEnum
    QuestionTypeEnum: QuestionTypeEnum
  }

  /** reference 枚举键 */
  type ReferenceKey = keyof ConstantKeyMap

  /** reference 对应常量枚举值 */
  type ConstantMap = ConstantKeyMap[ReferenceKey]

}

