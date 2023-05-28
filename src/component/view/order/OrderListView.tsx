import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { makeStyles } from '@rneui/base'
import R from '@resource'
import type { IOrder } from '@modal'
import { AppButton, AppImage, AppQuantityControl, AppText } from '@uikit'
import { numberWithCommas } from '@utils/index'
import { useOrderContext } from '@hook/useOrderContext'
import { FAB } from '@rneui/themed'

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
  productItem: {
    flexDirection: 'row',
    height: 80,
    width: R.Dimens.MaxWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productImage: {
    width: 80,
    height: 80,
  },
  productInfo: {
    padding: 8,
  },
  productQuantity: {
    paddingRight: 8,
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
  const { orders, setOrders, scrollView } = useOrderContext()

  useEffect(() => {
    console.log(
      'orders changed : ',
      orders.map((i) => ({ name: i.product?.name, quanlity: i.quantity })),
    )
  }, [orders])

  const onValueChange = (val) => {}

  const onAddMorePress = () => {
    scrollView?.current?.scrollTo({ x: 0, animated: true })
  }
  const onOrderPress = () => {}
  const onCancelPress = () => {}

  const renderItem = ({ item }: { item: IOrder }) => {
    return (
      <View style={styles.productItem}>
        <View style={R.Styles.row}>
          <AppImage url={item?.product?.image} style={styles.productImage} defaultImage />
          <View style={styles.productInfo}>
            <AppText>{item?.product?.name}</AppText>
            <AppText>{numberWithCommas(item?.product?.price)}</AppText>
          </View>
        </View>
        <AppQuantityControl
          min={0}
          value={item.quantity}
          containerStyle={styles.productQuantity}
          onValueChange={onValueChange}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FAB
        icon={<R.Icon name={'plus'} size={24} color={'white'} />}
        color={R.Colors.Primary}
        style={styles.addButton}
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
