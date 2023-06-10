import { COST_TYPE } from '@resource/Enums'
import type IDiscount from './IDiscount'
import type IOrder from './IOrder'
import type IPoint from './IPoint'
import type IPrinter from './IPrinter'
import type IProduct from './IProduct'
import type IProductCategory from './IProductCategory'
import type IShop from './IShop'
import type ITable from './ITable'
import type ITableCategory from './ITableCategory'
import type ITransaction from './ITransaction'
import type IUser from './IUser'
import type * as INavigator from './navigator'

export interface IChargeAmount {
  value: number
  type: string
}

export {
  ITable,
  ITableCategory,
  IShop,
  IUser,
  IDiscount,
  IPoint,
  IPrinter,
  IProductCategory,
  IProduct,
  IOrder,
  ITransaction,
  INavigator,
}
