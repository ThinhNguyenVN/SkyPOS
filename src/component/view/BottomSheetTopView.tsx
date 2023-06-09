import { View, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import R from '../../resource'
import { AppText, AppTouchable } from '../../uikit'

export type BottomSheetTopViewProps = {
  title: string
  onClosePress?: () => void
  onRightButtonPress?: () => void
  disableRightButton?: boolean
  iconRight?: string
  iconLeft?: string
}
const BottomSheetTopView = ({
  title,
  onClosePress,
  onRightButtonPress,
  disableRightButton,
  iconRight,
  iconLeft = 'ic-close',
}: BottomSheetTopViewProps): JSX.Element => {
  return (
    <View
      style={{
        width: R.Dimens.MaxWidth,
        height: 74,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: R.Colors.Border,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 16,
      }}
    >
      {!onClosePress ? (
        <View style={{ width: 24 }} />
      ) : (
        <AppTouchable onPress={onClosePress}>
          <R.Icon name={iconLeft} size={24} color={R.Colors.Icon} />
        </AppTouchable>
      )}

      <AppText style={R.Styles.h4Bold} text={title} />
      {!onRightButtonPress || !iconRight ? (
        <View style={{ width: 24 }} />
      ) : (
        <AppTouchable onPress={onRightButtonPress} disabled={!!disableRightButton}>
          <R.Icon name={iconRight} size={24} color={R.Colors.Icon} />
        </AppTouchable>
      )}
    </View>
  )
}

export default BottomSheetTopView
