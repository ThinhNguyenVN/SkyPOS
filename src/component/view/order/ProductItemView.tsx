import { View, StyleSheet } from 'react-native'
import React from 'react'
import R from '@resource'
import { AppTouchable, AppImage, AppText, AppQuantityControl } from '@uikit'
import { numberWithCommas } from '@utils/index'
import { IOrder, IProduct } from '@modal'

type ProductItemViewProps = {
  product: IProduct
  order?: IOrder
  onQuantityChange?: (quantity: number, product: IProduct, order: IOrder) => void
  onCreateOrder?: (product: IProduct) => void
}

const ProductQuantityWidth = 116
const ImageSize = 80
const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'row',
    height: ImageSize,
    width: R.Dimens.MaxWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: R.Colors.Border,
  },
  productView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  productImage: {
    width: ImageSize,
    height: ImageSize,
  },
  productInfo: {
    padding: 8,
  },
  productQuantity: {
    width: ProductQuantityWidth,
  },
  amount: {
    color: R.Colors.Green,
    fontFamily: R.Fonts.Bold,
    fontSize: 16,
    lineHeight: 20,
  },
  priceSmallText: {
    ...R.Styles.h5,
  },
  priceView: {
    maxWidth: R.Dimens.MaxWidth - ProductQuantityWidth - ImageSize,
  },
  productName: {
    ...R.Styles.h4,
    width: R.Dimens.MaxWidth - ImageSize,
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
    } else if (!!onQuantityChange) {
      onQuantityChange(order.quantity + 1, product, order)
    }
  }

  const renderAmount = () => {
    if (order) {
      return (
        <View style={styles.priceView}>
          <AppText style={styles.priceSmallText} numberOfLines={2}>
            {numberWithCommas(product.price)}
          </AppText>
          <AppText style={styles.amount}>{numberWithCommas(order.amount)}</AppText>
        </View>
      )
    }
    return <AppText style={styles.priceSmallText}>{numberWithCommas(product.price)}</AppText>
  }

  return (
    <AppTouchable
      style={styles.productItem}
      onPress={onPress}
      disabled={!onCreateOrder}
      hitSlop={{ top: 0, bottom: 0, left: 0, right: -60 }}
      multiTouch
    >
      <View style={styles.productView}>
        <AppImage url={product.image} style={styles.productImage} defaultImage />
        <View style={styles.productInfo}>
          <AppText style={styles.productName} numberOfLines={1}>
            {product.name}
          </AppText>
          {renderAmount()}
        </View>
      </View>
      {!!order && !!onQuantityChange && (
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
