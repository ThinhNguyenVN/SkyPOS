import { StackNavigationProp } from '@react-navigation/stack'

export type RootStackParamList = {
  MainTab: undefined
  Home: undefined
  Detail: { id: number }
  AddOrderScreen: undefined
}

export type RootNavigationProp = StackNavigationProp<RootStackParamList>
