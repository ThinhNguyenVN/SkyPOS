import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Modalize } from 'react-native-modalize'
import { useDidUpdateEffect } from '@hook/index'
import AppWheelScroll, { SelectItemType } from './AppWheelScroll'
import R from '@resource'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppInput, { AppInputProps, AppInputRef } from './AppInput'

const styles = StyleSheet.create({
  selectOverlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  icon: {
    position: 'absolute',
    top: 30,
    right: 16,
  },
  modalContainer: {
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  okButton: {
    height: 58,
    width: '100%',
    backgroundColor: R.Colors.ContentBackground,
    justifyContent: 'center',
    alignContent: 'center',
  },
  okButtonText: {
    color: R.Colors.Primary,
    fontWeight: '800',
    fontSize: 18,
    textAlign: 'center',
  },
  overlayInput: {
    position: 'absolute',
    top: 0,
    zIndex: 2,
    left: 0,
    right: 0,
    bottom: 0,
    //backgroundColor: 'red',
  },
  hidden: {
    opacity: 0,
  },
})

interface AppSelectInputProps extends AppInputProps {
  data: Array<SelectItemType>
  selectedValue?: number | string
  onSelectedValue: (selected: string | number) => void
}
function AppSelectInput(props: AppSelectInputProps): JSX.Element {
  const { data, onSelectedValue } = props
  const bottomRef = useRef<Modalize>()
  const inputRef = useRef<AppInputRef>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const [selectedValue, setSelectedValue] = useState<string | number>()

  useEffect(() => {
    if (props.selectedValue && !!data?.length) {
      setSelectedValue(props.selectedValue)
      const selectedIndex = data.findIndex((item) => item.value === props.selectedValue)
      setSelectedIndex(selectedIndex)
    }
  }, [props.selectedValue, data])

  const onPress = () => {
    bottomRef.current?.open()
  }
  const onOKPress = () => {
    bottomRef.current?.close()
  }

  const onModalClosed = () => {
    inputRef?.current?.validate()
  }

  const displayValue = useMemo(() => {
    return data[selectedIndex]?.label
  }, [data, selectedIndex])

  useDidUpdateEffect(() => {
    setSelectedValue(data[selectedIndex]?.value)
    onSelectedValue(data[selectedIndex]?.value)
  }, [selectedIndex])

  return (
    <>
      <View>
        <TouchableOpacity style={styles.selectOverlay} onPress={onPress}>
          <R.Icon color={R.Colors.Icon} name={'chevron-down'} size={18} style={styles.icon} />
        </TouchableOpacity>
        <AppInput
          {...props}
          containerStyle={styles.hidden}
          ref={inputRef}
          value={selectedValue ? selectedValue.toString() : undefined}
        />
        <AppInput
          containerStyle={styles.overlayInput}
          label={props.label}
          style={props.style}
          placeholder={props.placeholder}
          value={displayValue}
        />
      </View>

      <Modalize ref={bottomRef} adjustToContentHeight withReactModal onClosed={onModalClosed}>
        <View style={styles.modalContainer}>
          <AppWheelScroll
            selectedIndex={selectedIndex}
            dataSource={data}
            onValueChanged={(_, index) => {
              setSelectedIndex(index)
            }}
            wrapperHeight={140}
            wrapperColor="#FFFFFF"
            itemHeight={30}
            highlightColor={'#d8d8d8'}
            highlightBorderWidth={1}
          />

          <TouchableOpacity style={styles.okButton} onPress={onOKPress}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </>
  )
}
export default AppSelectInput
