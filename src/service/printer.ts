import { IOrder, IReceipt, ITransaction } from '@modal'
import BixolonPrinterModule from '@module/BixolonPrinterModule'
import { PAGE_RULER } from '@resource/Constants'
import { COST_TYPE } from '@resource/Enums'
import { getChargeAmount, numberWithCommas, removeAccents } from '@utils/index'
import PrinterUtil, { EndBoldFontCode, StartBoldFontCode } from '@utils/printer'
import moment from 'moment'

export const convertOrderToPrintItemList = (orders: IOrder[]): IReceipt.PrintItemType[] => {
  return orders.map((order) => ({
    code: order?.product?.code,
    name: order.product?.name ?? '',
    quantity: order.quantity.toString(),
    price: numberWithCommas(order.product?.price),
    amount: numberWithCommas(order.amount),
    note: order.note,
  }))
}

const sampleItemData: Array<IReceipt.PrintItemType> = [
  {
    code: '01',
    name: 'Product 01 long long long long long so long long ',
    quantity: '200',
    price: '50000',
    amount: '100000',
    note: 'it duong it da it tum lum',
  },
  {
    code: '02',
    name: 'Product 02 shortname',
    quantity: '2',
    price: '50000',
    amount: '100000',
  },
  {
    code: '03',
    name: 'Product 03 shortname',
    quantity: '2',
    price: '30000',
    amount: '60000',
    note: 'it duong it da it tum lum',
  },
  {
    code: '03',
    name: 'Product 03 shortname',
    quantity: '2',
    price: '3000000',
    amount: '60000',
    note: 'it duong it da it tum lum',
  },
]

const printDataSample = {
  shopName: 'Yen CAFE',
  address: '24A Phan Đăng Lưu, phường 05, quận Bình Thạnh, tp HCM',
  phone: '0845678892',
  title: 'PHIEU THANH TOAN',
  staffName: 'Nguyen Van A',
  date: '20201220 18:00',
  tableName: 'TABLE A',
  listData: sampleItemData,
  listColumn: ['Name', 'Quantity', 'Amount'],
  amount: '1800000',
  tax: '18000',
  service: '20000',
  total: '190000',
  bottomInfo: 'Thank you very muck ',
}

export const printDemo = () => {
  const pageLength = PAGE_RULER['2-inch'].length
  const printerUtil = new PrinterUtil(pageLength)
  const lstColumnObject = printerUtil.createColumnObj(printDataSample.listColumn)
  const arrRow = []
  const shopNameRow = printerUtil.printHeaderRow('YEN CAFE\n')
  const lstItemRow =
    printDataSample &&
    printDataSample.listData
      .map((item) => printerUtil.printItemInfo(item, lstColumnObject))
      .reduce((arr, current) => [...arr, ...current])
  const addressRows = printerUtil.printSimpleRow(printDataSample.address, 'center')
  const blankRows = printerUtil.printSimpleRow('', 'center')
  const titleRows = printerUtil.printSimpleRow(
    `${StartBoldFontCode}${printDataSample.title}${EndBoldFontCode}`,
    'center',
  )
  arrRow.push(shopNameRow, ...addressRows, ...blankRows, ...titleRows, ...blankRows)

  if (printDataSample.staffName) {
    arrRow.push(...printerUtil.printLeftRightRow('Staff:', printDataSample.staffName))
  }
  if (printDataSample.date) {
    arrRow.push(...printerUtil.printLeftRightRow('Date:', printDataSample.date))
  }
  if (printDataSample.tableName) {
    arrRow.push(...printerUtil.printLeftRightRow('Table:', printDataSample.tableName))
  }

  arrRow.push(printerUtil.printLine())
  arrRow.push(printerUtil.printColumnTitle(lstColumnObject))
  arrRow.push(printerUtil.printLine())
  arrRow.push(...lstItemRow)
  arrRow.push(printerUtil.printLine())

  if (printDataSample.amount) {
    arrRow.push(...printerUtil.printLeftRightRow('Amount:', printDataSample.amount))
  }

  if (printDataSample.service) {
    arrRow.push(...printerUtil.printLeftRightRow('Service:', printDataSample.service))
  }

  if (printDataSample.tax) {
    arrRow.push(...printerUtil.printLeftRightRow('Tax:', printDataSample.tax))
  }

  arrRow.push(printerUtil.printLine())
  if (printDataSample.total) {
    arrRow.push(...printerUtil.printLeftRightRow('', printDataSample.total))
  }

  arrRow.push(printerUtil.printLine())
  arrRow.push(...blankRows)

  const bottomInfoRows = printerUtil.printSimpleRow(printDataSample.bottomInfo, 'center')
  arrRow.push(...bottomInfoRows)
  arrRow.push(...blankRows)

  const result = removeAccents(printerUtil.getTextWithBreakLine(arrRow))
  return result
}

const getPrintReceipt = (transaction: ITransaction) => {
  const pageLength = PAGE_RULER['2-inch'].length
  const printerUtil = new PrinterUtil(pageLength)
  const lstColumnObject = printerUtil.createColumnObj(['Name', 'Quantity', 'Amount'])
  const arrRow = []
  const listItem = convertOrderToPrintItemList(transaction.orders ?? [])
  const shopNameRow = printerUtil.printHeaderRow('YEN CAFE \n')
  const lstItemRow =
    listItem
      ?.map((item) => printerUtil.printItemInfo(item, lstColumnObject))
      .reduce((arr, current) => [...arr, ...current]) ?? []
  const addressRows = printerUtil.printSimpleRow(printDataSample.address, 'center')
  const blankRows = printerUtil.printSimpleRow('', 'center')
  const titleRows = printerUtil.printBoldRow(printDataSample.title)
  arrRow.push(shopNameRow, ...addressRows, ...blankRows, titleRows, ...blankRows)

  if (printDataSample.staffName) {
    arrRow.push(...printerUtil.printLeftRightRow('Staff:', printDataSample.staffName))
  }
  if (printDataSample.date) {
    arrRow.push(...printerUtil.printLeftRightRow('Date:', moment(new Date()).format('HH:mm DD/MM')))
  }
  if (printDataSample.tableName) {
    arrRow.push(...printerUtil.printLeftRightRow('Table:', printDataSample.tableName))
  }

  arrRow.push(printerUtil.printLine())
  arrRow.push(printerUtil.printColumnTitle(lstColumnObject))
  arrRow.push(printerUtil.printLine())
  if (lstItemRow?.length) {
    arrRow.push(...lstItemRow)
  }

  arrRow.push(printerUtil.printLine())

  if (transaction.totalProductSellingPrice) {
    arrRow.push(
      ...printerUtil.printLeftRightRow(
        'Amount:',
        numberWithCommas(transaction.totalProductSellingPrice),
      ),
    )
  }

  if (transaction.serviceChargeValue) {
    arrRow.push(
      ...printerUtil.printLeftRightRow(
        'Service:',
        getChargeAmount(
          {
            type: transaction?.serviceChargeType ?? COST_TYPE[COST_TYPE.Amount],
            value: transaction?.serviceChargeValue ?? 0,
          },
          transaction?.totalProductSellingPrice ?? 0,
        ),
      ),
    )
  }

  if (transaction.discountValue) {
    arrRow.push(
      ...printerUtil.printLeftRightRow(
        'Discount:',
        `-${getChargeAmount(
          {
            type: transaction?.discountType ?? COST_TYPE[COST_TYPE.Amount],
            value: transaction?.discountValue ?? 0,
          },
          transaction?.totalProductSellingPrice ?? 0,
        )}`,
      ),
    )
  }

  if (transaction.taxRate) {
    arrRow.push(...printerUtil.printLeftRightRow('Tax:', numberWithCommas(transaction.taxRate)))
  }

  arrRow.push(printerUtil.printLine())
  if (transaction.totalAmount) {
    arrRow.push(...printerUtil.printLeftRightRow('', numberWithCommas(transaction.totalAmount)))
  }

  arrRow.push(printerUtil.printLine())
  arrRow.push(...blankRows)

  const bottomInfoRows = printerUtil.printSimpleRow('Thank you', 'center')
  arrRow.push(...bottomInfoRows)
  arrRow.push(...blankRows)

  const result = removeAccents(printerUtil.getTextWithBreakLine(arrRow))
  return result
}

const getPrintOrders = (orders: IOrder[], transaction: ITransaction) => {
  const pageLength = PAGE_RULER['2-inch'].length
  const printerUtil = new PrinterUtil(pageLength)
  const lstColumnObject = printerUtil.createColumnObj(['Name', 'Quantity'])
  const arrRow = []
  const listItem = convertOrderToPrintItemList(orders ?? [])
  const titleRow = printerUtil.printBoldRow(`Order ${transaction.table?.name ?? ''}`)
  const lstItemRow =
    listItem
      ?.map((item) => printerUtil.printItemInfo(item, lstColumnObject))
      .reduce((arr, current) => [...arr, ...current]) ?? []
  arrRow.push(titleRow)

  if (printDataSample.staffName) {
    arrRow.push(...printerUtil.printLeftRightRow('Staff:', printDataSample.staffName)) // TODO:add staff name after implement login
  }
  if (printDataSample.date) {
    arrRow.push(...printerUtil.printLeftRightRow('Date:', moment(new Date()).format('HH:mm DD/MM')))
  }
  arrRow.push(printerUtil.printLine())
  arrRow.push(printerUtil.printColumnTitle(lstColumnObject))
  arrRow.push(printerUtil.printLine())
  if (lstItemRow?.length) {
    arrRow.push(...lstItemRow)
  }

  arrRow.push(printerUtil.printLine())

  const result = removeAccents(printerUtil.getTextWithBreakLine(arrRow))
  return result
}

export const printReceipt = (transaction: ITransaction) => {
  return BixolonPrinterModule.connectToPrinter('192.168.1.189').then(() => {
    const printData = getPrintReceipt(transaction)
    BixolonPrinterModule.printText(printData)
    BixolonPrinterModule.disconnectPrinter()
  })
}

export const printOrders = (orders: IOrder[], transaction: ITransaction) => {
  return BixolonPrinterModule.connectToPrinter('192.168.1.189').then(() => {
    const printData = getPrintOrders(orders, transaction)
    BixolonPrinterModule.printText(printData)
    BixolonPrinterModule.disconnectPrinter()
  })
}
