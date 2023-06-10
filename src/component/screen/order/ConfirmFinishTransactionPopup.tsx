import { View, StyleSheet } from 'react-native'
import React, { Ref, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import R from '@resource'
import Modal from 'react-native-modal'
import { AppButton, AppInput, AppSelectInput, AppText, AppTouchable, SelectItemType } from '@uikit'
import { PAYMENT_TYPE } from '@resource/Enums'
import * as yup from 'yup'
import { numberWithCommas } from '@utils/index'

const ContentWidth = R.Dimens.MaxWidth - 2 * R.Dimens.MarginLarge

const styles = StyleSheet.create({
  container: { alignItems: 'center', flexDirection: 'row' },
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
    marginBottom: R.Dimens.MarginMedium,
    marginHorizontal: R.Dimens.MarginLarge,
    marginRight: R.Dimens.MarginLarge + 32,
    flexDirection: 'row',
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
    paddingHorizontal: 32,
    paddingTop: 32,
    justifyContent: 'center',
  },
  alertPopupContentOnlyPaddingTop: {
    paddingTop: 32,
  },
  alertPopupMessage: {
    color: R.Colors.Green,
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: R.Fonts.Bold,
    marginBottom: 16,
  },
  alertPopupTitle: {
    color: '#323F4B',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: R.Fonts.Bold,
  },
  cancel: {
    ...R.Styles.h4Bold,
    marginRight: 0,
    color: R.Colors.Red,
  },
})

type Props = {
  onFinishTransaction: (callback: () => void, paymentMethod: string, cash: number) => void
  totalAmount: number
}

export type FinishPopupRefType = {
  open: () => void
  close: () => void
}

const data: SelectItemType[] = Object.values(PAYMENT_TYPE)
  .filter((v) => isNaN(Number(v)))
  .map((i) => ({ label: R.I18n.t(i.toString()), value: i }))

const ConfirmFinishTransactionPopup = forwardRef(
  ({ onFinishTransaction, totalAmount }: Props, ref: Ref<FinishPopupRefType>) => {
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState(data[0].value)
    const [cashAmount, setCashAmount] = useState(totalAmount)
    useImperativeHandle(ref, () => ({
      open() {
        setIsVisible(true)
      },
      close() {
        setIsVisible(false)
      },
    }))

    useEffect(() => {
      setCashAmount(totalAmount)
    }, [totalAmount])

    const onFinishPress = () => {
      setLoading(true)
      const callback = () => {
        setLoading(false)
      }
      onFinishTransaction(callback, paymentMethod as string, cashAmount)
    }

    const onChangeCash = (val: string) => {
      const numb = parseInt(val ? val.replace(/,/g, '') : '0')
      setCashAmount(numb)
    }

    return (
      <Modal style={styles.container} isVisible={isVisible} useNativeDriver>
        <View style={styles.alertPopup}>
          <View style={styles.alertPopupContent}>
            <AppText style={styles.alertPopupTitle} text={'Finish transaction'} />
            <AppText style={styles.alertPopupMessage} text={numberWithCommas(totalAmount)} />
            <AppSelectInput
              label={'Payment method'}
              data={data}
              onSelectedValue={setPaymentMethod}
              selectedValue={data[0].value as string}
            />
            {paymentMethod === PAYMENT_TYPE[PAYMENT_TYPE.Cash] && (
              <AppInput
                label={'Cash'}
                inputType="currency"
                keyboardType="number-pad"
                value={numberWithCommas(cashAmount)}
                selectTextOnFocus
                onChangeText={onChangeCash}
              />
            )}
          </View>

          <View style={styles.alertPopupButtonContainer}>
            <AppButton
              loading={loading}
              type={'primary'}
              width={(ContentWidth - 46) / 2}
              containerStyle={styles.alertPopupButtonItem}
              onPress={onFinishPress}
              title={'Finish'}
            />
            <AppTouchable
              onPress={(): void => {
                setIsVisible(false)
              }}
            >
              <AppText text={'Cancel'} style={styles.cancel} />
            </AppTouchable>
          </View>
        </View>
      </Modal>
    )
  },
)

export default ConfirmFinishTransactionPopup
