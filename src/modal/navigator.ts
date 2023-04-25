import { StackNavigationProp } from '@react-navigation/stack'

export type RootStackParamList = {
  Home: undefined
  Detail: { id: number }
}

export type RootNavigationProp = StackNavigationProp<RootStackParamList>
