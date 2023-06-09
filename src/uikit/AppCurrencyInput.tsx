import { StyleSheet, View } from 'react-native'
import React from 'react'
import AppInput, { type AppInputProps } from './AppInput'
import AppText from './AppText'
import R from '@resource'
import AppTouchable from './AppTouchable'

const styles = StyleSheet.create({
  container: {},
  selectBox: {
    backgroundColor: R.Colors.Border,
    position: 'absolute',
    zIndex: 2,
    borderRadius: 8,
    top: 17,
    right: 10,
    height: 40,
    width: 50,
    justifyContent: 'center',
    alignContent: 'center',
  },
  selectBoxText: {
    color: R.Colors.White,
    textAlign: 'center',
    fontFamily: R.Fonts.Bold,
    fontSize: 16,
    paddingBottom: 2,
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    left: 38 / 2,
  },
})

export default function AppCurrencyInput(props: AppInputProps) {
  return (
    <View style={styles.container}>
      <AppInput
        {...props}
        keyboardType={'number-pad'}
        selectTextOnFocus
        inputStyle={{ textAlign: 'right', paddingRight: 50 }}
      />
      <AppTouchable style={styles.selectBox}>
        <AppText text={'vnd'} style={styles.selectBoxText} />
        <R.Icon name={'chevron-down'} size={12} color={R.Colors.White} style={styles.icon} />
      </AppTouchable>
    </View>
  )
}
