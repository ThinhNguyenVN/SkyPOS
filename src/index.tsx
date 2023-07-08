import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './component/navigator/RootNavigator'
import RNBootSplash from 'react-native-bootsplash'
import { Host } from 'react-native-portalize'
import { QueryClient, QueryClientProvider } from 'react-query'
import AlertContainer from '@container/AlertContainer'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'
import BixolonPrinterModule from '@module/BixolonPrinterModule'

const queryClient = new QueryClient()

function App(): JSX.Element {
  useEffect(() => {
    RNBootSplash.hide({ fade: true })
  })

  useEffect(() => {
    BixolonPrinterModule.helloPrinter('ay yo printer bixolon')
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AlertContainer>
          <Host>
            <NavigationContainer>
              <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
              <RootNavigator />
            </NavigationContainer>
          </Host>
        </AlertContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}

export default App
