import { View } from 'react-native'
import React from 'react'
import ProductCategoryView from '@view/order/ProductCategoryView'
import R from '@resource'

export default function AddOrderScreen() {
  return (
    <View style={R.Styles.container}>
      <ProductCategoryView />
    </View>
  )
}
