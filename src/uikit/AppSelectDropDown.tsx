import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppTouchable from './AppTouchable'
import AppText from './AppText'
import R from '@resource'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  dropDownContainerStyle: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    minWidth: 80,
    overflow: 'hidden',
    position: 'absolute',
    top: 44,
    zIndex: 10,
  },
  item: {
    padding: 8,
    justifyContent: 'center',
  },
})

type ItemType = {
  label: string
  value: string
}
type AppSelectDropDownProps = {
  data: Array<ItemType>
  containerStyle?: ViewStyle
  inputStyle?: ViewStyle
  textStyle?: TextStyle
  dropDownContainerStyle?: ViewStyle
  value?: string
  onSelectedValue: (value: string) => void
}

export default function AppSelectDropDown({
  data,
  containerStyle,
  inputStyle,
  textStyle,
  value,
  dropDownContainerStyle,
  onSelectedValue,
}: AppSelectDropDownProps) {
  const [selectedItem, setSelected] = useState<ItemType>(data?.[0])
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (value) {
      const item = data.find((i) => i.value === value)
      if (item) {
        setSelected(item)
      }
    }
  }, [value])

  const onItemPress = (item: ItemType) => () => {
    setSelected(item)
    setOpen(false)
    onSelectedValue(item.value)
  }
  const onInputPress = () => {
    setOpen(!open)
  }
  return (
    <View style={containerStyle}>
      <AppTouchable multiTouch style={[styles.input, inputStyle]} onPress={onInputPress}>
        <AppText text={selectedItem?.label} style={textStyle} />
      </AppTouchable>
      <View
        style={[styles.dropDownContainerStyle, dropDownContainerStyle, { opacity: open ? 1 : 0 }]}
      >
        {data?.map((item, index) => (
          <AppTouchable
            key={`item-key-${index}`}
            multiTouch
            style={[
              styles.item,
              item.value === selectedItem?.value ? { backgroundColor: R.Colors.Border } : {},
            ]}
            onPress={onItemPress(item)}
          >
            <AppText
              text={item?.label}
              style={[
                textStyle,
                item.value === selectedItem?.value ? {} : { color: R.Colors.TextColor },
              ]}
            />
          </AppTouchable>
        ))}
      </View>
    </View>
  )
}
