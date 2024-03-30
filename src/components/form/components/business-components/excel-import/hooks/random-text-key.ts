
/**
 *
 * @param num 生成的字母个数
 * @returns 随机的6位字母字符串数组
 */
export function getRandomName(num: number):string[] {
  const letterArr = 'abcdefghijklmnopqrstuvwxyz'
  const letterBigArr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let resArray: string[] = []
  for (let j = 0; j < num; j++) {
    let code = ''
    for (let i = 0; i < 3; i++) {
      code += (letterArr[Math.floor((Math.random() * letterBigArr.length - 1) + 1)] + letterBigArr[Math.floor((Math.random() * letterBigArr.length - 1) + 1)])
    }
    resArray.push(code)
  }
  return resArray
}