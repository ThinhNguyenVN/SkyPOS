import React, { useRef, useEffect } from 'react'
import { Animated, ViewProps } from 'react-native'
import R from '../resource'

interface AppTabViewProps extends ViewProps {
  selected: boolean
  direction: 'left' | 'right' | 'up' | 'down'
  disableAnim: boolean
}

const AppTabView = (props: AppTabViewProps): JSX.Element => {
  const { direction = 'right', selected, children, disableAnim } = props

  const widthValue = useRef(R.Dimens.MaxWidth)

  const slideAnim = useRef(new Animated.Value(widthValue.current)).current
  const hideAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    switch (direction) {
      case 'left': {
        widthValue.current = -R.Dimens.MaxWidth
        break
      }
      case 'right': {
        widthValue.current = R.Dimens.MaxWidth
        break
      }
      // default: {
      //   widthValue.current = 0
      //   break
      // }
    }
    slideAnim.setValue(widthValue.current)
  }, [direction])

  useEffect(() => {
    if (selected) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(hideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: widthValue.current,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(hideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [selected])

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: 0,
          top: 0,
          width: R.Dimens.MaxWidth,
          height: R.Dimens.MaxHeight,
          opacity: disableAnim ? 1 : hideAnim,
        },
        {
          transform: [{ translateX: disableAnim ? 0 : slideAnim }],
        },

        disableAnim ? { display: selected ? 'flex' : 'none' } : {},
      ]}
    >
      {children}
    </Animated.View>
  )
}
export default AppTabView
