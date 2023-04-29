import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import R from '../resource'
import { Modalize, ModalizeProps } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'

type AppBottomSheetProps = ModalizeProps

const AppBottomSheet = forwardRef(({ ...props }: AppBottomSheetProps, ref): JSX.Element => {
  const modalizeRef = useRef<Modalize>()
  useImperativeHandle(ref, () => ({
    open() {
      modalizeRef.current?.open()
    },
    close() {
      modalizeRef.current?.close()
    },
  }))
  return (
    <Portal>
      <Modalize
        ref={modalizeRef}
        snapPoint={R.Dimens.MaxHeight - (R.Dimens.TopBarHeight + 5)}
        overlayStyle={{
          backgroundColor: '#323F4B90',
        }}
        handlePosition={'inside'}
        {...props}
      >
        {props.children}
      </Modalize>
    </Portal>
  )
})

export default AppBottomSheet
