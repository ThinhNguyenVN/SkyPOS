import { View, StyleSheet } from 'react-native'
import React from 'react'
import R from '@resource'
import { AppText } from '@uikit'
import { ITable } from '@modal'
import { makeStyles } from '@rneui/themed'
import { numberWithCommas } from '@utils/index'
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
    alignItems: 'center',
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
  },
}))

type TableItemViewProps = {
  item: ITable
}

export default function TableItemView({ item }: TableItemViewProps) {
  const styles = useStyles({ haveTransaction: true })
  const renderTransactionView = () => {
    return (
      <View style={styles.transaction}>
        <AppText style={styles.amount}>{numberWithCommas(1600000)}</AppText>
        <View style={styles.info}>
          <View style={styles.row}>
            <AppText style={styles.iconText}>16:00</AppText>
            <R.Icon name={'clock'} size={16} style={styles.icon} />
          </View>
          <View style={styles.row}>
            <AppText style={styles.iconText}>8</AppText>
            <R.Icon name={'users'} size={16} style={styles.icon} />
          </View>
          <View style={styles.row}>
            <AppText style={styles.iconText}>16</AppText>
            <R.Icon name={'clipboard'} size={16} style={styles.icon} />
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.item}>
      <AppText style={styles.tableName}>{item.name}</AppText>
      {renderTransactionView()}
    </View>
  )
}
