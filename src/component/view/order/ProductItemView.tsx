import { View, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import R from '@resource'
import { AppTouchable, AppImage, AppText, AppQuantityControl } from '@uikit'
import { numberWithCommas } from '@utils/index'
import { IOrder, IProduct } from '@modal'

type ProductItemViewProps = {
  product: IProduct
  order?: IOrder
  onQuantityChange: (quantity: number, product: IProduct, order: IOrder) => void
  onCreateOrder?: (product: IProduct) => void
}

const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'row',
    height: 80,
    width: R.Dimens.MaxWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: R.Colors.Border,
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
  amount: {
    color: R.Colors.Green,
    fontFamily: R.Fonts.Bold,
    fontSize: 16,
  },
})

const ProductItemView = ({
  product,
  onQuantityChange,
  order,
  onCreateOrder,
}: ProductItemViewProps): JSX.Element => {
  const onPress = () => {
    if (!order) {
      !!onCreateOrder && onCreateOrder(product)
    } else {
      onQuantityChange(order.quantity + 1, product, order)
    }
  }

  const renderAmount = () => {
    if (order) {
      return (
        <>
          <AppText>{numberWithCommas(product.price)}</AppText>
          <AppText style={styles.amount}>{numberWithCommas(order.amount)}</AppText>
        </>
      )
    }
    return <AppText>{numberWithCommas(product.price)}</AppText>
  }

  return (
    <AppTouchable
      style={styles.productItem}
      onPress={onPress}
      disabled={!onCreateOrder}
      hitSlop={{ top: 0, bottom: 0, left: 0, right: -60 }}
      multiTouch
    >
      <View style={R.Styles.row}>
        <AppImage url={product.image} style={styles.productImage} defaultImage />
        <View style={styles.productInfo}>
          <AppText>{product.name}</AppText>
          {renderAmount()}
        </View>
      </View>
      {!!order && (
        <AppQuantityControl
          min={0}
          value={order.quantity}
          containerStyle={styles.productQuantity}
          onValueChange={(val) => onQuantityChange(val, product, order)}
        />
      )}
    </AppTouchable>
  )
}

export default React.memo(ProductItemView)
