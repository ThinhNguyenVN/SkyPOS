import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from '../../modal/navigator'
import HomeScreen from '../screen/Home'
import DetailScreen from '../screen/Detail'

const Stack = createStackNavigator<RootStackParamList>()
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  )
}

export default RootNavigator
