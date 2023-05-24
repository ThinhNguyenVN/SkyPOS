import { View } from 'react-native'
import React from 'react'
import { makeStyles } from '@rneui/base'
import R from '@resource'
import { AppButton, AppInput } from '@uikit'
import { useCreateTransaction } from '@hook/userOrder'
import { useNavigation } from '@react-navigation/native'
import { RootNavigationProp } from 'src/modal/navigator'

const useStyles = makeStyles(() => ({
  container: {
    ...R.Styles.container,
    padding: R.Dimens.MarginMedium,
  },
}))
export default function StartTransactionScreen() {
  const styles = useStyles()
  const createOder = useCreateTransaction()
  const navigation = useNavigation<RootNavigationProp>()
  const onOrderPress = () => {
    createOder.mutateAsync({ shopId: 1 }).then((transaction) => {
      console.log('create transaction result : ', transaction)
      if (transaction) {
        navigation.navigate('AddOrder', { transaction })
      }
    })
  }
  return (
    <View style={styles.container}>
      <AppInput label="Customer number" keyboardType="number-pad" />
      <AppInput label="Table" />
      <View style={R.Styles.bottom}>
        <AppButton title={'Start Order'} size="large" type={'primary'} onPress={onOrderPress} />
      </View>
    </View>
  )
}
