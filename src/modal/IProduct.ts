import IDiscount from './IDiscount'
import IOrder from './IOrder'
import IPoint from './IPoint'
import IPrinter from './IPrinter'
import IProductCategory from './IProductCategory'

export default interface Product {
  id: number
  name: string
  description?: string
  code?: string
  price: number
  standardPrice?: number
  image?: string
  outOfStock?: number
  startTime?: Date
  endTime?: Date
  point?: IPoint
  pointId?: number
  printerId?: number
  printer?: IPrinter
  categories?: IProductCategory[]
  priority?: number
  discountId?: number
  discount?: IDiscount
  isDisplay?: boolean
  displayOrder?: number
  createUserId?: number
  updateUserId?: number
  createDate?: Date
  updateDate?: Date
  isDeleted?: boolean
  Order?: IOrder[]
}
