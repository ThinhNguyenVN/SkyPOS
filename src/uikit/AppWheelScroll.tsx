import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'
import { debounce } from 'lodash'

const styles = StyleSheet.create({
  itemWrapper: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 21,
    color: '#9A99A2',
  },
  itemTextSelected: {
    color: '#232326',
    fontSize: 23,
  },
})

export type SelectItemType = {
  label: string
  value: string | number
}

function isNumeric(str: string | unknown): boolean {
  if (typeof str === 'number') return true
  if (typeof str !== 'string') return false
  return (
    !isNaN(str as unknown as number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ) // ...and ensure strings of whitespace fail
}

const deviceWidth = Dimensions.get('window').width

const isViewStyle = (style: ViewProps['style']): style is ViewStyle => {
  return typeof style === 'object' && style !== null && Object.keys(style).includes('height')
}

export type WheelScrollProps = {
  style?: ViewProps['style']
  tracker?: number
  dataSource: Array<string | number | SelectItemType>
  selectedIndex?: number
  onValueChanged?: (value: WheelScrollProps['dataSource'][0], index: number) => void
  onValueChange?: (value: WheelScrollProps['dataSource'][0], index: number) => void
  highlightColor?: string
  highlightBorderWidth?: number
  itemHeight?: number
  wrapperHeight?: number
  wrapperColor?: string
}

export default function AppWheelScroll({
  itemHeight = 30,
  style,
  ...props
}: WheelScrollProps): JSX.Element {
  const [initialized, setInitialized] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(
    props.selectedIndex && props.selectedIndex >= 0 ? props.selectedIndex : 0,
  )

  const sView = useRef<ScrollView>(null)

  const wrapperHeight =
    props.wrapperHeight ||
    (isViewStyle(style) && isNumeric(style.height) ? Number(style.height) : 0) ||
    itemHeight * 5

  useEffect(
    function initialize() {
      if (initialized) return
      setInitialized(true)

      setTimeout(() => {
        const y = itemHeight * selectedIndex
        sView?.current?.scrollTo({ y: y })
      }, 0)
    },
    [initialized, itemHeight, selectedIndex, sView],
  )

  useEffect(
    function forceSelect() {
      if (!initialized || !props.tracker) {
        return
      }

      setTimeout(() => {
        const newSelectedIndex = props.selectedIndex || 0
        const y = itemHeight * newSelectedIndex
        sView?.current?.scrollTo({ y: y })
      }, 0)
    },
    [props.tracker],
  )

  const renderPlaceHolder = () => {
    const h = (wrapperHeight - itemHeight) / 2
    const header = <View style={{ height: h, flex: 1 }} />
    const footer = <View style={{ height: h, flex: 1 }} />
    return { header, footer }
  }

  const renderItem = (data: WheelScrollProps['dataSource'][0], index: number) => {
    const isSelected = index === selectedIndex

    let item
    if (typeof data === 'number') {
      item = (
        <Text style={isSelected ? styles.itemTextSelected : styles.itemText}>
          {data < 100 ? data : `${data}+`}
        </Text>
      )
    } else {
      item = (
        <Text style={isSelected ? styles.itemTextSelected : styles.itemText}>
          {typeof data === 'string' ? data : data.label}
        </Text>
      )
    }

    return (
      <View style={[styles.itemWrapper, { height: itemHeight }]} key={index}>
        {item}
      </View>
    )
  }

  const checkScrollStopped = useCallback(
    debounce((index) => {
      setSelectedIndex(index)
      if (props.onValueChanged) {
        const selectedValue = props.dataSource[index]
        props.onValueChanged(selectedValue, index)
      }
    }, 100),
    [],
  )

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    let y = 0
    const h = itemHeight
    if (e.nativeEvent.contentOffset) {
      y = e.nativeEvent.contentOffset.y
    }
    const _selectedIndex = Math.round(y / h)
    checkScrollStopped(_selectedIndex)
  }

  const { header, footer } = renderPlaceHolder()
  const highlightWidth = (isViewStyle(style) ? style.width : 0) || deviceWidth
  const highlightColor = props.highlightColor || '#333'
  const highlightBorderWidth = props.highlightBorderWidth || StyleSheet.hairlineWidth

  const wrapperStyle: ViewStyle = {
    height: wrapperHeight,
    flex: 1,
    backgroundColor: props.wrapperColor || '#fafafa',
    overflow: 'hidden',
  }

  const highlightStyle: ViewStyle = {
    position: 'absolute',
    top: (wrapperHeight - itemHeight) / 2,
    height: itemHeight,
    width: highlightWidth,
    borderTopColor: highlightColor,
    borderBottomColor: highlightColor,
    borderTopWidth: highlightBorderWidth,
    borderBottomWidth: highlightBorderWidth,
  }

  const snapOffsets: number[] = []

  props.dataSource.forEach((v, i) => snapOffsets.push(i * itemHeight + 1))

  return (
    <View style={wrapperStyle}>
      <View style={highlightStyle} />
      <ScrollView
        ref={sView}
        bounces={false}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        snapToOffsets={snapOffsets}
        scrollEventThrottle={1}
        removeClippedSubviews={true}
      >
        {header}
        {props.dataSource.map(renderItem)}
        {footer}
      </ScrollView>
    </View>
  )
}
