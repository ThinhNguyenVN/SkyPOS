import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import socket from '@utils/socket'
import { AppButton } from '@uikit'
import R from '@resource'

export default function ChatScreen() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [fooEvents, setFooEvents] = useState<any[]>([])

  useEffect(() => {
    function onConnect() {
      console.log('ON CONNECT TO SOCKET -------- ')
      setIsConnected(true)
    }

    function onDisconnect() {
      console.log('ON DISCONNECT TO SOCKET -------- ')
      setIsConnected(false)
    }

    function onFooEvent(value: any) {
      console.log('ON FooEvent -------- ', value)
      setFooEvents((previous: any) => [...previous, value])
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('foo', onFooEvent)

    socket.on('newMessage', (data) => {
      console.log('GET new Message -------- ', data)
    })

    return () => {
      socket.disconnect()
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('foo', onFooEvent)
    }
  }, [])

  console.log('Connected :: ', isConnected)
  console.log('fooEvents : ', fooEvents)

  return (
    <View style={R.Styles.container}>
      <Text>ChatScreen</Text>
      <AppButton
        title={'Connect'}
        type={'primary'}
        onPress={() => {
          socket.connect()
        }}
      />
      <AppButton
        title={'Disconnect'}
        type={'destructive'}
        onPress={() => {
          socket.disconnect()
        }}
      />
      <AppButton
        title={'Send some text'}
        onPress={() => {
          socket.disconnect()
        }}
      />
    </View>
  )
}
