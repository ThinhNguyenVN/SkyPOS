import type { IReceipt } from '@modal'
import { PAGE_RULER } from '@resource/Constants'

type columnObjectType = {
  name: string
  size: number
  align: string
  index: number
}

const spaceChar = ' '
const SPACE_COLUMN_LENGTH = 2
export const NormalFontCode = '\x1B|1C'
export const LargeFontCode = '\x1B|4C'
export const StartBoldFontCode = '\x1B|bC'
export const EndBoldFontCode = '\x1B|!bC'
export const CenterCode = '\x1B|cA'

export default class PrinterUtil {
  pageLength = PAGE_RULER['3-inch'].length
  columnMaxLength: {
    currency: number
    quantity: number
    left: number
    right: number
  } = {
    currency: 11,
    quantity: 3,
    left: (50 * this.pageLength) / 100,
    right: (50 * this.pageLength) / 100,
  }

  constructor(pageLength?: number) {
    if (pageLength) {
      this.columnMaxLength = {
        currency: 11,
        quantity: 3,
        left: (50 * pageLength) / 100,
        right: (50 * pageLength) / 100,
      }
      this.pageLength = pageLength
    }
  }

  public printLine = (underline?: boolean) => {
    let line = ''

    for (let index = 0; index < this.pageLength; index += 1) {
      line += underline ? '_' : '-'
    }
    return line
  }

  replaceAt = (str: string, replacement: string, index: number) => {
    return str.substring(0, index) + replacement + str.substring(index + replacement.length)
  }

  addSuffixToString = (str: string, maxLength: number, suffix: string) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength - suffix.length) + suffix
    }
    return str
  }

  printSpaceChar = (length: number, char?: string) => {
    let space = ''
    for (let index = 0; index < length; index += 1) {
      space += char || spaceChar
    }
    return space
  }

  public createColumnObj = (listColumn: Array<string>) => {
    let withoutColumnNameSize = 0
    listColumn.forEach((column) => {
      if (column === 'Amount' || column === 'Price') {
        withoutColumnNameSize += this.columnMaxLength.currency
      } else if (column === 'Quantity') {
        withoutColumnNameSize += this.columnMaxLength.quantity
      }
    })
    const columnNameSize = this.pageLength - withoutColumnNameSize

    return listColumn.map((column) => {
      let size = 0
      let align = 'left'
      if (column === 'Amount' || column === 'Price') {
        size = this.columnMaxLength.currency
        align = 'right'
      } else if (column === 'Quantity') {
        size = this.columnMaxLength.quantity
        align = 'center'
      } else if (column === 'Name') {
        size = columnNameSize
        align = 'left'
      }

      return {
        name: column,
        size,
        align,
        index: 0,
      } as columnObjectType
    })
  }

  calculateSpaceLength = (align: string, strLength: number, maxLength: number) => {
    let length = 0
    if (align === 'right') {
      length = maxLength - strLength
    } else if (align === 'center') {
      const centerMax = Math.floor(maxLength / 2)
      const centerStr = Math.floor(strLength / 2)
      const maxAndStrDistance = Math.max(centerMax - centerStr, 0)
      length = maxAndStrDistance
    }
    return length
  }

  printColumn = (text: string, max: number, type = 'left', spaceLength = 0) => {
    let str = text || ''
    let result = this.printSpaceChar(max, ' ')
    let remainStr = ''
    const maxLength = max - spaceLength
    if (str.length > maxLength) {
      remainStr = str.substring(maxLength, str.length)
      str = str.substring(0, maxLength)
    }

    const index = this.calculateSpaceLength(type, str.length, maxLength)
    result = this.replaceAt(result, str, index)

    return {
      column: result,
      remain: remainStr,
    }
  }

  printItemInfo = (item: IReceipt.PrintItemType, lstColumnObject: columnObjectType[]) => {
    let row = this.printSpaceChar(this.pageLength)
    let index = 0

    let overLineText = ''
    if (lstColumnObject?.length) {
      lstColumnObject.forEach((column, i) => {
        const name = item.code ? `${item?.code} ${item?.name}` : item?.name
        const itemKey = column.name.toLowerCase()
        // @ts-ignore
        const text = column.name === 'Name' ? name : item[itemKey]

        const { column: columnValue, remain } = this.printColumn(
          text,
          column.size,
          column.align,
          column.name === 'Name' ? SPACE_COLUMN_LENGTH : 0,
        )

        if (remain && remain.length > 0) {
          overLineText = remain // TH column khac ngoai name qua so luong thi bu day xuong thay name
        }
        row = this.replaceAt(row, columnValue, index)

        if (text) {
          const spaceAlign = this.calculateSpaceLength(column.align, text.length, column.size)
          column.index = Math.floor(
            Math.max(
              column.index,
              index + spaceAlign + Math.min(text.length, columnValue.length) / 2,
            ),
          )
        }
        index += column.size
      })
    }

    const arrRow = [row]
    if (overLineText && overLineText.length > 0) {
      if (item.note) {
        overLineText += `[${item.note}]`
      }
      arrRow.push(this.addSuffixToString(overLineText, this.pageLength, '...'))
    } else if (item.note) {
      arrRow.push(this.addSuffixToString(`[${item.note}]`, this.pageLength, '...'))
    }
    return arrRow
  }

  public printColumnTitle = (lstColumnObject: columnObjectType[]) => {
    let row = this.printSpaceChar(this.pageLength)
    console.log('printColumnTitle ', lstColumnObject, row.length)
    lstColumnObject.forEach((column) => {
      let index = column.index - column.name.length / 2
      if (index + column.name.length > this.pageLength) {
        index = this.pageLength - column.name.length
      }
      console.log('printColumnTitle as index', column.name, index)
      row = this.replaceAt(row, column.name, index)
      console.log('printColumnTitle row', column.name, row)
    })
    return row
  }

  public printLeftRightRow = (left: string, right: string) => {
    let row = this.printSpaceChar(this.pageLength)

    let index = 0
    const { column: leftColumn, remain: leftRemain } = this.printColumn(
      left,
      this.columnMaxLength.left,
      'left',
      SPACE_COLUMN_LENGTH,
    )
    row = this.replaceAt(row, leftColumn, index)

    index = this.columnMaxLength.left
    const { column: rightColumn, remain: rightRemain } = this.printColumn(
      right,
      this.columnMaxLength.right,
      'right',
    )
    row = this.replaceAt(row, rightColumn, index)
    const arrRow = [row]
    if (leftRemain) {
      arrRow.push(this.addSuffixToString(leftRemain, this.pageLength, '...'))
    } else if (rightRemain) {
      const rightRemainColumn = this.printColumn(rightRemain, this.pageLength, 'right').column
      arrRow.push(this.addSuffixToString(rightRemainColumn, this.pageLength, '...'))
    }
    return arrRow
  }

  public printSimpleRow = (text: string, type: string, arrRow: Array<string> = []) => {
    const { column, remain } = this.printColumn(text, this.pageLength, type)
    arrRow.push(column)
    if (remain) {
      this.printSimpleRow(remain, type, arrRow)
    }
    return arrRow
  }

  public getTextWithBreakLine = <T>(arr: Array<T>) => {
    const delimiter = '-,-'

    const stringWithDelimiter = arr.join(delimiter)
    const replacedString = stringWithDelimiter.replace(/-,-/g, '\n').replace(/\n\n/g, '\n')
    return replacedString
  }

  public printHeaderRow = (text: string) => {
    return `${LargeFontCode}${StartBoldFontCode}${CenterCode}${text}${EndBoldFontCode}${NormalFontCode}`
  }
  public printBoldRow = (text: string) => {
    return `${StartBoldFontCode}${CenterCode}${text}${EndBoldFontCode}`
  }
}
