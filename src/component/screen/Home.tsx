import { View, ScrollView } from 'react-native'
import React, { useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import RNConfig from 'react-native-config'
//import R from '@resource'
import * as yup from 'yup'
import {
  AppImage,
  AppQuantityControl,
  AppTouchable,
  AppInput,
  AppBottomSheet,
  AppButton,
  AppText,
} from '@uikit'

import { Modalize } from 'react-native-modalize'
import R from '@resource'
import BottomSheetTopView from '@view/BottomSheetTopView'
import { INavigator } from '@modal'

export default function Home() {
  const navigation = useNavigation<INavigator.RootNavigationProp>()
  const sortBottomSheetRef = useRef<Modalize>()
  const renderMoreMenu = () => {
    return (
      <AppBottomSheet
        ref={sortBottomSheetRef}
        adjustToContentHeight
        HeaderComponent={<BottomSheetTopView title={'More'} />}
      >
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            padding: 32,
            minHeight: 150,
          }}
        >
          <AppButton
            type={'primary'}
            size="large"
            title="Primary button"
            onPress={() => sortBottomSheetRef.current?.close()}
            containerStyle={{ paddingBottom: 16 }}
          />
          <AppButton
            type={'secondary'}
            size="small"
            title="Secondary"
            onPress={() => sortBottomSheetRef.current?.close()}
            containerStyle={{ paddingBottom: 16 }}
          />
          <AppImage source={R.Images.img_default} height={100} />
          <AppQuantityControl
            onValueChange={(value) => {
              console.log(value)
            }}
            max={10}
            clearable
          />
          <AppInput
            width={R.Dimens.MaxWidth - 32}
            label="이메일 또는 휴대폰 번호"
            placeholder="이메일 또는 휴대폰 번호를 입력해주세요"
            validate={
              yup.number().typeError('enter number format')
              // //.string()
              // .email('Please enter email format')
              // .required('Please enter email')
            }
          />
        </View>
      </AppBottomSheet>
    )
  }
  return (
    <ScrollView style={R.Styles.scrollContainer}>
      <AppText>Home</AppText>
      <AppText
        style={{
          fontFamily: R.Fonts.Bold,
          fontSize: 16,
        }}
      >{`Xin chào, đây là ${RNConfig.ENVIRONMENT}`}</AppText>

      <AppTouchable onPress={() => navigation.navigate('Detail', { id: 1 })}>
        <AppText>Detail</AppText>
        <R.Icon name={'Request'} size={24} color={'red'} />
      </AppTouchable>
      <AppTouchable
        onPress={() => {
          sortBottomSheetRef.current?.open()
        }}
      >
        <AppText>More ...</AppText>
      </AppTouchable>
      {renderMoreMenu()}
    </ScrollView>
  )
}
