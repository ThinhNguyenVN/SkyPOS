import { View } from 'react-native'
import React from 'react'
import { makeStyles } from '@rneui/base'
import R from '@resource'
import { AppButton, AppInput } from '@uikit'
import { useCreateTransaction } from '@hook/userOrder'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootNavigationProp, RootStackParamList } from 'src/modal/navigator'

const useStyles = makeStyles(() => ({
  container: {
    ...R.Styles.container,
    padding: R.Dimens.MarginMedium,
  },
}))
export default function StartTransactionScreen() {
  const styles = useStyles()
  const createTransaction = useCreateTransaction()
  const route = useRoute<RouteProp<RootStackParamList, 'StartTransaction'>>()
  const { table } = route.params || {}
  const navigation = useNavigation<RootNavigationProp>()
  const onOrderPress = () => {
    createTransaction.mutateAsync({ shopId: 1, tableId: table?.id }).then((transaction) => {
      if (transaction?.id) {
        navigation.replace('TransactionDetail', { transactionId: transaction.id })
        navigation.navigate('AddOrder', { transaction })
      }
    })
  }
  return (
    <View style={styles.container}>
      <AppInput label="Table" />
      <AppInput label="Customer number" keyboardType="number-pad" />
      <AppInput label="Customer name" />

      <View style={R.Styles.bottom}>
        <AppButton title={'Start Order'} size="large" type={'primary'} onPress={onOrderPress} />
      </View>
    </View>
  )
}
