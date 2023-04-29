import React, { useState } from 'react'

import { StyleSheet, TextProps } from 'react-native'
import { Text } from '@rneui/themed'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import R from '../resource'

const styles = StyleSheet.create({
  text: {
    fontSize: R.Dimens.DefaultFontSize,
    fontFamily: R.Fonts.Regular,
    lineHeight: R.Dimens.DefaultLineHeight,
  },
})

interface AppTextProps extends TextProps {
  text?: string
  onPressToExpand?: boolean
}

export default function AppText(props: AppTextProps): JSX.Element {
  const { text, style, children, onPressToExpand, ...others } = props
  const [isExpand, setIsExpand] = useState(false)
  const onTextPress = () => {
    if (onPressToExpand) {
      setIsExpand(!isExpand)
    }
  }
  return (
    <TouchableWithoutFeedback onPress={onTextPress}>
      <Text
        {...others}
        style={[styles.text, style]}
        allowFontScaling={false}
        numberOfLines={isExpand ? 0 : others.numberOfLines}
      >
        {text}
        {children}
      </Text>
    </TouchableWithoutFeedback>
  )
}
