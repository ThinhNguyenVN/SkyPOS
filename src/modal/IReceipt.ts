/* @flow */

export type PrintItemType = {
  code?: string
  name: string
  quantity?: string
  price?: string
  amount?: string
  note?: string
}

export type PrintDataType = {
  logo?: string
  shopName?: string
  address?: string
  phone?: string
  title: string
  staffName?: string
  date?: string
  tableName?: string
  listData: Array<PrintItemType>
  listColumn: Array<string>
  amount: string
  tax: string
  service: string
  total: string
  bottomInfo: string
}
