import React from 'react'
import {
  CardStyleInterpolators,
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack'
import { RootStackParamList } from '../../modal/navigator'
import HomeScreen from '@screen/Home'
import DetailScreen from '@screen/Detail'
import HeaderView, { LeftButton, RightButton } from '@view/HeaderView'
import TabNavigator from './TabNavigator'
import AddOrderScreen from '@screen/order/AddOrderScreen'
import ChatScreen from '@screen/ChatScreen'
import { Platform } from 'react-native'

const Stack = createStackNavigator<RootStackParamList>()

function DefaultHeaderOptions(): StackNavigationOptions {
  return {
    cardShadowEnabled: false,
    gestureEnabled: false,
    header: (navigation) => (
      <HeaderView
        // @ts-ignore
        left={navigation.options?.headerLeft}
        // @ts-ignore
        right={navigation.options?.headerRight}
        title={navigation.options?.title}
      />
    ),
    headerLeftContainerStyle: {
      paddingHorizontal: 12,
    },
    // @ts-ignore
    animation: 'slide_from_right',
  }
}

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={DefaultHeaderOptions()}>
      <Stack.Screen name="MainTab" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerLeft: () => (
            <LeftButton
              icon={'menu'}
              onPress={() => {
                console.log('PRESS MENU')
              }}
            />
          ),
          headerRight: () => (
            <RightButton
              icon={'message-circle'}
              onPress={() => {
                console.log('PRESS MESSAGE')
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: 'Detail',
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Message',
        }}
      />
      <Stack.Screen
        name="AddOrderScreen"
        component={AddOrderScreen}
        options={{
          title: 'New Order',
          headerLeft: () => <LeftButton icon={'ic-close'} />,
          cardStyleInterpolator: Platform.select({
            ios: CardStyleInterpolators.forVerticalIOS,
            android: CardStyleInterpolators.forBottomSheetAndroid,
          }),
        }}
      />
    </Stack.Navigator>
  )
}

export default RootNavigator
