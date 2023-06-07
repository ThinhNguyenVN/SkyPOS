import { StyleSheet, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { makeStyles } from '@rneui/base'
import R from '@resource'
import type { INavigator, IOrder, IProduct } from '@modal'
import { AppButton, AppText } from '@uikit'
import { getAppCode, numberWithCommas } from '@utils/index'
import { useOrderContext } from '@hook/useOrderContext'
import { FAB } from '@rneui/themed'
import { getTotalAmount, updateOrderList } from '@utils/order'
import Animated, {
  Layout,
  SlideInLeft,
  SlideOutLeft,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated'
import { useGetTransaction } from '@hook/userOrder'
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import ProductItemView from '@view/order/ProductItemView'
import { RootStackParamList } from 'src/modal/navigator'
import { LeftButton } from '@view/HeaderView'
import OrderItemView from '@view/order/OrderItemView'
import { useDidUpdateEffect } from '@hook/index'

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

export default function OrderListScreen() {
  const styles = useStyles()
  const navigation = useNavigation<INavigator.RootNavigationProp>()
  const route = useRoute<RouteProp<RootStackParamList, 'OrderList'>>()
  const { transaction: transactionParam } = route.params
  const [refreshing, setRefreshing] = useState(false)
  const { data: transaction, refetch } = useGetTransaction(transactionParam?.id)
  const isFocused = useIsFocused()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LeftButton icon={'ic-cart'} onPress={onAddToCart} />,
      title: transaction?.code ?? getAppCode('T', transaction?.id ?? 0),
    })
  }, [navigation, transaction])

  useDidUpdateEffect(() => {
    if (isFocused) {
      refetch()
    }
  }, [isFocused])

  const onAddToCart = () => {
    if (transaction) {
      navigation.navigate('AddOrder', { transaction })
    }
  }

  const orders = useMemo(() => {
    if (transaction) {
      return transaction.orders
    } else {
      return transactionParam.orders
    }
  }, [transactionParam, transaction])

  const onAddMorePress = () => {
    if (transaction) {
      navigation.navigate('AddOrder', { transaction })
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    refetch().finally(() => {
      setRefreshing(false)
    })
  }

  const renderItem = ({ item }: { item: IOrder }) => {
    return (
      <Animated.View layout={Layout.springify()} entering={SlideInLeft} exiting={SlideOutLeft}>
        <OrderItemView order={item} />
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
      <FAB
        icon={<R.Icon name={'plus'} size={24} color={'white'} />}
        color={R.Colors.Primary}
        style={styles.addButton}
        onPress={onAddMorePress}
      />
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
      <View style={styles.bottom}>
        <View style={styles.amountView}>
          <AppText style={R.Styles.h5}>Amount: </AppText>
          <AppText style={styles.amount}>{numberWithCommas(getTotalAmount(orders ?? []))}</AppText>
        </View>
      </View>
    </View>
  )
}
