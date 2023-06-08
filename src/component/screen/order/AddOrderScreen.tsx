import React, { useEffect, useRef, useState } from 'react'
import ProductCategoryListView from '@view/order/ProductCategoryListView'
import R from '@resource'
import { ScrollView } from 'react-native-gesture-handler'
import { makeStyles } from '@rneui/base'
import ProductListView from '@view/order/ProductListView'
import type { IOrder, IProductCategory } from '@modal'
import { OrderContext } from '@hook/useOrderContext'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from 'src/modal/navigator'
import OrderListView from '@view/order/OrderListView'
import useConfirmGoBack from '@hook/useConfirmGoBack'

const useStyles = makeStyles(() => ({
  container: {
    ...R.Styles.container,
    flexDirection: 'row',
  },
}))

export default function AddOrderScreen() {
  const { setHasChange } = useConfirmGoBack()
  const styles = useStyles()
  const [selectedProductCategory, setSelectedProductCategory] = useState<IProductCategory>()
  const [orders, setOrders] = useState<IOrder[]>([])
  const scrollRef = useRef<ScrollView>(null)
  const route = useRoute<RouteProp<RootStackParamList, 'AddOrder'>>()
  const { transaction } = route.params

  useEffect(() => {
    setHasChange(!!orders.length)
  }, [orders])

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        selectedProductCategory,
        setSelectedProductCategory,
        transaction,
        scrollView: scrollRef,
        setHasChange,
      }}
    >
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
      >
        <ProductCategoryListView />
        <ProductListView products={selectedProductCategory?.products} />
        <OrderListView />
      </ScrollView>
    </OrderContext.Provider>
  )
}
