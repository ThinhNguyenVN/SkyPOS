import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { makeStyles } from '@rneui/base'
import R from '@resource'
import type { IOrder, IProduct } from '@modal'
import { AppButton, AppText } from '@uikit'
import { numberWithCommas } from '@utils/index'
import { useOrderContext } from '@hook/useOrderContext'
import { FAB } from '@rneui/themed'
import { updateOrderList } from '@utils/order'
import ProductItemView from './ProductItemView'

const useStyles = makeStyles(() => ({
  listContainer: {
    ...R.Styles.container,
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
    marginBottom: 16,
  },
  amount: {
    fontFamily: R.Fonts.Bold,
    color: R.Colors.Green,
    fontSize: 20,
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
  const { orders, setOrders, scrollView, transaction } = useOrderContext()

  const onQuantityChange = (quantity: number, product: IProduct, order: IOrder) => {
    setOrders(updateOrderList(transaction, orders, quantity, product, order))
  }

  const onAddMorePress = () => {
    // @ts-ignore
    scrollView?.current?.scrollTo({ x: 0, animated: true })
  }

  const renderItem = ({ item }: { item: IOrder }) => {
    return (
      <ProductItemView product={item.product} order={item} onQuantityChange={onQuantityChange} />
    )
  }

  const onCancelPress = () => {}
  const onOrderPress = () => {}

  return (
    <View style={styles.container}>
      <FAB
        icon={<R.Icon name={'plus'} size={24} color={'white'} />}
        color={R.Colors.Primary}
        style={styles.addButton}
        onPress={onAddMorePress}
      />
      <FlatList
        data={orders}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
        keyExtractor={(item) => `order-item-${item?.product?.id}`}
      />
      <View style={styles.bottom}>
        <View style={styles.amountView}>
          <AppText style={R.Styles.h5}>Amount: </AppText>
          <AppText style={styles.amount}>{numberWithCommas(100000)}</AppText>
        </View>

        <View style={R.Styles.rowSpaceBetween}>
          <AppButton title={'Done'} type={'primary'} onPress={onOrderPress} />
          <AppButton title={'Cancel'} type={'destructive'} onPress={onCancelPress} />
        </View>
      </View>
    </View>
  )
}
