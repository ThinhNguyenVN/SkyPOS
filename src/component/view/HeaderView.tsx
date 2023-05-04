import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import R from '@resource'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { makeStyles } from '@rneui/themed'
import { AppText, AppTouchable } from '@uikit'
import { useNavigation } from '@react-navigation/native'

const useStyles = makeStyles((theme, props: { top?: number }) => ({
  container: {
    backgroundColor: R.Colors.TopBarBackground,
    borderBottomColor: R.Colors.Border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    shadowOpacity: 0,
    paddingTop: props?.top,
    height: R.Dimens.TopBarHeight,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 2,
    paddingRight: 16,
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 2,
    paddingLeft: 16,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: props.top,
    width: R.Dimens.MaxWidth,
    height: R.Dimens.TopBarHeight,
  },
  headerText: {
    fontSize: 16,
    fontFamily: R.Fonts.Bold,
    color: '#323F4B',
  },
}))

type HeaderProps = {
  left?: () => React.ReactNode
  right?: () => React.ReactNode
  title?: string
}

type LeftProps = {
  onPress?: () => void
  icon?: string
}

type TitleProps = {
  title: string
  center?: boolean
}

export type ItemButtonProps = {
  iconName?: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  size?: number
  selected?: boolean
  disabled?: boolean
}

export function ItemButton(props: ItemButtonProps): JSX.Element {
  const { iconName, onPress, style, size, selected, disabled } = props

  return (
    <AppTouchable
      disabled={disabled}
      onPress={onPress}
      style={[style, disabled && R.Styles.disabled]}
    >
      <R.Icon
        color={selected ? R.Colors.IconSelected : R.Colors.Icon}
        name={iconName || ''}
        size={size || 24}
      />
    </AppTouchable>
  )
}

export function BackButton({
  onPress,
  style,
  icon,
}: {
  onPress?: () => void
  style?: ViewStyle
  icon?: string
}): JSX.Element {
  const navigation = useNavigation()
  if (!navigation.canGoBack()) {
    return <></>
  }
  return (
    <ItemButton
      iconName={icon || 'arrow-left'}
      style={style}
      onPress={(): void => {
        if (onPress) {
          onPress()
        } else {
          navigation.goBack()
        }
      }}
    />
  )
}

export function LeftButton({ onPress, icon }: LeftProps) {
  const styles = useStyles()
  return (
    <View style={styles.left}>
      {icon && onPress ? (
        <ItemButton iconName={icon} onPress={onPress} />
      ) : (
        <BackButton onPress={onPress} icon={icon} />
      )}
    </View>
  )
}

export function RightButton({ onPress, icon }: LeftProps) {
  const styles = useStyles()

  return (
    <View style={styles.right}>
      <ItemButton iconName={icon} onPress={onPress} />
    </View>
  )
}

export const HeaderTitle = ({ title }: TitleProps): JSX.Element => {
  const insets = useSafeAreaInsets()
  const styles = useStyles({ top: insets.top })
  return (
    <View style={styles.header}>
      <AppText numberOfLines={1} style={styles.headerText}>
        {title}
      </AppText>
    </View>
  )
}

export default function HeaderView({ left, right, title }: HeaderProps) {
  const insets = useSafeAreaInsets()
  const styles = useStyles({ top: insets.top })

  return (
    <View style={styles.container}>
      {left ? left() : <LeftButton />}
      <HeaderTitle title={title ?? ''} center />
      {right ? right() : null}
    </View>
  )
}
