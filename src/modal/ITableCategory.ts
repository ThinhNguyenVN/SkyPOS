/* @flow */
import IPrinter from './IPrinter'
import IShop from './IShop'
import type ITable from './ITable'
export default interface ITableCategory {
  id?: number
  name?: string
  code?: string
  tableCount?: number
  printerId?: number
  printer?: IPrinter
  shopId?: number
  shop?: IShop
  tables?: ITable[]
}
