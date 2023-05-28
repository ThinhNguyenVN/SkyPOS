import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { makeStyles } from '@rneui/base'
import R from '@resource'
import { IOrder, IProduct } from '@modal'
import { AppButton, AppImage, AppQuantityControl, AppText } from '@uikit'
import { numberWithCommas } from '@utils/index'
import { useOrderContext } from '@hook/useOrderContext'

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
    ...R.Styles.bottomWithoutBorder,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButton: {
    width: (R.Dimens.MaxWidth - 54) / 2,
  },
}))

type ProductListViewProps = {
  products?: IProduct[]
}

export default function ProductListView({ products }: ProductListViewProps) {
  const styles = useStyles()
  const { transaction, orders, setOrders, scrollView } = useOrderContext()

  const onValueChange = (quantity: number, product: IProduct) => {
    const tmpOrders = [...orders]
    const existingOrder =
      !!tmpOrders?.length && tmpOrders.find((o) => o?.product?.id === product.id)
    console.log('existingOrder --- ', existingOrder, quantity, product.id)
    if (!existingOrder) {
      const order: IOrder = {
        transactionId: 1, // TODO:  transaction ID
        product: product,
        quantity,
        amount: quantity * product.price,
        totalPrice: quantity * product.price,
        totalStandardPrice: quantity * (product.standardPrice ?? 0),
        status: R.Enums.ORDER_STATUS.Pending,
      }
      tmpOrders.push(order)
    } else {
      existingOrder.quantity = quantity
      existingOrder.amount = quantity * product.price
      existingOrder.totalPrice = quantity * product.price
      existingOrder.totalStandardPrice = quantity * (product.standardPrice ?? 0)
    }
    console.log(
      'tmpOrders --- ',
      tmpOrders.map((i) => ({ id: i.product?.id, name: i.product?.name, quanlity: i.quantity })),
    )

    setOrders(tmpOrders.filter((o) => o.quantity !== 0))
  }

  const onCategoryPress = () => {
    scrollView?.current?.scrollTo({ x: 0, animated: true })
  }

  const onNextPress = () => {
    scrollView?.current?.scrollTo({ x: R.Dimens.MaxWidth * 2, animated: true })
  }

  const renderItem = ({ item }: { item: IProduct }) => {
    return (
      <View style={styles.productItem}>
        <View style={R.Styles.row}>
          <AppImage url={item.image} style={styles.productImage} defaultImage />
          <View style={styles.productInfo}>
            <AppText>{item.name}</AppText>
            <AppText>{numberWithCommas(item.price)}</AppText>
          </View>
        </View>
        <AppQuantityControl
          min={0}
          containerStyle={styles.productQuantity}
          onValueChange={(val) => onValueChange(val, item)}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
        keyExtractor={(item) => `product-item-${item.id}`}
      />
      <View style={styles.bottom}>
        <AppButton title={'Category'} icon="chevron-left" iconLeft onPress={onCategoryPress} />
        <AppButton
          title={'Next'}
          type={'primary'}
          icon="chevron-right"
          iconRight
          onPress={onNextPress}
        />
      </View>
    </View>
  )
}
