import React, { useCallback, useRef, useState } from 'react'

import { Animated, Easing, View, StyleSheet, ViewStyle } from 'react-native'

import { useSafeArea } from 'react-native-safe-area-context'

import Modal from 'react-native-modal'

import { AppText, AppButton, AppImage, AppTouchable, AppIndicator } from '@uikit'
import R from '../../resource'

interface AlertContextType {
  popup(type: PopupConfig): void
  popupDismiss(): void
  setLoadingAtPositive(state: boolean): void
  toast(param: {
    msg: React.ReactNode
    autoHide?: boolean
    position?: 'bottom' | 'float'
    type?: 'warning' | 'notice' | 'success'
    isTabbarHidden?: boolean
  }): void
  toastDismiss(): void
  showLoading(): void
  hideLoading(): void
}

export const AlertContext = React.createContext<AlertContextType>({
  popup() {},
  popupDismiss() {},
  setLoadingAtPositive() {},
  toast() {},
  toastDismiss() {},
  showLoading() {},
  hideLoading() {},
})

type Props = {
  children: React.ReactNode
}

export type PopupButtonProps = {
  label: string
  onPress?: () => void
  type: 'primary' | 'secondary' | 'destructive' | 'none' | undefined
  loading?: boolean
}

type FlexLayout = 'row' | 'column'

const ContentWidth = R.Dimens.MaxWidth - 2 * R.Dimens.MarginLarge

const styles = StyleSheet.create({
  alertToastPanel: {
    alignItems: 'center',
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    position: 'absolute',
    width: '100%',
    zIndex: 99,
    justifyContent: 'space-between',
  },
  floatToast: {
    width: 'auto',
    maxWidth: R.Dimens.MaxWidth - 32,
    backgroundColor: R.Colors.Dark,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8, //override paddingBottom for bottom type
    alignSelf: 'center',
    zIndex: 99,
  },
  alertToastText: {
    ...R.Styles.h4,
    alignSelf: 'center',
    lineHeight: 20,
  },
  alertModal: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  alertPopup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    maxHeight: R.Dimens.MaxHeight - 2 * R.Dimens.MarginLarge,
    overflow: 'hidden',
    width: ContentWidth,
  },
  alertPopupButtonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: R.Dimens.MarginLarge,
    marginHorizontal: R.Dimens.MarginLarge,
  },
  alertPopupButtonItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: R.Dimens.MarginLarge / 2,
  },
  alertPopupButtonTextMain: {
    color: '#1A1A1A',
    fontFamily: R.Fonts.Bold,
  },
  alertPopupButtonTextSub: {
    color: '#323F4B',
  },
  alertPopupContent: {
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertPopupContentOnlyPaddingTop: {
    paddingTop: 32,
  },
  alertPopupMessage: {
    color: '#323F4B',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: R.Fonts.Regular,
    fontWeight: '500',
  },
  alertPopupTitle: {
    color: '#323F4B',
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: R.Fonts.Bold,
  },

  iconView: {
    width: 64,
    height: 64,
    marginBottom: R.Dimens.MarginLarge,
    backgroundColor: '#F7F6F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 99,
    width: '100%',
    height: '100%',
    backgroundColor: '#0000001A',
  },
})

export type PopupConfig = {
  autoClose?: boolean
  buttonLayout?: FlexLayout
  buttons?: PopupButtonProps[]
  customTitleForCancelButton?: string
  dontUseCancelButton?: boolean
  message: string | React.ReactNode
  title?: string
  img?: number
  icon?: string
  onDefaultButtonPressCallback?: () => void
}

type ToastProp = {
  message: string | React.ReactNode
  paddingBottom?: number
  type?: string
  position?: string
  style: ViewStyle
}

function Toast({ message, paddingBottom, type, position, style }: ToastProp): JSX.Element {
  let backgroundColor = R.Colors.Red
  let icon = ''
  let textColor = R.Colors.AlertToastText

  switch (type) {
    case 'success': {
      backgroundColor = R.Colors.Success
      icon = 'check-circle'
      textColor = R.Colors.White
      break
    }
    case 'warning': {
      backgroundColor = R.Colors.Red
      textColor = R.Colors.White
      break
    }
    default: {
      backgroundColor = R.Colors.Primary
      break
    }
  }
  return (
    <Animated.View
      style={[
        styles.alertToastPanel,
        {
          backgroundColor,
          paddingBottom,
        },
        style,
        position === 'float'
          ? [
              styles.floatToast,
              {
                backgroundColor,
              },
            ]
          : {},
      ]}
    >
      {icon ? <R.Icon name={icon} size={20} color={textColor} /> : null}
      <AppText style={[styles.alertToastText, { color: textColor }]}>{message}</AppText>
    </Animated.View>
  )
}

type PopupProps = {
  buttonLayout: FlexLayout
  buttons: PopupButtonProps[]
  isLoadingAtPositive: boolean
  isVisible: boolean
  message: string | React.ReactNode
  onPopupButtonPressed: (func?: () => void) => void
  title?: string
  img?: number
  icon?: string
}

function Loading({ isVisible }: { isVisible: boolean }): JSX.Element {
  if (!isVisible) {
    return <View />
  }
  return (
    <View style={styles.loading}>
      <AppIndicator />
    </View>
  )
}

function Popup({
  buttons,
  isVisible,
  onPopupButtonPressed,
  message,
  title,
  img,
  icon,
  buttonLayout,
}: PopupProps): JSX.Element {
  return (
    <Modal style={styles.alertModal} isVisible={isVisible} useNativeDriver>
      <View style={styles.alertPopup}>
        <View style={styles.alertPopupContent}>
          {img ? (
            <AppImage
              style={{ width: 64, height: 64, marginBottom: R.Dimens.MarginLarge }}
              source={img}
            />
          ) : null}
          {icon ? (
            <View style={styles.iconView}>
              <R.Icon name={icon} size={32} color={'#262627'} />
            </View>
          ) : null}
          {title ? <AppText style={styles.alertPopupTitle} text={title} numberOfLines={2} /> : null}
          <AppText style={styles.alertPopupMessage}>{message}</AppText>
        </View>
        <View
          style={[
            styles.alertPopupButtonContainer,
            {
              flexDirection: buttonLayout || 'row',
            },
          ]}
        >
          {buttons &&
            buttons.map(({ onPress, label, type, loading }, index) => {
              const width =
                buttons.length > 1 && (!buttonLayout || buttonLayout === 'row')
                  ? (ContentWidth - R.Dimens.MarginLarge * (buttons.length + 1)) / buttons.length
                  : ContentWidth - R.Dimens.MarginLarge * 2

              if (type === 'none') {
                return (
                  <AppTouchable
                    key={index}
                    onPress={(): void => {
                      onPopupButtonPressed(onPress)
                    }}
                  >
                    <AppText text={label} style={[R.Styles.h4Bold, { marginRight: 0 }]} />
                  </AppTouchable>
                )
              } else {
                return (
                  <AppButton
                    loading={loading}
                    type={type}
                    key={index}
                    width={width}
                    containerStyle={styles.alertPopupButtonItem}
                    onPress={(): void => {
                      onPopupButtonPressed(onPress)
                    }}
                    title={label}
                  />
                )
              }
            })}
        </View>
      </View>
    </Modal>
  )
}

export default function AlertContainer(props: Props): JSX.Element {
  const inset = useSafeArea()

  const [popupTitle, setPopupTitle] = useState<string>()
  const [message, setMessage] = useState<string | React.ReactNode>('')
  const [toastMessage, setToastMessage] = useState<string | React.ReactNode>('')
  const [toastType, setToastType] = useState('notice')
  const [toastPosition, setToastPosition] = useState('bottom')
  const [popupVisible, setPopupVisible] = useState(false)
  const [popupAutoClose, setPopupAutoClose] = useState(true)
  const [popupButtonLayout, setPopupButtonLayout] = useState<FlexLayout>('row')
  const [popupImg, setPopUpImg] = useState<number | undefined>()
  const [popupIcon, setPopupIcon] = useState<string | undefined>()
  const [popupActions, setPopupActions] = useState<PopupButtonProps[]>([])
  const [loading, setLoading] = useState(false)
  const toastTranslateY = useRef(new Animated.Value(40)).current

  const popup = useCallback((popupConfig: PopupConfig): void => {
    const {
      autoClose,
      buttons = [],
      buttonLayout,
      dontUseCancelButton,
      customTitleForCancelButton,
      message: msg,
      title,
      img,
      icon,
      onDefaultButtonPressCallback,
    } = popupConfig

    if (typeof autoClose === 'boolean' && !autoClose) {
      setPopupAutoClose(false)
    }
    setPopUpImg(img)
    setPopupIcon(icon)
    setPopupVisible(true)
    setPopupTitle(title)

    setMessage(msg)
    if (buttonLayout) {
      setPopupButtonLayout(buttonLayout)
    }
    if (
      dontUseCancelButton === undefined ||
      (typeof dontUseCancelButton === 'boolean' && !dontUseCancelButton)
    ) {
      buttons.unshift({
        label: customTitleForCancelButton || R.I18n.t('Yes'),
        onPress: (): void => {
          setPopupVisible(false)
          if (onDefaultButtonPressCallback) {
            setTimeout(() => {
              onDefaultButtonPressCallback()
            }, 500)
          }
        },
        type: 'primary',
      })
    }
    setPopupActions(buttons)
  }, [])

  const popupDismiss = useCallback((): void => setPopupVisible(false), [])
  const showLoading = useCallback((): void => setLoading(true), [])
  const hideLoading = useCallback((): void => setLoading(false), [])
  const toast = useCallback(
    ({
      msg,
      autoHide = true,
      position = 'float',
      type = 'notice',
      isTabbarHidden = true,
    }: {
      msg: string
      autoHide: boolean
      position: 'bottom' | 'float'
      type: 'notice' | 'warning' | 'success'
      isTabbarHidden: boolean
    }) => {
      const tabbarHeight = isTabbarHidden ? 0 : R.Dimens.TabBarHeight
      const disappear = (isDisappear = true): void => {
        const floatValue = isDisappear ? 100 : -(tabbarHeight + (inset.bottom ? 16 : 0) + 32)
        const bottomValue = isDisappear ? 100 : 0
        return Animated.timing(toastTranslateY, {
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          toValue: position === 'float' ? floatValue : bottomValue,
          useNativeDriver: true,
        }).start()
      }
      setToastMessage(msg)
      setToastPosition(position)
      setToastType(type)
      disappear(false)
      if (autoHide) {
        setTimeout(disappear, 2000)
      }
    },
    [],
  )

  const toastDismiss = (): void =>
    Animated.timing(toastTranslateY, {
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      toValue: 500,
      useNativeDriver: true,
    }).start()

  const handlePopupButtonPressed = useCallback(
    (buttonPress?: () => void) => {
      popupAutoClose && setPopupVisible(false)
      if (buttonPress) {
        buttonPress()
      }
    },
    [popupAutoClose],
  )

  const [isLoadingAtPositive, setLoadingAtPositive] = useState(false)
  return (
    <AlertContext.Provider
      value={{
        popup,
        popupDismiss,
        setLoadingAtPositive,
        toast,
        toastDismiss,
        showLoading,
        hideLoading,
      }}
    >
      <View style={{ flex: 1 }}>
        {props.children}
        <Toast
          paddingBottom={inset.bottom ? 16 : 0}
          message={toastMessage}
          type={toastType}
          position={toastPosition}
          style={{
            transform: [
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                translateY: toastTranslateY as any,
              },
            ],
          }}
        />
        <Popup
          isLoadingAtPositive={isLoadingAtPositive}
          buttonLayout={popupButtonLayout}
          buttons={popupActions}
          isVisible={popupVisible}
          message={message}
          title={popupTitle}
          onPopupButtonPressed={handlePopupButtonPressed}
          img={popupImg}
          icon={popupIcon}
        />
        <Loading isVisible={loading} />
      </View>
    </AlertContext.Provider>
  )
}
