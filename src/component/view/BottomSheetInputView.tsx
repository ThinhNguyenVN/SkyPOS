import React, { useRef, useState, forwardRef, useImperativeHandle, Ref } from 'react'
import { View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import BottomSheetTopView from './BottomSheetTopView'
import R from '@resource'
import { AppBottomSheet, AppButton } from '@uikit'
import { IChargeAmount } from '@modal'

type BottomSheetInputViewProps = {
  onChangeValue: (value: string | IChargeAmount) => void
  title: string
  renderInput: () => JSX.Element
  height?: number
}

export type BottomSheetInputViewRefType = {
  open: () => void
  close: () => void
  setValue: (text?: string | IChargeAmount) => void
}

const BottomSheetInputView = forwardRef(
  (
    { onChangeValue, title, renderInput, height }: BottomSheetInputViewProps,
    ref: Ref<BottomSheetInputViewRefType>,
  ): JSX.Element => {
    const bottomSheetRef = useRef<Modalize>()
    const [enable, setEnable] = useState(false)
    const [value, setValue] = useState<string | IChargeAmount>()
    useImperativeHandle(ref, () => ({
      open() {
        bottomSheetRef.current?.open()
        setValue(undefined)
        setEnable(false)
      },
      close() {
        bottomSheetRef.current?.close()
      },
      setValue(val?: string | IChargeAmount) {
        setValue(val)
        setEnable(!!val)
      },
    }))
    const onClosePress = () => {
      bottomSheetRef.current?.close()
    }
    const onSavePress = () => {
      if (value) {
        onChangeValue(value)
        bottomSheetRef.current?.close()
      }
    }
    return (
      <AppBottomSheet
        adjustToContentHeight
        ref={bottomSheetRef}
        HeaderComponent={
          <BottomSheetTopView
            disableRightButton={!enable}
            title={title}
            onRightButtonPress={onSavePress}
            onClosePress={onClosePress}
          />
        }
      >
        <View
          style={{
            marginVertical: 32,
            marginHorizontal: 16,
            maxHeight: height ? height - 100 : R.Dimens.BottomSheetDefaultHeight,
            minHeight: 300,
          }}
        >
          {renderInput()}
          <AppButton
            title={'OK'}
            type={'primary'}
            size="small"
            onPress={onSavePress}
            disabled={!enable}
            containerStyle={{ alignSelf: 'center' }}
          />
        </View>
      </AppBottomSheet>
    )
  },
)
export default BottomSheetInputView
