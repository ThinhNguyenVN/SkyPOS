import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { RootNavigationProp } from '../../modal/navigator'
import RNConfig from 'react-native-config'

export default function Home() {
  const navigation = useNavigation<RootNavigationProp>()
  return (
    <View>
      <Text>Home</Text>
      <Text>{`This is from ${RNConfig.ENVIRONMENT}`}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: 1 })}>
        <Text>Detail</Text>
      </TouchableOpacity>
    </View>
  )
}
