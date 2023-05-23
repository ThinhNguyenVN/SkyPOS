import IPrinter from './IPrinter'
import IProduct from './IProduct'
import IShop from './IShop'

export default interface ProductCategory {
  id: number
  name: string
  code?: string
  image?: string
  printerId?: number
  printer?: IPrinter
  isDisplay: boolean
  products: IProduct[]
  shopId: number
  shop: IShop
  displayOrder?: number
  createUserId?: number
  updateUserId?: number
  createDate?: Date
  updateDate?: Date
  isDeleted?: boolean
}
