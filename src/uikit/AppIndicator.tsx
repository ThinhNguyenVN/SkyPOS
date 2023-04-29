import React from 'react'
import { View, ActivityIndicator, ViewStyle, StyleSheet } from 'react-native'
import R from '../resource'

type AppIndicatorProps = {
  style?: ViewStyle
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
})

export default function AppIndicator({ style }: AppIndicatorProps): JSX.Element {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator color={R.Colors.IndicatorLoading} />
    </View>
  )
}
