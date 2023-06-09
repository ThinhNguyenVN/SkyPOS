import { View, StyleSheet } from 'react-native'
import React from 'react'
import R from '@resource'
import { AppText, AppTouchable } from '@uikit'
import { ITable } from '@modal'
import { makeStyles } from '@rneui/themed'
import { numberWithCommas } from '@utils/index'
import { useNavigation } from '@react-navigation/native'
import { RootNavigationProp } from 'src/modal/navigator'
import moment from 'moment'
const useStyles = makeStyles((theme, props: { haveTransaction?: boolean }) => ({
  item: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: R.Colors.ContentBackground,
    borderColor: R.Colors.Border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
  },
  tableName: {
    fontSize: 32,
    lineHeight: 60,
    fontFamily: R.Fonts.Bold,
    color: props.haveTransaction ? R.Colors.Green : R.Colors.Gray,
    opacity: 0.5,
  },
  transaction: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  amount: {
    ...R.Styles.h3,
    color: R.Colors.PriceColor,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  info: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    paddingLeft: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    ...R.Styles.h4,
    lineHeight: 19,
  },
}))

type TableItemViewProps = {
  item: ITable
}

export default function TableItemView({ item }: TableItemViewProps) {
  const styles = useStyles({ haveTransaction: true })
  const navigation = useNavigation<RootNavigationProp>()
  const onPressTransactionItem = () => {
    if (item?.transaction?.id) {
      navigation.navigate('TransactionDetail', { transactionId: item.transaction.id })
    }
  }
  const onItemPress = () => {
    if (item?.transaction?.id) {
      navigation.navigate('TransactionDetail', { transactionId: item.transaction.id })
    } else {
      navigation.navigate('StartTransaction', { table: item })
    }
  }
  const renderTransactionView = () => {
    return (
      <AppTouchable style={styles.transaction} onPress={onPressTransactionItem}>
        <AppText style={styles.amount}>{numberWithCommas(item?.transaction?.totalAmount)}</AppText>
        <View style={styles.info}>
          {!!item?.transaction?.startTime && (
            <View style={styles.row}>
              <AppText style={styles.iconText}>
                {moment(item.transaction.startTime).format('HH:mm')}
              </AppText>
              <R.Icon name={'clock'} size={16} style={styles.icon} />
            </View>
          )}
          {!!item?.transaction?.numberCustomer && (
            <View style={styles.row}>
              <AppText style={styles.iconText}>{item.transaction.numberCustomer}</AppText>
              <R.Icon name={'users'} size={16} style={styles.icon} />
            </View>
          )}
          <View style={styles.row}>
            <AppText style={styles.iconText}>{item?.transaction?.totalOrder ?? 0}</AppText>
            <R.Icon name={'clipboard'} size={16} style={styles.icon} />
          </View>
        </View>
      </AppTouchable>
    )
  }
  return (
    <AppTouchable style={styles.item} onPress={onItemPress}>
      <AppText style={styles.tableName}>{item.name}</AppText>
      {!!item?.transaction && renderTransactionView()}
    </AppTouchable>
  )
}
