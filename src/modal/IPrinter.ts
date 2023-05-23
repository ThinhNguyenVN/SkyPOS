import IProduct from './IProduct'
import IProductCategory from './IProductCategory'
import IShop from './IShop'
import ITableCategory from './ITableCategory'

export default interface Printer {
  id: number
  name: string
  code?: string
  ipAddress: string
  default: boolean
  shopId: number
  shop: IShop
  createUser?: number
  updateUser?: number
  createDate?: Date
  updateDate?: Date
  isDeleted?: boolean
  tableCategories: ITableCategory[]
  productCategories: IProductCategory[]
  products: IProduct[]
}
