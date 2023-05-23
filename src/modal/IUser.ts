import { GENDER, LOGIN_TYPE, PACKAGE, ROLE } from '@resource/Enums'
import IOrder from './IOrder'
import IShop from './IShop'
import ITransaction from './ITransaction'

export default interface User {
  id: number
  code?: string
  username: string
  password: string
  address?: string
  country?: string
  email: string
  tel?: string
  avatar?: string
  token?: string
  loginType: LOGIN_TYPE
  fullname?: string
  birthday?: string
  gender?: GENDER
  description?: string
  activeDate?: Date
  lastLogin?: Date
  packageName: PACKAGE
  isOnline?: boolean
  isActive?: boolean
  role: ROLE
  shopId: number
  shop: IShop
  createDate?: Date
  updateDate?: Date

  finishTransactions: ITransaction[]
  changeTableTransactions: ITransaction[]
  createTransactions: ITransaction[]
  updateTransactions: ITransaction[]
  createOrders: IOrder[]
  updateOrders: IOrder[]
}
