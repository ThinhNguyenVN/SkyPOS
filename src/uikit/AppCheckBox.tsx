import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ViewStyle, Platform } from 'react-native'
import R from '../resource'
import { CheckBox, CheckBoxProps } from '@rneui/themed'
import { TouchableOpacity as TouchableOpacityForAndroid } from 'react-native-gesture-handler'

interface AppCheckBoxProps extends Omit<CheckBoxProps, 'onPress' | 'title' | 'children'> {
  type?: 'checkbox' | 'radio' | 'check'
  disabled?: boolean
  containerStyle?: ViewStyle
  onPress?: (checked: boolean) => void
  title?: string
  disableStyle?: ViewStyle
}

const styles = StyleSheet.create({
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: R.Colors.ButtonBorder,
    borderRadius: 4,
  },
  check: {
    width: 25,
    height: 25,
  },
  container: {
    marginRight: 8,
    marginLeft: 0,
    padding: 0,
  },
  radio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#323F4B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioChecked: {
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: '#323F4B',
  },
})

export default function AppCheckBox(props: AppCheckBoxProps) {
  const [checked, setChecked] = useState(props.checked)
  useEffect(() => {
    setChecked(props.checked)
  }, [props.checked])
  const disableStyle = {
    ...R.Styles.disabled,
    ...props.disableStyle,
  }
  const checkedIcon = () => {
    switch (props.type) {
      case 'radio':
        return (
          <View style={[styles.radio, props.disabled ? disableStyle : {}]}>
            <View style={styles.radioChecked} />
          </View>
        )
      case 'check':
        return (
          <View style={[styles.check, props.disabled ? disableStyle : {}]}>
            <R.Icon name="check" color="#323F4B" size={25} />
          </View>
        )
      default:
        return (
          <View
            style={[
              styles.checkbox,
              { backgroundColor: 'black' },
              props.disabled ? disableStyle : {},
            ]}
          >
            <R.Icon name="check" color="white" size={25} />
          </View>
        )
    }
  }

  const uncheckedIcon = () => {
    switch (props.type) {
      case 'radio':
        return <View style={[styles.radio, props.disabled ? R.Styles.disabled : {}]} />
      case 'check':
        return <View style={[styles.check, props.disabled ? R.Styles.disabled : {}]} />
      default:
        return <View style={[styles.checkbox, props.disabled ? R.Styles.disabled : {}]} />
    }
  }

  return (
    <CheckBox
      Component={Platform.OS === 'ios' ? undefined : TouchableOpacityForAndroid}
      containerStyle={[styles.container, props.containerStyle || {}]}
      checkedIcon={checkedIcon()}
      uncheckedIcon={uncheckedIcon()}
      {...props}
      checked={checked}
      onPress={() => {
        if (props.disabled) {
          return
        }
        if (props.onPress) {
          props.onPress(!checked)
        }
        setChecked(!checked)
      }}
    />
  )
}
