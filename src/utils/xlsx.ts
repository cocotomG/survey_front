import { cloneDeep } from 'lodash-es'
// 英文文档 https://github.com/SheetJS/sheetjs
// 中文文档 https://github.com/rockboom/SheetJS-docs-zh-CN
import { WorkBook, WorkSheet, utils, writeFile, read, WritingOptions } from 'xlsx'
import FileSaver from 'file-saver'
import { transformObjToDotStrObj, parseDotStrObjToObj } from '@/utils/object'
interface ExcelData<T = any> {
  headers: string[];
  results: T[];
  meta: { sheetName: string };
}
//
interface AoAToSheet<T = any> {
  data: T[][];
  header?: T[];
  filename?: string;
  write2excelOpts?: WritingOptions;
}
const DEF_FILE_NAME = 'excel-list.xlsx'

export function aoaToSheetXlsx<T = any>({ data, header, filename = DEF_FILE_NAME, write2excelOpts = { bookType: 'xlsx' } }: AoAToSheet<T>) {
  const arrData = [...data]
  if (header) {
    arrData.unshift(header)
  }

  const worksheet = utils.aoa_to_sheet(arrData)

  /* add worksheet to workbook */
  const workbook: WorkBook = {
    SheetNames: [filename],
    Sheets: {
      [filename]: worksheet,
    },
  }

  /* output format determined by filename */
  writeFile(workbook, filename, write2excelOpts)

  /* at this point, out.xlsb will have been downloaded */
}

export function toStyleXlsx({ filename, worksheet }: { filename: string, worksheet: WorkSheet }) {
  const workbook: WorkBook = {
    SheetNames: [filename],
    Sheets: {
      [filename]: worksheet,
    },
  }

  // writeFile(workbook, filename, { bookType: 'xlsx' })
  let wopts = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  }
  let wbout = window.XLS.write(workbook, wopts)// 使用xlsx-style 写入
  function s2ab(s) {
    let buf = new ArrayBuffer(s.length)
    let view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) {
      // eslint-disable-next-line no-bitwise
      view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
  }
  FileSaver.saveAs(new Blob([s2ab(wbout)], { type: '' }), filename)
}


export function getAllCellRow(sheet: WorkSheet) {
  if (!sheet || !sheet['!ref']) {
    return []
  }
  // A3:B7=>{s:{c:0, r:2}, e:{c:1, r:6}}
  const range = utils.decode_range(sheet['!ref'])


  /* start in the first row */
  let allCell: string[][] = []
  for (let R = range.s.r; R <= range.e.r; ++R) {
    let newRaw: string[] = []
    allCell.push(newRaw)
    for (let C = range.s.c; C <= range.e.c; ++C) {

      /* walk every column in the range */
      const cell = sheet[utils.encode_cell({
        c: C,
        r: R
      })]

      /* find the cell in the first row */
      let hdr = '' // <-- replace with your desired default
      if (cell && cell.t) {
        hdr = utils.format_cell(cell)
      }
      newRaw.push(hdr)
    }
  }
  console.log(allCell, 'allCell')
  return allCell
}

export function getExcelData(file: File): Promise<ExcelData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      try {
        const excelData: ExcelData[] = []
        const data = e.target && e.target.result
        const workbook = read(data, { type: 'array' })
        for (const sheetName of workbook.SheetNames) {
          const worksheet = workbook.Sheets[sheetName]
          let headers: string[] = getHeaderRow(worksheet)
          // 去除空格
          headers = headers.map(header => header?.trim()).filter(header => !!header)
          // rawNumbers 数字不转换
          const results = utils.sheet_to_json(worksheet, { rawNumbers: false })
          excelData.push({
            headers,
            results,
            meta: {
              sheetName,
            },
          })
        }
        resolve(excelData)
      } catch (error) {
        reject(error)
      }
    }
    reader.readAsArrayBuffer(file)
  })
}

function getHeaderRow(sheet: WorkSheet) {
  if (!sheet || !sheet['!ref']) {
    return []
  }
  const headers: string[] = []
  // A3:B7=>{s:{c:0, r:2}, e:{c:1, r:6}}
  const range = utils.decode_range(sheet['!ref'])

  const R = range.s.r

  /* start in the first row */
  for (let C = range.s.c; C <= range.e.c; ++C) {

    /* walk every column in the range */
    const cell = sheet[utils.encode_cell({
      c: C,
      r: R
    })]

    /* find the cell in the first row */
    let hdr = '' // <-- replace with your desired default
    if (cell && cell.t) {
      hdr = utils.format_cell(cell)
    }
    headers.push(hdr)
  }
  return headers
}


/** **** 新增方法 ******/
/**
 * 获取 excel 中每个 sheet，每个单元格中的原始数据
 * @param file 传入的 excel 文件
 * @returns 返回 excel 中的 sheet 数组，sheet 为以行列形成的二维数组
 */
export function getExcelOriginCell(file: File): Promise<{excelData:string[][][], sheetNames:string[]}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      try {
        const excelData: string[][][] = []
        const data = e.target && e.target.result
        const workbook = read(data, { type: 'array' })
        for (const sheetName of workbook.SheetNames) {
          const worksheet = workbook.Sheets[sheetName]
          excelData.push(getAllCellRow(worksheet))
        }
        resolve({
          excelData,
          sheetNames: workbook.SheetNames
        })
      } catch (error) {
        reject(error)
      }
    }
    reader.readAsArrayBuffer(file)
  })
}
export interface TableHeaderColumn {
  title?: string,
  dataIndex?: string,
  children?: TableHeaderColumn[],
}

export interface TextKeyMap {
  [key: string]: string
}

/**
 * 传入 sheet 所有单元格数据，获取处理后的 antdv 表头数据，内容数据，及后端格式对象
 * @param sheet 当前 sheet 所有单元格数据
 * @param textKeyMap 字段在Excel 表中，以点拼接的中文 key，与以点拼接的英文 key 映射表
 * @returns {
    headerColumns, // antdv 中 table 表头配置
    dataSourceList: dataSource, // antdv 中数据内容
    dataList, // 以映射表整理转换后的对象数据结构
  }
 */
export function getSheetHeaderAndData(sheet: string[][], textKeyMap: TextKeyMap) {
  // 获取菜单项在 Excel 中所占行数
  function getHeaderRowNum(textKeyMap: { [key: string]: string }): number {
    let maxLevel = 1 // 最高层级
    Object.keys(textKeyMap).forEach(textStr => {
      maxLevel = Math.max(maxLevel, textStr.split('.').length)
    })
    return maxLevel
  }
  const headerRowNum = getHeaderRowNum(textKeyMap)

  const headerRows = sheet.slice(0, headerRowNum)
  const dataRows = sheet.slice(headerRowNum)

  let headerColumns: TableHeaderColumn[] = [] // 收集 table 组件中，表头 columns 的对象数组结构
  let lastHeaderLevelColumns: TableHeaderColumn[] = [] // 最近一个 columns，用于收集单元格子表头的内容
  let textValueMaps: Recordable[] = [] // 以中文字符串为 key 的对象数组，用于收集表格中的数据

  // 遍历表头中的每个单元格
  const columnIndexObj: Recordable[] = []
  for (let colIndex = 0; colIndex < headerRows[0].length; colIndex++) {
    const headerCellList = headerRows.map(item => item[colIndex])
    // eslint-disable-next-line no-loop-func
    headerCellList.forEach((headerCell, headerCellIndex) => {
      if (!headerCell) {
        return
      }
      const tempColumn = { title: headerCell.trim() }

      columnIndexObj[colIndex] = tempColumn

      if (headerCellIndex === 0) {
        headerColumns.push(tempColumn)
        lastHeaderLevelColumns[headerCellIndex] = tempColumn
      } else {
        lastHeaderLevelColumns[headerCellIndex - 1].children = lastHeaderLevelColumns[headerCellIndex - 1].children || []
        lastHeaderLevelColumns[headerCellIndex - 1].children!.push(tempColumn)
        lastHeaderLevelColumns[headerCellIndex] = tempColumn
      }
    })
  }

  function transformListToObj(list, obj = {}) {
    list.forEach(item => {
      if (item.value) {
        obj[item.title] = item.value
        return
      }

      if (item.children) {
        const tempObj = obj[item.title] = {}
        transformListToObj(item.children, tempObj)
      }
    })
    return obj
  }

  dataRows.forEach(dataRow => {
    dataRow.forEach((value, index) => {
      try {
        columnIndexObj[index] && (columnIndexObj[index].value = value.trim())
      } catch (e) {
        console.log(e)
      }

    })
    const titleObj = Object.create(headerColumns)
    textValueMaps.push(transformListToObj(titleObj))
  })


  // 根据表头的 title 值，从 textKeyMap 中寻找映射关系，设置 headerColumn 对应的 dataIndex
  function setHeaderColumnDataIndex(headerList, preTitle) {
    headerList = cloneDeep(headerList)
    headerList.forEach(headerObj => {
      if (headerObj.children) {
        headerObj.children = setHeaderColumnDataIndex(headerObj.children, [...preTitle, headerObj.title])
      } else {
        const titleStr = [...preTitle, headerObj.title].join('.')
        headerObj.dataIndex = textKeyMap[titleStr]
      }
    })
    return headerList
  }

  // 将以中文为 key 的对象，通过 textKeyMap 映射，找到对应的 key，转化为以 key 对键的对象，转化为后端对应的 json 对象
  function transformTextToKey(textDataList: Recordable[], textKeyMap: Recordable): Recordable[] {
    const textDotStrDataList = textDataList.map(obj => transformObjToDotStrObj(obj))
    let textDotStrDataListStr = JSON.stringify(textDotStrDataList)
    Object.keys(textKeyMap).forEach(text => {

      const key = textKeyMap[text]
      textDotStrDataListStr = textDotStrDataListStr.replaceAll(`"${text}"`, `"${key}"`) // 在这里，通过字符串的替换，实现表头数据层级结构，与实际对象将数据结构的转换
    })
    const keyDotStrDataList = JSON.parse(textDotStrDataListStr)
    const keyDataList = keyDotStrDataList.map(keyDotStrData => parseDotStrObjToObj(keyDotStrData))
    return keyDataList
  }

  headerColumns = setHeaderColumnDataIndex(headerColumns, [])
  const dataList = transformTextToKey(textValueMaps, textKeyMap)
  const dataSource = dataList.map(row => transformObjToDotStrObj(row)) // 将 JSON 对象转化为 “点.” 拼接的扁平对象，使得数据与 headerColumn 中的 dataIndex 相对应。实现 table 的数据填充

  return {
    headerColumns,
    dataList,
    dataSourceList: dataSource,
  }
}

// 合并单元格的配置对象定义
 interface Merge {
  s: { // start，合并起始的单元格
    r: number, // 所在行
    c: number, // 所在列
  },
  e: { // end，合并结束的单元格
    r: number,
    c: number,
  }
}

/**
 * 将数据源，转化为 Excel 单元格数据，并生成 Excel 表头
 * @param dataList 数据源
 * @param textKeyMaps // Excel 中文表头层级与数据源英文层级间的映射表
 * @param headerFirstRow // 表头首行所在行，为了兼容表格顶部还插入有其他 Excel 行的情况，即表格不在首行
 * @returns {
    headerMerges, // 表头合并单元格配置项
    cells, // 表头及数据项的 Excel 单元格数组
  }
 */
export function transformDataToSheetCells(dataList: Recordable[], textKeyMaps: TextKeyMap[], headerFirstRow = 0) {

  // 获取从 textKeyMaps 解析，拆分后的，中英文 keys 数组
  function getKeysList(textKeyMaps: TextKeyMap[]) {
    const chineseKeysList: string[][] = []
    const englishKeysList: string[][] = []
    textKeyMaps.forEach(textKeyMap => {
      const keyStr = Object.values(textKeyMap)[0]
      const textStr = Object.keys(textKeyMap)[0]
      englishKeysList.push(keyStr.split('.'))
      chineseKeysList.push(textStr.split('.'))
    })
    return {
      englishKeysList,
      chineseKeysList
    }
  }

  // 获取表头行数
  function getHeaderRowNum(chineseKeysList: string[][]): number {
    let maxLevel = 1
    chineseKeysList.forEach(chineseKeys => {
      maxLevel = Math.max(chineseKeys.length, maxLevel)
    })
    return maxLevel
  }

  // 获取表头行 cell 数据
  function getHeaderRows(headerRowNum: number, chineseKeysList: string[][]): string[][] {
    const headerRows: string[][] = []
    // 初始化，全部设置为 ''
    for (let rowIndex = 0; rowIndex < headerRowNum; rowIndex++) {
      const row = new Array(chineseKeysList.length).fill('')
      headerRows.push(row)
    }
    // 将表头 cell 设置为对应的中文
    chineseKeysList.forEach((chineseKeys, colIndex) => {
      for (let rowIndex = 0; rowIndex < chineseKeys.length; rowIndex++) {
        headerRows[rowIndex][colIndex] = chineseKeys[rowIndex]
      }
    })

    // 去除需要合并单元格的每一列中。重复的 cell 数据，重复的，则设置为 ''
    headerRows.forEach(headerRow => {
      let lastColValue = ''
      headerRow.forEach((cell, colIndex) => {
        if (lastColValue !== cell) {
          lastColValue = cell
        } else {
          headerRow[colIndex] = ''
        }
      })
    })

    return headerRows
  }

  // 获取合并单元格配置
  function getMerges(headerRowNum: number, chineseKeysList: string[][]): Merge[] {
    const merges: Merge[] = []
    // 竖向合并
    chineseKeysList.forEach((chineseKeys, colIndex) => {
      // 当前列，每一行都有数据，这无需要竖向合并
      if (chineseKeys.length === headerRowNum) {
        return
      }
      // 否则。存在数据需要竖向合并，竖向合并的行数，即为比最高行数少的行数
      merges.push({
        s: {
          r: chineseKeys.length - 1 + headerFirstRow,
          c: colIndex,
        },
        e: {
          r: headerRowNum - 1 + headerFirstRow,
          c: colIndex,
        }
      })
    })
    // 横向合并
    for (let rowIndex = 0; rowIndex < headerRowNum; rowIndex++) {
      const rowCells = chineseKeysList.map(chineseKeys => chineseKeys[rowIndex])
      let preCell = '' // 前一个单元格
      let merge: Merge | null = null // 当前合并配置项
      rowCells.forEach((cell, colIndex) => {
        if (preCell === cell) { // 如果二者相同，则证明需要横向合并单元格
          if (!merge) { // merge 不存在，则创建，
            merge = {
              s: {
                r: rowIndex + headerFirstRow,
                c: colIndex - 1
              },
              e: {
                r: rowIndex + headerFirstRow,
                c: colIndex
              }
            }
            merges.push(merge) // 添加一个合并对象
          } else {
            merge.e.c = colIndex // 修改其合并结束列
          }
        } else {
          preCell = cell
          merge = null
        }
      })
    }
    return merges
  }

  // 获取转化数据结构为 Excel 数据行
  function getDataRows(dataList: Recordable[]): string[][] {
    const dataRows: string[][] = []
    dataList.forEach(dataItem => {
      const cells: string[] = []
      englishKeysList.forEach(keyLevel => {
        const value = keyLevel.reduce((dataItem, key) => dataItem[key] || '', dataItem).toString()
        cells.push(value)
      })
      dataRows.push(cells)
    })
    return dataRows
  }

  const { englishKeysList, chineseKeysList } = getKeysList(textKeyMaps)
  const headerRowNum = getHeaderRowNum(chineseKeysList)
  const headerMerges = getMerges(headerRowNum, chineseKeysList)
  const headerRows = getHeaderRows(headerRowNum, chineseKeysList)
  const dataRows = getDataRows(dataList)

  return {
    headerMerges,
    cells: [...headerRows, ...dataRows],
  }
}

/**
 *
 * @param textKeyMaps 表头与表格字段映射
 * @param dataList 表格数据列表
 * @param excelName 导出的表格名字
 */
export function exportExcelDetail(textKeyMaps: TextKeyMap[], dataList: Recordable[], excelName: string) {
  const { headerMerges, cells } = transformDataToSheetCells(dataList, textKeyMaps)
  const worksheet = utils.aoa_to_sheet(cells)
  worksheet['!merges'] = headerMerges
  // 所有单元格居中显示
  Object.values(worksheet).forEach(cell => {
    if (cell.v) {
      if (/\*\*\*(.*?)\*\*\*/.test(cell.v)) {
        cell.s = {
          // font: {
        //   fColor: 'ebebeb',
        // },
          alignment: {
            horizontal: 'center',
            vertical: 'center',
          },
          fill: {
            fgColor: {
              rgb: 'FF6666'
            }
          }
        }
      } else {
        cell.s = {
          alignment: {
            horizontal: 'center',
            vertical: 'center',
          },
        }
      }
    }
  })
  toStyleXlsx({
    filename: `${excelName}.xlsx`,
    worksheet
  })
}