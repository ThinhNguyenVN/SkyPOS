import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import R from './resource'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './component/navigator/RootNavigator'
import RNBootSplash from 'react-native-bootsplash'

function App(): JSX.Element {
  useEffect(() => {
    RNBootSplash.hide({ fade: true })
  })
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}

export default App
