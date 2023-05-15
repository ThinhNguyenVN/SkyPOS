import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { AppText } from '@uikit'
import R from '@resource'
import { useGetTableList } from '@hook/useTable'

export default function TableScreen() {
  const { data, error } = useGetTableList()
  console.log('QUERY RESPONSE : ', data, error?.message)
  useEffect(() => {
    data?.map((table) => {
      console.log('LOG ITEM : ', table.name)
    })
  }, [data])
  return (
    <View>
      <AppText>{R.I18n.t('Hello')}</AppText>
      <Text>TableScreen</Text>
    </View>
  )
}
