import React from 'react'
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import R from '@resource'
import { AppText, AppTouchable } from '@uikit'

type ListItemViewProps = {
  text?: string
  rightIcon?: string
  onPress?: () => void
  sectionTitle?: string
  label?: string | React.ReactNode
  readOnly?: boolean
  contentStyle?: ViewStyle
  textStyle?: TextStyle
}

const styles = StyleSheet.create({
  label: {
    ...R.Styles.h5,
    fontFamily: R.Fonts.Bold,
    color: '#323F4B',
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItem: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: R.Colors.Border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingVertical: 16,
  },
  listSectionText: {
    ...R.Styles.h5,
    marginTop: R.Dimens.MarginLarge,
    marginBottom: 0,
    paddingHorizontal: 20,
    color: R.Colors.Gray,
  },
  text: {},
  icon: {
    width: 30,
    alignItems: 'center',
  },
})

const ListItemView = ({
  text,
  rightIcon = 'ic-right',
  onPress,
  sectionTitle,
  label,
  readOnly,
  contentStyle,
  textStyle,
}: ListItemViewProps): JSX.Element => {
  return (
    <View style={contentStyle}>
      {!!sectionTitle && <AppText style={styles.listSectionText} text={sectionTitle} />}

      <AppTouchable style={styles.listItem} onPress={onPress} disabled={readOnly}>
        <AppText style={R.Styles.listItemLabel}>{label}</AppText>
        <View style={styles.row}>
          <AppText style={[R.Styles.h4, textStyle]} text={text} />
          <View style={styles.icon}>
            {!readOnly && <R.Icon name={rightIcon} size={20} color={R.Colors.Icon} />}
          </View>
        </View>
      </AppTouchable>
    </View>
  )
}
export default ListItemView
