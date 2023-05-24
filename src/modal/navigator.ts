import { StackNavigationProp } from '@react-navigation/stack'
import type ITransaction from './ITransaction'

export type RootStackParamList = {
  MainTab: undefined
  Home: undefined
  Detail: { id: number }
  StartTransaction: undefined
  AddOrder: { transaction: ITransaction }
  Chat: undefined
}

export type RootNavigationProp = StackNavigationProp<RootStackParamList>
