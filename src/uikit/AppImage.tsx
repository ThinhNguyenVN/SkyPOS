import React, { useEffect, useMemo, useState } from 'react'

import { ActivityIndicator, ImageStyle, StyleProp, View } from 'react-native'
import FastImage, { FastImageProps, Source } from 'react-native-fast-image'
import R from '../resource'

interface AppImageProps extends Omit<FastImageProps, 'source' | 'style'> {
  url?: string
  width?: number
  height?: number
  source?: number
  showDefault?: boolean
  defaultImage?: boolean
  loading?: boolean
  style?: StyleProp<ImageStyle>
}

const AppImage = (props: AppImageProps): JSX.Element => {
  const { url, style, width, height, source, showDefault, defaultImage, id, loading } = props
  const [loadingState, setLoadingState] = useState(loading)
  const [error, setError] = useState(false)
  const [size, setSize] = useState({
    width,
    height,
  })

  useEffect(() => {
    setLoadingState(loading)
  }, [loading])

  const onLoadEnd = () => {
    setLoadingState(false)
  }
  const onError = () => {
    setError(true)
  }
  const onLoadStart = () => {
    setError(false)
    setLoadingState(loading)
  }
  const onLoad = (event: { nativeEvent: { width: number; height: number } }) => {
    if ((width && height) || (!width && !height)) {
      return
    }
    const actualWidth = event.nativeEvent.width || 1
    const actualHeight = event.nativeEvent.height || 1
    const ratio = actualWidth / actualHeight
    if (width) {
      setSize({ width, height: Math.floor(width / ratio) })
    } else if (height) {
      setSize({
        height,
        width: ratio > 1 ? Math.floor(height * ratio) : Math.floor(height / ratio),
      })
    }
  }

  const ContentView = () => {
    const uri: Source = {
      uri: url,
      priority: FastImage.priority.normal,
      cache: FastImage.cacheControl.immutable,
    }
    const imgStyles = [{ width: size.width, height: size.height, zIndex: 3 }, style || {}]
    return (
      <View>
        {(error || loadingState) && (
          <View
            style={[
              { width: size.width, height: size.height },
              style,
              {
                zIndex: 4,
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
              },
              ,
            ]}
          >
            {loadingState && (
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: '#ffffff90',
                }}
              >
                <ActivityIndicator
                  color={'black'}
                  style={{
                    flex: 1,
                  }}
                />
              </View>
            )}
            {error && showDefault && (
              <FastImage
                source={defaultImage || R.Images.img_default}
                style={{
                  zIndex: 2,
                  width: '70%',
                  height: '70%',
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
          </View>
        )}
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          onError={onError}
          onLoad={onLoad}
          onLoadEnd={onLoadEnd}
          onLoadStart={onLoadStart}
          {...props}
          source={source || uri}
          style={imgStyles as []}
        />
      </View>
    )
  }

  return ContentView()
}

export default AppImage
