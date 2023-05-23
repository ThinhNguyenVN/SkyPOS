import { ORDER_STATUS } from '@resource/Enums'
import IUser from './IUser'
import IProduct from './IProduct'
import IDiscount from './IDiscount'
import ITransaction from './ITransaction'

export default interface Order {
  id: number
  transactionId: number
  transaction: ITransaction
  code?: string
  status: ORDER_STATUS
  note?: string
  productId: number
  product: IProduct
  quantity: number
  totalStandardPrice: number
  totalPrice: number
  discountId?: number
  discount?: IDiscount
  serviceCharge?: number
  amount: number
  serviceTime?: Date
  createUserId?: number
  createUser?: IUser
  updateUserId?: number
  updateUser?: IUser
  createDate?: Date
  updateDate?: Date
  isDeleted?: boolean
}
