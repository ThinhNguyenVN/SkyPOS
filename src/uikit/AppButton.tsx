import React from 'react'
import { FlexStyle, StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native'
import { Button, ButtonProps } from '@rneui/themed'

import AppImage from './AppImage'

import R from '../resource'

interface AppButtonProps extends Omit<ButtonProps, 'type' | 'icon' | 'size'> {
  size?: 'small' | 'large'
  type?: 'primary' | 'secondary' | 'destructive'
  disabled?: boolean
  icon?: string
  width?: number
  height?: number
  iconSize?: number
  onPress?: () => void
  iconRight?: boolean
  iconLeft?: boolean
  containerStyle?: ViewStyle
  style?: ViewStyle
  image?: number
  titleStyle?: TextStyle
}

const styles = StyleSheet.create({
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  title: {
    fontFamily: R.Fonts.Bold,
    fontSize: 15,
    lineHeight: 20,
  },
  button: {
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: R.Colors.ButtonBorder,
  },
  iconRight: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    zIndex: 2,
    flex: 1,
  },
  iconLeft: {
    position: 'absolute',
    left: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 2,
  },
  image: {
    height: 25,
    width: 25,
  },
})

export default function AppButton(props: AppButtonProps): JSX.Element {
  const { width, containerStyle, image } = props
  const widthButton = props.size === 'large' ? '100%' : 160
  const height = props.height ?? R.Dimens.ButtonHeight
  const backgroundColor =
    props.type === 'primary' ? R.Colors.ButtonBackgroundPrimary : R.Colors.ButtonBackgroundSecondary

  const colorOther =
    props.type === 'destructive' ? R.Colors.ButtonDestructive : R.Colors.ButtonTextSecondary
  const color = props.type === 'primary' ? R.Colors.ButtonTextPrimary : colorOther
  const renderIcon = (style?: FlexStyle) => {
    if (image) {
      const imgStyles = [styles.image, style]
      return <AppImage style={imgStyles as []} source={image} />
    }
    return (
      <R.Icon
        style={[style, props.iconContainerStyle]}
        name={props.icon || ''}
        size={props.iconSize ?? 24}
        color={props.disabled ? R.Colors.ButtonDisabledText : color}
      />
    )
  }
  const iconView = () => {
    if (props.iconRight) {
      return <View style={styles.iconRight}>{renderIcon()}</View>
    } else if (props.iconLeft) {
      return <View style={styles.iconLeft}>{renderIcon()}</View>
    }
    return renderIcon({ marginRight: 10 })
  }
  console.log('width ::: ', width, widthButton)
  return (
    <View>
      <Button
        loading={props.loading}
        loadingProps={{
          color,
        }}
        containerStyle={[containerStyle, { width: width || widthButton }]}
        onPress={props.onPress}
        title={
          <View
            style={
              props.iconRight || props.iconLeft
                ? [
                    styles.titleView,
                    props.iconRight ? { paddingRight: (props.iconSize ?? 24) + 2 } : {},
                  ]
                : {}
            }
          >
            <Text
              style={[
                {
                  color: props.disabled ? R.Colors.ButtonDisabledText : color,
                },
                styles.title,
                props.titleStyle || {},
              ]}
            >
              {props.title}
            </Text>
          </View>
        }
        buttonStyle={[
          {
            width: width || widthButton,
            height,
            backgroundColor,
          },
          styles.button,
          props.type === 'destructive' && {
            borderColor: props.disabled ? R.Colors.ButtonDisabledText : R.Colors.ButtonDestructive,
          },
          props.style || {},
        ]}
        icon={props.icon ? iconView() : undefined}
        disabled={props.disabled}
        iconRight={props.iconRight}
      />
    </View>
  )
}
