import { PAYMENT_TYPE } from '@resource/Enums'
import IDiscount from './IDiscount'
import IUser from './IUser'
import ITable from './ITable'
import IShop from './IShop'
import IOrder from './IOrder'

export default interface Transaction {
  id?: number
  code?: string
  startTime?: Date
  endTime?: Date
  paymentType?: PAYMENT_TYPE
  customerCash?: number
  numberCustomer?: number
  totalProduct?: number
  totalOrder?: number
  discountId?: number
  discount?: IDiscount
  tableCharge?: number
  serviceCharge?: number
  taxRate?: number
  totalAmount?: number
  totalProductSellingPrice?: number
  invoiceCount?: number
  tableId?: number
  table?: ITable
  orders?: IOrder[]
  shopId: number
  shop?: IShop

  changeTableUserId?: number
  changeTableUser?: IUser
  finishUserId?: number
  finishUser?: IUser
  createUserId?: number
  createUser?: IUser
  updateUserId?: number
  updateUser?: IUser
  createDate?: Date
  updateDate?: Date
  isDeleted?: boolean
}
