import { PAYMENT_TYPE, ORDER_STATUS, COST_TYPE } from '@resource/Enums'
import IDiscount from './IDiscount'
import IUser from './IUser'
import ITable from './ITable'
import IShop from './IShop'
import IOrder from './IOrder'

export default interface Transaction {
  id?: number
  code?: string
  startTime?: Date
  status?: keyof typeof ORDER_STATUS
  endTime?: Date
  paymentType?: keyof typeof PAYMENT_TYPE
  customerCash?: number
  numberCustomer?: number
  customerName?: string
  totalProduct?: number
  totalOrder?: number
  discountId?: number
  discount?: IDiscount
  discountValue?: number
  discountType?: keyof typeof COST_TYPE
  tableChargeValue?: number
  tableChargeType?: keyof typeof COST_TYPE
  serviceChargeValue?: number
  serviceChargeType?: keyof typeof COST_TYPE
  taxRate?: number
  totalAmount?: number
  totalProductSellingPrice?: number
  invoiceCount?: number
  tableId?: number
  table?: ITable
  orders?: IOrder[]
  shopId?: number
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
