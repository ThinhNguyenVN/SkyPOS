import React, { useContext, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import R from '@resource'
import { makeStyles } from '@rneui/base'
import ListItemView from '@view/ListItemView'
import { getAppCode, numberWithCommas } from '@utils/index'
import { AppButton, AppText } from '@uikit'
import { RefreshControl, View } from 'react-native'
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { RootNavigationProp, RootStackParamList } from 'src/modal/navigator'
import { LeftButton } from '@view/HeaderView'
import { useFinishTransaction, useGetTransaction } from '@hook/userOrder'
import { ORDER_STATUS, PAYMENT_TYPE } from '@resource/Enums'
import { AlertContext, PopupButtonProps } from '@container/AlertContainer'
import { useDidUpdateEffect } from '@hook/index'

const useStyles = makeStyles(() => ({
  container: {
    ...R.Styles.container,
  },
  orderLabelIem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderNumber: {
    ...R.Styles.listItemLabel,
    color: R.Colors.Green,
    marginRight: 4,
  },
  amountView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 30,
    paddingVertical: R.Dimens.MarginLarge,
  },
  menu: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 32,
  },
  button: {
    marginBottom: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    zIndex: 10,
  },
}))

export default function TransactionDetailScreen() {
  const styles = useStyles()
  const navigation = useNavigation<RootNavigationProp>()
  const route = useRoute<RouteProp<RootStackParamList, 'TransactionDetail'>>()
  const { transactionId } = route.params
  const { data: transaction, refetch } = useGetTransaction(transactionId)
  const [refreshing, setRefreshing] = useState(false)
  const [finishLoading, setFinishLoading] = useState(false)
  const [printLoading, setPrintLoading] = useState(false)
  const [cancelLoading, setCancelLoading] = useState(false)
  const finishTransaction = useFinishTransaction()
  const isFocused = useIsFocused()
  const { toast, popup } = useContext(AlertContext)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LeftButton icon={'ic-cart'} onPress={onAddToCart} />,
      title: transaction?.code ?? getAppCode('T', transaction?.id ?? 0),
    })
  }, [navigation, transaction])

  useDidUpdateEffect(() => {
    if (isFocused) {
      refetch()
    }
  }, [isFocused])

  const onAddToCart = () => {
    if (transaction) {
      navigation.navigate('AddOrder', { transaction })
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    refetch().finally(() => {
      setRefreshing(false)
    })
  }

  const onFinish = () => {
    setFinishLoading(true)
    const transactionParam = {
      status: ORDER_STATUS[ORDER_STATUS.Completed] as keyof typeof ORDER_STATUS,
      paymentType: PAYMENT_TYPE[PAYMENT_TYPE.Cash] as keyof typeof PAYMENT_TYPE,
      customerCash: transaction?.totalAmount,
    }
    finishTransaction
      .mutateAsync({ id: transactionId, transaction: transactionParam })
      .finally(() => {
        setFinishLoading(false)
        navigation.goBack()
      })
  }
  const onCancel = () => {
    const buttons: PopupButtonProps[] = [
      {
        label: 'Yes',
        onPress: (): void => {
          setCancelLoading(true)
          const transactionParam = {
            status: ORDER_STATUS[ORDER_STATUS.Canceled] as keyof typeof ORDER_STATUS,
          }
          finishTransaction
            .mutateAsync({ id: transactionId, transaction: transactionParam })
            .finally(() => {
              setCancelLoading(false)
              navigation.goBack()
            })
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
      message: 'Are you sure you want to cancel this transaction?',
      icon: 'x',
      buttons,
      dontUseCancelButton: true,
      buttonLayout: 'column',
    })
  }

  const onPrint = () => {
    toast({ msg: 'Printing ...', autoHide: true })
  }

  const onOrdersPress = () => {
    if (transaction) {
      navigation.navigate('OrderList', { transaction })
    }
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <ListItemView
        sectionTitle={'Table Information'}
        label={transaction?.table?.category?.name ?? ''}
        text={transaction?.table?.name ?? ''}
        readOnly
      />

      <ListItemView label={'Customer name'} text={transaction?.customerName} />
      <ListItemView label={'Customer number'} text={transaction?.numberCustomer?.toString()} />
      <ListItemView
        sectionTitle={'Order Information'}
        label={
          <View style={styles.orderLabelIem}>
            <AppText style={styles.orderNumber}>{transaction?.totalOrder}</AppText>
            <R.Icon name={'layers'} size={18} color={R.Colors.Green} />
          </View>
        }
        text={numberWithCommas(transaction?.totalProductSellingPrice)}
        textStyle={{ color: R.Colors.Green }}
        onPress={onOrdersPress}
      />

      <ListItemView
        label={'Service Charge'}
        text={numberWithCommas(transaction?.serviceCharge)}
        textStyle={{ color: R.Colors.Green }}
      />
      <ListItemView
        label={'Discount'}
        text={numberWithCommas(transaction?.discount?.value)}
        textStyle={{ color: R.Colors.Red }}
      />
      {!!transaction?.taxRate && (
        <ListItemView
          label={'Tax'}
          text={numberWithCommas(transaction?.taxRate)}
          readOnly
          textStyle={{ color: R.Colors.Green }}
        />
      )}
      <View style={styles.amountView}>
        <AppText style={R.Styles.amount}>Total </AppText>
        <AppText style={R.Styles.amount}>
          {numberWithCommas(numberWithCommas(transaction?.totalAmount))}
        </AppText>
      </View>
      <View style={styles.menu}>
        <AppButton
          title={'Finish'}
          type={'primary'}
          size={'large'}
          style={styles.button}
          icon={'check'}
          loading={finishLoading}
          iconLeft
          onPress={onFinish}
        />

        <AppButton
          title={'Print bill'}
          type={'secondary'}
          size={'large'}
          icon={'printer'}
          style={styles.button}
          loading={printLoading}
          onPress={onPrint}
          iconLeft
        />
        <AppButton
          title={'Cancel'}
          type={'destructive'}
          size={'large'}
          icon={'x'}
          style={styles.button}
          iconLeft
          loading={cancelLoading}
          onPress={onCancel}
        />
      </View>
    </ScrollView>
  )
}
