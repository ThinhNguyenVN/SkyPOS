import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { makeStyles } from '@rneui/base'
import R from '@resource'
import { IOrder, IProduct } from '@modal'
import { AppButton } from '@uikit'
import { useOrderContext } from '@hook/useOrderContext'
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

  const onCategoryPress = () => {
    // @ts-ignore
    scrollView?.current?.scrollTo({ x: 0, animated: true })
  }

  const createOrder = (product: IProduct) => {
    setOrders(updateOrderList(transaction, orders, 1, product, undefined))
  }

  const onQuantityChange = (quantity: number, product: IProduct, order: IOrder) => {
    console.log('onQuantityChange --- ', product.name, quantity)
    setOrders(updateOrderList(transaction, orders, quantity, product, order))
  }

  useEffect(() => {
    console.log(
      'order list change: ---- ',
      orders.map((o) => ({ name: o.product.name, quantity: o.quantity })),
    )
  }, [orders])

  const onNextPress = () => {
    // @ts-ignore
    scrollView?.current?.scrollTo({ x: R.Dimens.MaxWidth * 2, animated: true })
  }

  const renderItem = ({ item }: { item: IProduct }) => {
    const existingOrder = orders.find((o) => o?.product?.id === item.id)
    return (
      <ProductItemView
        product={item}
        order={existingOrder}
        onQuantityChange={onQuantityChange}
        onCreateOrder={createOrder}
      />
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