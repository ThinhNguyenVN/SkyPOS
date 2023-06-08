import { useContext, useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { AlertContext, PopupButtonProps } from '../component/container/AlertContainer'
import { RootNavigationProp } from 'src/modal/navigator'
import { useStateCallback } from './index'

export default function useConfirmGoBack() {
  const navigation = useNavigation<RootNavigationProp>()
  const { popup } = useContext(AlertContext)
  const [hasChange, setHasChange] = useStateCallback(false)
  const confirm = (e: any) => {
    const buttons: PopupButtonProps[] = [
      {
        label: 'Yes',
        onPress: (): void => {
          navigation.dispatch(e.data.action)
        },
        type: 'destructive',
      },
      {
        label: 'Cancel',
        type: 'none',
      },
    ]

    popup({
      title: '',
      message: 'Are you sure you want to close?',
      icon: 'log-out',
      buttons,
      dontUseCancelButton: true,
      buttonLayout: 'column',
    })
  }

  useEffect(() => {
    return navigation.addListener('beforeRemove', (e: { preventDefault: () => void }) => {
      if (!hasChange) {
        return
      }
      e.preventDefault()
      confirm(e)
    })
  }, [navigation, hasChange])

  return { setHasChange }
}
