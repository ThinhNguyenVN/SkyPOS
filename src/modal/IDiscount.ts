import IOrder from './IOrder'
import IProduct from './IProduct'
import IShop from './IShop'
import ITransaction from './ITransaction'

export default interface Discount {
  id: number
  name: string
  value: number
  shopId: number
  shop: IShop
  products: IProduct[]
  transactions: ITransaction[]
  orders: IOrder[]
}
