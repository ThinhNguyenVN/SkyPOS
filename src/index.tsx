import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './component/navigator/RootNavigator'
import RNBootSplash from 'react-native-bootsplash'
import { Host } from 'react-native-portalize'

function App(): JSX.Element {
  useEffect(() => {
    RNBootSplash.hide({ fade: true })
  })
  return (
    <Host>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Host>
  )
}

export default App
