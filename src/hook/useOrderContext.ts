import { IOrder, IProductCategory, ITransaction } from '@modal'
import { Ref, createContext, useContext } from 'react'
import { ScrollView } from 'react-native'

export type OrderContextType = {
  transaction?: ITransaction
  orders: IOrder[]
  setOrders: (orders: IOrder[]) => void
  selectedProductCategory?: IProductCategory
  setSelectedProductCategory?: (selector: IProductCategory) => void
  scrollView?: Ref<ScrollView>
  setHasChange?: (hasChange: boolean, cb?: () => void) => void
}

const initContext = {
  transaction: undefined,
  orders: [],
  selectedProductCategory: undefined,
  setOrders: () => {},
  scrollView: undefined,
  setHasChange: () => {},
}

export const OrderContext = createContext<OrderContextType>(initContext)

export const useOrderContext = () => useContext(OrderContext)
