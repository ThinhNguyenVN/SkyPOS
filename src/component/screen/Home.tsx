import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { RootNavigationProp } from '../../modal/navigator'
import RNConfig from 'react-native-config'
import R from '../../resource'

export default function Home() {
  const navigation = useNavigation<RootNavigationProp>()
  return (
    <View>
      <Text>Home</Text>
      <Text
        style={{
          fontFamily: R.Fonts.Bold,
          fontSize: 16,
        }}
      >{`Xin chào, đây là ${RNConfig.ENVIRONMENT}`}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: 1 })}>
        <Text>Detail</Text>
        <R.Icon name={'Request'} size={24} color={'red'} />
      </TouchableOpacity>
    </View>
  )
}
