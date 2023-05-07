import { View, Text } from 'react-native'
import React from 'react'
import { AppText } from '@uikit'
import R from '@resource'

export default function TableScreen() {
  return (
    <View>
      <AppText>{R.I18n.t('Hello')}</AppText>
      <Text>TableScreen</Text>
    </View>
  )
}
