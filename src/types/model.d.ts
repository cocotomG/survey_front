// 数据模型，定义某数据实体
declare namespace Model {

  /** 角色模型，一个用户仅拥有一个角色，不同的角色拥有的权限，通过 permissions 数组返回 */
  interface Role {

    /** 角色id */
    id: number;

    /** 角色名称 */
    title: string;

    /** 权限 */
    permissions: Permission[]
  }

  /** 用户信息模型 */
  interface User {

    /** 管理员id */
    id: number;

    /** 商户id */
    groupId: number,

    /** 管理员名称 */
    userName: string;

    /** 昵称 */
    nickname: string;

    /** 手机号 */
    mobile: string;

    /** 角色id */
    roleId: number,

    /** 状态 */
    status: number;

    /** 头像地址 */
    headImg: string;

    /** 用户所属角色，一个用户仅拥有一个角色 */
    role: Role;

    /** 组织id */
    tempGroupId: number;

    /** 0:超级管理员权限 1:普通*/
    isOpen: number;
  }
  interface Group {
    id: number;
    sn: string;
    company: string;
    license: string;
    licensePic: string;
    legalPerson: string;
    bankName: string;
    bankAccount: string;
    companyAddress: string;
    contact: string;
  }

  /** 社保信息模型 */
  interface SocialPlan {
    id?: number,
    title?: string,
    socialId?: number,
    factor?: number,
    isValid?: number,
    createdAt?: string,
    updatedAt?: string,
    details?: SocialPlanDetail[] | Ref<any>
  }


  /** 社保方案模型 */
  interface SocialPlanDetail {
    title?: string,
    minBase?: number,
    companyPayPercent?: number,
    personalPayPercent?: number,
    code?: string,
    createdAt?: string,
    updatedAt?: string,
  }
  interface AttendanceShift {
    shiftName: string,
    timeLong: number | string | undefined,
    shiftTime: [
      {
        workShift?: string,
        closingTime?: string,
        time?: any[]
      }
    ]
  }

  interface JobHiring {
    needname: string,
    jobInfoArr: JobHiringInfo[]
  }
  interface JobHiringInfo {
    jobname: string,
    ageMin: number | undefined,
    ageMax: number | undefined,
    staffType: number | undefined,
    'needNum': number | undefined, // [必填] 需求人数
    'sex': number | undefined, // [非必填] 性别（0未知，1男，2女，3男女不限）
    'education': number | undefined, // [非必填] 学历要求//0未知；1小学；2初中；3高中，4职高,5中专,6大专，7本科，8大学本科，9研究生，10博士，11硕士研究生
    'experienceStart': number | undefined, // [非必填] 经验范围：起始 单位：年
    'experienceEnd': number | undefined, // [非必填]  经验范围：结束
    'settlementMethod': number | undefined, // [必填]  薪资结算方式
    'moneyMin': number | undefined, // [必填]  薪资范围：起始
    'moneyMax': number | undefined, // [必填]  薪资范围：结束
    'workRemark': string | undefined, // [非必填]  工作描述
    'projectsIdArr': number[] | undefined
  }

  interface MentalQuestionInfo {
    id?: number,
    name: string,
    type: number,
    amount?: string,
    discountAmount?: string,
    isEnable?: string,
    description?: string,
    mentalQuestions?: MentalQuestions[]
  }
  interface MentalQuestions {
    id?: string,
    name?: string,
    ranking?: number,
    mentalQuestionOptions?: MentalQuestionOptions[]
  }
  interface MentalQuestionOptions {
    id?: string,
    name?: string,
    mentalCharacterId?: number,
    mentalQuestionId?: number,
  }


}