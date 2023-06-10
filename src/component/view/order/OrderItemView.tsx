import { View, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import R from '@resource'
import { AppImage, AppText } from '@uikit'
import { numberWithCommas } from '@utils/index'
import { IOrder } from '@modal'
import { Button, ListItem } from '@rneui/themed'
import moment from 'moment'
import { useUpdateOrder } from '@hook/userOrder'
import { ORDER_STATUS } from '@resource/Enums'

type OrderItemViewProps = {
  order: IOrder
  tableName?: string
}

const ItemSize = 80
const AmountWidth = 90
const styles = StyleSheet.create({
  productItem: {
    height: ItemSize,
    width: R.Dimens.MaxWidth,
    paddingLeft: 0,
  },
  productView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  productImage: {
    width: ItemSize,
    height: ItemSize,
  },
  markImage: {
    width: ItemSize,
    height: ItemSize,
    zIndex: 20,
    position: 'absolute',
    top: 15,
    left: 20,
  },
  productInfo: {
    padding: 8,
    width: R.Dimens.MaxWidth - ItemSize - 30 - AmountWidth - 16,
  },

  amount: {
    color: R.Colors.Green,
    fontFamily: R.Fonts.Bold,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'right',
    width: AmountWidth,
  },
  itemText: {
    ...R.Styles.h4,
    lineHeight: 20,
  },
  note: {
    ...R.Styles.h5,
  },

  productName: {
    ...R.Styles.h4,
    width: '100%',
  },
  itemButton: {
    height: '80%',
    width: 50,
    backgroundColor: 'green',
    marginLeft: 8,
    marginVertical: 8,
  },
  itemMenu: {
    flexDirection: 'row',
  },
  rightMenu: {
    width: 130,
  },
  quantity: {
    fontSize: 16,
    color: R.Colors.Green,
    textAlign: 'right',
    width: 30,
    marginRight: 8,
  },
  icon: {
    paddingRight: 2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  time: {
    ...R.Styles.h5,
    lineHeight: 18,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: -30,
    zIndex: 3,
    backgroundColor: R.Colors.Red,
    opacity: 0.1,
  },
})

const OrderItemView = ({ order, tableName }: OrderItemViewProps): JSX.Element => {
  const updateOrder = useUpdateOrder()
  const [loading, setLoading] = useState(false)
  const renderInfo = () => {
    return (
      <View style={styles.productInfo}>
        {!!tableName && <AppText style={styles.productName} text={tableName} />}

        <AppText style={styles.productName} numberOfLines={2}>
          {order.product?.name}
        </AppText>
        <AppText style={styles.itemText} numberOfLines={1}>
          {numberWithCommas(order?.product?.price)}
        </AppText>
        {!!order?.note && (
          <AppText style={styles.note} numberOfLines={1}>
            {order.note}
          </AppText>
        )}
      </View>
    )
  }

  const onUpdateOrderStatus = (status: keyof typeof ORDER_STATUS, reset: () => void) => () => {
    if (order?.id) {
      setLoading(true)
      updateOrder
        .mutateAsync({ order: { status, quantity: order.quantity }, id: order.id })
        .then(() => {
          reset()
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const renderRightMenu = (reset: () => void) => {
    return (
      <View style={styles.itemMenu}>
        <Button
          loading={loading}
          onPress={onUpdateOrderStatus(
            ORDER_STATUS[ORDER_STATUS.Canceled] as keyof typeof ORDER_STATUS,
            reset,
          )}
          icon={<R.Icon name={'trash'} size={24} color={'white'} />}
          buttonStyle={[styles.itemButton, { backgroundColor: 'red' }]}
        />
        <Button
          loading={loading}
          onPress={onUpdateOrderStatus(
            ORDER_STATUS[ORDER_STATUS.Completed] as keyof typeof ORDER_STATUS,
            reset,
          )}
          icon={<R.Icon name={'check'} size={24} color={'white'} />}
          buttonStyle={[styles.itemButton, { backgroundColor: 'green' }]}
        />
      </View>
    )
  }
  return (
    <ListItem.Swipeable
      containerStyle={styles.productItem}
      bottomDivider
      rightStyle={styles.rightMenu}
      rightContent={renderRightMenu}
    >
      <View style={styles.productView}>
        {order.status === ORDER_STATUS[ORDER_STATUS.Canceled] && <View style={styles.overlay} />}
        {order.status === ORDER_STATUS[ORDER_STATUS.Completed] && (
          <View style={[styles.overlay, { backgroundColor: R.Colors.Green }]} />
        )}

        <AppText
          text={order?.quantity?.toString()}
          style={styles.quantity}
          adjustsFontSizeToFit
          numberOfLines={1}
        />

        {order.status === ORDER_STATUS[ORDER_STATUS.Canceled] && (
          <Image source={R.Images.img_cancel} style={styles.markImage} resizeMode="contain" />
        )}
        {order.status === ORDER_STATUS[ORDER_STATUS.Completed] && (
          <Image
            source={R.Images.img_check}
            style={[styles.markImage, { width: ItemSize - 20 }]}
            resizeMode="contain"
          />
        )}
        <AppImage url={order.product?.image} style={styles.productImage} defaultImage />

        {renderInfo()}
        <View style={{ alignItems: 'flex-end' }}>
          <View style={R.Styles.row}>
            <R.Icon name={'clock'} size={16} style={styles.icon} />
            <AppText style={styles.time}> {moment(order.createDate).format('HH:mm')}</AppText>
          </View>

          <AppText style={styles.amount} numberOfLines={1} adjustsFontSizeToFit>
            {numberWithCommas(order.amount)}
          </AppText>
        </View>
      </View>
    </ListItem.Swipeable>
  )
}

export default React.memo(OrderItemView)
