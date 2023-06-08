import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './component/navigator/RootNavigator'
import RNBootSplash from 'react-native-bootsplash'
import { Host } from 'react-native-portalize'
import { QueryClient, QueryClientProvider } from 'react-query'
import AlertContainer from '@container/AlertContainer'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const queryClient = new QueryClient()

function App(): JSX.Element {
  useEffect(() => {
    RNBootSplash.hide({ fade: true })
  })
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AlertContainer>
          <Host>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </Host>
        </AlertContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}

export default App
