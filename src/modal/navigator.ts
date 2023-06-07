import { StackNavigationProp } from '@react-navigation/stack'
import type ITransaction from './ITransaction'
import ITable from './ITable'

export type RootStackParamList = {
  MainTab: undefined
  Home: undefined
  Detail: { id: number }
  StartTransaction: { table?: ITable }
  AddOrder: { transaction: ITransaction }
  Chat: undefined
  TransactionDetail: { transactionId: number }
  OrderList: { transaction: ITransaction }
}

export type RootNavigationProp = StackNavigationProp<RootStackParamList>
