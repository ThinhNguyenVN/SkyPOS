import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './component/navigator/RootNavigator'
import RNBootSplash from 'react-native-bootsplash'
import { Host } from 'react-native-portalize'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App(): JSX.Element {
  useEffect(() => {
    RNBootSplash.hide({ fade: true })
  })
  return (
    <QueryClientProvider client={queryClient}>
      <Host>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </Host>
    </QueryClientProvider>
  )
}

export default App
