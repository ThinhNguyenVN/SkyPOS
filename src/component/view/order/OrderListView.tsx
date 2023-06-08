/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { makeStyles } from '@rneui/base'
import R from '@resource'
import type { INavigator, IOrder, IProduct } from '@modal'
import { AppButton, AppText } from '@uikit'
import { numberWithCommas } from '@utils/index'
import { useOrderContext } from '@hook/useOrderContext'
import { FAB } from '@rneui/themed'
import { getTotalAmount, updateOrderList } from '@utils/order'
import ProductItemView from './ProductItemView'
import Animated, {
  Layout,
  SlideInLeft,
  SlideOutLeft,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated'
import { useCreateOrders } from '@hook/userOrder'
import { useNavigation } from '@react-navigation/native'
const useStyles = makeStyles(() => ({
  listContainer: {
    paddingBottom: 150,
  },
  container: {
    ...R.Styles.container,
    minHeight: 200,
    width: R.Dimens.MaxWidth,
    borderRightColor: R.Colors.Border,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  bottom: {
    ...R.Styles.bottom,
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
    bottom: 100,
    left: 20,
    zIndex: 10,
  },
}))

export default function OrderListView() {
  const styles = useStyles()
  const createOrders = useCreateOrders()
  const navigation = useNavigation<INavigator.RootNavigationProp>()
  const { orders, setOrders, scrollView, transaction, setHasChange } = useOrderContext()
  const [loading, setLoading] = useState(false)

  const onQuantityChange = (quantity: number, product: IProduct, order: IOrder) => {
    setOrders(updateOrderList(transaction, orders, quantity, product, order))
  }

  const onAddMorePress = () => {
    // @ts-ignore
    scrollView?.current?.scrollTo({ x: 0, animated: true })
  }

  const renderItem = ({ item }: { item: IOrder }) => {
    if (!item?.product) {
      return null
    }
    return (
      <Animated.View layout={Layout.springify()} entering={SlideInLeft} exiting={SlideOutLeft}>
        <ProductItemView product={item.product} order={item} onQuantityChange={onQuantityChange} />
      </Animated.View>
    )
  }

  const renderCell = React.useCallback(
    (props: any) => (
      <Animated.View {...props} layout={Layout.springify()} entering={ZoomIn} exiting={ZoomOut} />
    ),
    [],
  )

  const onCancelPress = () => {
    navigation.goBack()
  }
  const onOrderPress = () => {
    setLoading(true)
    createOrders
      .mutateAsync(orders)
      .then((results) => {
        if (results) {
          setHasChange &&
            setHasChange(false, () => {
              navigation.goBack()
            })
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

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
        keyExtractor={(item) => `order-item-${item?.product?.id}`}
        CellRendererComponent={renderCell}
      />
      <View style={styles.bottom}>
        <View style={styles.amountView}>
          <AppText style={R.Styles.h5}>Amount: </AppText>
          <AppText style={styles.amount}>{numberWithCommas(getTotalAmount(orders))}</AppText>
        </View>

        <View style={R.Styles.rowSpaceBetween}>
          <AppButton title={'Cancel'} type={'destructive'} onPress={onCancelPress} />
          <AppButton
            title={'Done'}
            type={'primary'}
            onPress={onOrderPress}
            loading={loading}
            disabled={!orders?.length}
          />
        </View>
      </View>
    </View>
  )
}
