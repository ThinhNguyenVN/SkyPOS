import { View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { makeStyles } from '@rneui/base'
import R from '@resource'
import { AppButton, AppInput, AppSelectInput, SelectItemType } from '@uikit'
import { useCreateTransaction } from '@hook/userOrder'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootNavigationProp, RootStackParamList } from 'src/modal/navigator'
import { useGetTableCategoryList } from '@hook/useTable'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const useStyles = makeStyles(() => ({
  container: {
    ...R.Styles.container,
    padding: R.Dimens.MarginMedium,
    paddingTop: 32,
  },
}))
export default function StartTransactionScreen() {
  const styles = useStyles()
  const createTransaction = useCreateTransaction()
  const { data } = useGetTableCategoryList()
  const route = useRoute<RouteProp<RootStackParamList, 'StartTransaction'>>()
  const { table } = route.params || {}
  const navigation = useNavigation<RootNavigationProp>()
  const [numberCustomer, setCustomerNumber] = useState(0)
  const [customerName, setCustomerName] = useState('')
  const [selectedTableId, setSelectedTableId] = useState(table?.id)
  const [loading, setLoading] = useState(false)

  const onOrderPress = () => {
    setLoading(true)
    createTransaction
      .mutateAsync({ shopId: 1, tableId: selectedTableId, customerName, numberCustomer })
      .then((transaction) => {
        if (transaction?.id) {
          navigation.replace('TransactionDetail', { transactionId: transaction.id })
          navigation.navigate('AddOrder', { transaction })
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const tableCategories = useMemo(() => {
    return data?.categories || []
  }, [data?.categories])

  const tableItems: SelectItemType[] = useMemo(() => {
    if (!tableCategories?.length) {
      return []
    }

    const tables = tableCategories.reduce((arr: SelectItemType[], category) => {
      if (category?.tables?.length) {
        arr = arr.concat(
          category?.tables
            .filter((tb) => !tb.transaction)
            .map((tb) => ({
              label: tb.name ?? '',
              value: tb.id ?? '',
            })),
        )
      }

      return arr
    }, [])
    tables.unshift({ label: 'Take away', value: '' })
    return tables
  }, [tableCategories])

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={R.Styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      extraScrollHeight={50}
    >
      <AppSelectInput
        label="Table"
        data={tableItems}
        placeholder="Select a table"
        selectedValue={table?.id}
        onSelectedValue={(selected) => setSelectedTableId(selected as number)}
      />

      <AppInput
        label="Customer number"
        keyboardType="number-pad"
        onChangeText={(value) => setCustomerNumber(parseInt(value))}
      />
      <AppInput label="Customer name" onChangeText={setCustomerName} />

      <View style={R.Styles.bottom}>
        <AppButton
          title={'Start Order'}
          size="large"
          type={'primary'}
          onPress={onOrderPress}
          loading={loading}
        />
      </View>
    </KeyboardAwareScrollView>
  )
}
