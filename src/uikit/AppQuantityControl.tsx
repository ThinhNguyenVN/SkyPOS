import { View, ViewStyle, StyleSheet } from 'react-native'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import AppImage from './AppImage'
import AppText from './AppText'
import R from '../resource'
import AppTouchable from './AppTouchable'
import { debounce } from 'lodash'

const styles = StyleSheet.create({
  text: {
    lineHeight: 32,
    fontSize: 25,
    fontWeight: '400',
    marginHorizontal: 16,
    marginBottom: 0,
    color: R.Colors.TextColorSelected,
  },
  clear: {
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 32,
  },
  disabled: {
    opacity: 0.4,
  },
})

type AppQuantityControlProps = {
  value?: number
  onValueChange: (val: number) => void
  containerStyle?: ViewStyle
  min?: number
  max?: number
  clearable?: boolean
  onSubmitQuantity?: (val: number, callback: () => void) => void
  disabled?: boolean
}

export default function AppQuantityControl({
  value = 0,
  onValueChange,
  containerStyle,
  min = 1,
  max = 100,
  clearable,
  onSubmitQuantity,
  disabled,
}: AppQuantityControlProps) {
  const [loading, setLoading] = useState(false)
  const valueRef = useRef(value)
  const intervalRef = useRef<number>()

  useEffect(() => {
    valueRef.current = value
  }, [value])

  const delayFunc = () => {
    if (onSubmitQuantity) {
      const callback = () => {
        setLoading(false)
      }
      setLoading(true)
      onSubmitQuantity(valueRef.current, callback)
    }
  }

  const debounceFunc = useCallback(debounce(delayFunc, 1000), [])

  const calculate = (value: number) => {
    const result = valueRef.current + value
    if (result >= min && result <= max) {
      onValueChange(result)
      valueRef.current = result
      debounceFunc()
    }
  }
  const onPressStart = (diff: number) => () => {
    calculate(diff)
    intervalRef.current = setInterval(() => {
      calculate(diff)
    }, 200)
  }
  const onPressEnd = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const onClearPress = () => {
    onValueChange(0)
  }

  const renderClearButton = () => {
    if (!clearable) {
      return null
    }

    return (
      <AppTouchable style={styles.clear} onPress={onClearPress}>
        <AppText text={'Clear'} />
      </AppTouchable>
    )
  }

  return (
    <View
      style={[
        {
          flexDirection: 'row',
        },
        containerStyle,
      ]}
    >
      <AppTouchable
        style={disabled ? styles.disabled : {}}
        multiTouch
        onPressIn={onPressStart(1)}
        onPressOut={onPressEnd}
        disabled={valueRef.current >= max || loading || disabled}
      >
        <AppImage source={R.Images.btn_plus_gray} width={32} height={32} />
      </AppTouchable>
      <AppText style={[styles.text, disabled ? styles.disabled : {}]}>{valueRef.current}</AppText>
      <AppTouchable
        style={disabled ? styles.disabled : {}}
        multiTouch
        onPressIn={onPressStart(-1)}
        onPressOut={onPressEnd}
        disabled={valueRef.current <= min || loading || disabled}
      >
        <AppImage source={R.Images.btn_minus_gray} width={32} height={32} />
      </AppTouchable>
      
      {renderClearButton()}
    </View>
  )
}
