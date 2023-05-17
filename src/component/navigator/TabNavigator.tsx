import React from 'react'
import R from '@resource'
import HistoryScreen from '@screen/HistoryScreen'
import OrderScreen from '@screen/order/OrderScreen'
import TableScreen from '@screen/order/TableScreen'
import AddOrderScreen from '@screen/order/AddOrderScreen'

import { createTabBarNavigator } from '@container/TabBarContainer'

const Tab = createTabBarNavigator()
export default function TabNavigator() {
  return (
    // @ts-ignore
    <Tab.Navigator initialRouteName={R.Constants.INIT_TAB}>
      <Tab.Screen
        name={R.Enums.TABS.Table}
        component={TableScreen}
        options={{
          tabBarLabel: 'Table',
          icon: 'ic-home',
        }}
      />
      <Tab.Screen
        name={R.Enums.TABS.Order}
        component={OrderScreen}
        options={{
          tabBarLabel: 'Order',
          icon: 'clipboard',
        }}
      />
      <Tab.Screen
        name={R.Enums.TABS.History}
        component={HistoryScreen}
        options={{
          tabBarLabel: 'History',
          icon: 'activity',
        }}
      />

      <Tab.Screen
        name={R.Enums.TABS.AddOrder}
        component={AddOrderScreen}
        options={{
          tabBarLabel: '',
        }}
      />
    </Tab.Navigator>
  )
}
