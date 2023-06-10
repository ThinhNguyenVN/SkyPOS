import { View } from 'react-native'
import React, { useState } from 'react'
import { makeStyles } from '@rneui/base'
import R from '@resource'
import type { IOrder } from '@modal'
import Animated, {
  Layout,
  SlideInLeft,
  SlideOutLeft,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated'
import { useGetOrders } from '@hook/userOrder'
import OrderItemView from '@view/order/OrderItemView'
import { useDidUpdateEffect } from '@hook/index'
import { useIsFocused } from '@react-navigation/native'
import { getTakeoutName } from '@utils/index'

const useStyles = makeStyles(() => ({
  listContainer: {
    paddingBottom: 100,
  },
  container: {
    ...R.Styles.container,
  },
  bottom: {
    ...R.Styles.bottom,
    height: 80,
    paddingBottom: 20,
  },

  bottomButton: {
    width: (R.Dimens.MaxWidth - 54) / 2,
  },
  amountView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  amount: {
    fontFamily: R.Fonts.Bold,
    color: R.Colors.Green,
    fontSize: 20,
    marginLeft: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    zIndex: 10,
  },
}))

export default function OrderScreen() {
  const styles = useStyles()

  const [refreshing, setRefreshing] = useState(false)
  const { data: orders, refetch } = useGetOrders()
  const isFocused = useIsFocused()

  useDidUpdateEffect(() => {
    if (isFocused) {
      refetch()
    }
  }, [isFocused])

  const onRefresh = () => {
    setRefreshing(true)
    refetch().finally(() => {
      setRefreshing(false)
    })
  }

  const renderItem = ({ item }: { item: IOrder }) => {
    return (
      <Animated.View layout={Layout.springify()} entering={SlideInLeft} exiting={SlideOutLeft}>
        <OrderItemView
          order={item}
          tableName={item?.transaction?.table?.name ?? getTakeoutName(item?.transaction)}
        />
      </Animated.View>
    )
  }

  const renderCell = React.useCallback(
    (props: any) => (
      <Animated.View {...props} layout={Layout.springify()} entering={ZoomIn} exiting={ZoomOut} />
    ),
    [],
  )

  return (
    <View style={styles.container}>
      <Animated.FlatList
        itemLayoutAnimation={Layout.delay(200)}
        data={orders}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
        keyExtractor={(item) => `order-item-${item?.id}`}
        CellRendererComponent={renderCell}
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}
