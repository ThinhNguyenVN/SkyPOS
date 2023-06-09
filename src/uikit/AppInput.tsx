import React, { useEffect, useRef, useState, useImperativeHandle, useMemo, Ref } from 'react'
import { StyleSheet, ViewStyle, TextInput, View, Platform } from 'react-native'
import R from '../resource'
import { Input, InputProps } from '@rneui/themed'
import AppText from './AppText'
import * as yup from 'yup'

const styles = StyleSheet.create({
  h2: {
    ...R.Styles.h2,
    marginBottom: 32,
  },
  label: {
    ...R.Styles.h5,
    marginBottom: 2,
  },
  inputContainerStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 0,
    marginBottom: 0,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  containerStyle: {
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    flex: 1,
  },
  error: {
    fontSize: 13,
    fontWeight: '400',
  },
  leftIconContainer: {
    marginRight: 4,
  },
  count: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  disableInput: { color: R.Colors.TextColor, backgroundColor: '#FAFAFA', borderColor: '#FAFAFA' },
})

export interface AppInputProps
  extends Omit<InputProps, 'onChangeText' | 'autoCompleteType' | 'onEndEditing' | 'ref'> {
  label?: string
  icon?: string
  onChangeText?: (value: string, isValid: boolean) => void
  placeholder?: string
  value?: string
  width?: number
  height?: number
  containerStyle?: ViewStyle
  inputContainerStyle?: ViewStyle
  error?: string
  countLength?: boolean
  maxLength?: number
  validate?: any
}

export type AppInputRef = {
  validate: () => void
  focus: () => void
  clear: () => void
  blur: () => void
  isFocused: () => void
}

const AppInput = React.forwardRef(
  (
    {
      label,
      icon,
      placeholder,
      onChangeText,
      width,
      height,
      containerStyle,
      inputContainerStyle,
      countLength,
      maxLength,
      validate,
      ...props
    }: AppInputProps,
    ref: Ref<AppInputRef>,
  ) => {
    const inputRef = useRef<TextInput>(null)
    const [value, setValue] = useState(props.value)
    const [error, setError] = useState(props.error)
    const [focused, setFocused] = useState(inputRef.current?.isFocused())

    useEffect(() => {
      setValue(props.value)
    }, [props.value])

    const errorBorderColor = error ? R.Colors.Error : R.Colors.ButtonBorder
    const borderColor = focused ? R.Colors.Dark : errorBorderColor

    const schema = yup.object().shape({
      input: validate || undefined,
    })

    const leftIcon = useMemo(() => {
      if (icon) {
        return <R.Icon name={icon} size={24} color={focused ? R.Colors.Dark : R.Colors.Icon} />
      }

      return false
    }, [focused])

    const doValidate = (input?: string) => {
      if (validate) {
        return schema
          .validate({
            input,
          })
          .then(() => {
            setError('')
            return true
          })
          .catch((err: any) => {
            setError(err.errors?.[0])
            return false
          })
      } else {
        setError('')
        return true
      }
    }

    useImperativeHandle(ref, () => ({
      focus() {
        return inputRef.current?.focus()
      },
      clear() {
        return inputRef.current?.clear()
      },
      blur() {
        return inputRef.current?.blur()
      },
      isFocused() {
        return inputRef.current?.isFocused()
      },
      validate() {
        return doValidate(value)
      },
    }))

    const onChange = async (text: string) => {
      if (maxLength && text.length > maxLength) {
        return
      }
      const inputValue = text

      setValue(inputValue)
      if (onChangeText) {
        const validate = await doValidate(inputValue)
        onChangeText(inputValue, validate)
      }
    }

    const onPressIn = () => {
      setFocused(true)
    }
    const onBlur = () => {
      doValidate(value)
      setFocused(false)
    }

    useEffect(() => {
      setFocused(inputRef.current?.isFocused())
    }, [inputRef.current?.isFocused()])

    const textLength = `${value?.length?.toString() || '0'} ${maxLength ? '/' + maxLength : ''}`
    return (
      <View style={containerStyle}>
        {/* @ts-ignore */}
        <Input
          ref={inputRef}
          label={
            !!label && (
              <AppText
                style={[
                  styles.label,
                  {
                    color: !focused && error ? R.Colors.Error : R.Colors.TextColor,
                  },
                  props.labelStyle,
                ]}
                text={label}
              />
            )
          }
          containerStyle={{
            flex: width ? 1 : 0,
          }}
          inputStyle={{
            textAlignVertical: 'top',
            paddingBottom: Platform.OS === 'android' ? 6 : undefined,
          }}
          inputContainerStyle={[
            styles.inputContainerStyle,
            {
              height,
              width,
              borderColor,
              paddingBottom: countLength ? 28 : 0,
            },
            inputContainerStyle || {},
          ]}
          placeholder={placeholder}
          leftIcon={leftIcon}
          leftIconContainerStyle={styles.leftIconContainer}
          onPressIn={onPressIn}
          onBlur={onBlur}
          errorMessage={focused && !props.disabled ? '' : error || props.error}
          autoCapitalize={'none'}
          maxLength={maxLength}
          {...props}
          errorStyle={error ? styles.error : props.errorStyle}
          disabledInputStyle={[styles.disableInput, props.disabledInputStyle]}
          value={value}
          onChangeText={onChange}
        />
        {countLength && <AppText style={styles.count} text={textLength} />}
      </View>
    )
  },
)
export default AppInput
