import IDiscount from './IDiscount'
import IPoint from './IPoint'
import IPrinter from './IPrinter'
import IProductCategory from './IProductCategory'
import ITableCategory from './ITableCategory'
import ITransaction from './ITransaction'
import IUser from './IUser'

export default interface IShop {
  id: number
  code?: string
  name: string
  address: string
  country?: string
  email?: string
  tel?: string
  fax?: string
  taxCode?: string
  timeZone?: string
  description?: string
  logo?: string
  taxAmount?: number
  tableCharge?: number
  serviceCharge?: number
  openTime?: string
  closeTime?: string
  currencyExchange?: string
  receptLimit?: number
  language?: string
  longitude?: number
  latitude?: number
  createDate?: Date
  updateDate?: Date
  users: IUser[]
  tableCategories: ITableCategory[]
  productCategories: IProductCategory[]
  printers: IPrinter[]
  points: IPoint[]
  discounts: IDiscount[]
  transactions: ITransaction[]
}
