import React, { useState, useRef, useEffect } from 'react'

import { GestureResponderEvent, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { TouchableOpacity as TouchableOpacityForAndroid } from 'react-native-gesture-handler'

interface AppTouchableProps extends TouchableOpacityProps {
  multiTouch?: boolean
  enableTouchableForAndroid?: boolean
}

export default function AppTouchable(props: AppTouchableProps): JSX.Element {
  const { children, multiTouch, enableTouchableForAndroid, onPress, ...others } = props
  const [pressed, setPressed] = useState(false)
  const timerRef = useRef<any>()
  const pressHandle = (event: GestureResponderEvent) => {
    if (!pressed || multiTouch) {
      setPressed(true)
      if (onPress) {
        onPress(event)
      }
      if (!multiTouch) {
        timerRef.current = setTimeout(() => {
          setPressed(false)
        }, 1000)
      }
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const Touchable = enableTouchableForAndroid ? TouchableOpacityForAndroid : TouchableOpacity

  return (
    <Touchable
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      {...others}
      // @ts-ignore: Unreachable code error
      onPress={pressHandle}
    >
      {children}
    </Touchable>
  )
}
