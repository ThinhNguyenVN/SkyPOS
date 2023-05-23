import IProduct from './IProduct'
import IShop from './IShop'

export default interface Point {
  id: number
  name: string
  value: number
  shopId: number
  shop: IShop
  products: IProduct[]
}
