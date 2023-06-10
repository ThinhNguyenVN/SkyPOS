import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppInput, { type AppInputProps } from './AppInput'
import AppText from './AppText'
import R from '@resource'
import { COST_TYPE } from '@resource/Enums'
import AppSelectDropDown from './AppSelectDropDown'
import { numberWithCommas } from '@utils/index'
import { IChargeAmount } from '@modal'

const styles = StyleSheet.create({
  container: {},
  selectBoxContainer: {
    top: 17,
    right: 10,
    position: 'absolute',
    zIndex: 2,
    height: 40,
    width: 60,
  },
  selectBox: {
    backgroundColor: R.Colors.Border,

    borderRadius: 8,

    justifyContent: 'center',
    alignContent: 'center',
  },
  selectBoxText: {
    color: R.Colors.White,
    textAlign: 'center',
    fontFamily: R.Fonts.Bold,
    fontSize: 16,
    paddingBottom: 2,
  },
  amount: {
    ...R.Styles.h4,
    color: R.Colors.Green,
    textAlign: 'center',
    marginBottom: 8,
  },
})
interface Props extends Omit<AppInputProps, 'value'> {
  type?: string
  value?: number
  maxValue?: number
  onChanged?: (charge?: IChargeAmount) => void
}

export default function AppChargeValueInput(props: Props) {
  const items = [
    { label: 'vnd', value: COST_TYPE[COST_TYPE.Amount] },
    { label: '%', value: COST_TYPE[COST_TYPE.Percent] },
  ]

  const [type, setType] = useState(props.type || items[0].value)
  const [value, setValue] = useState(props.value ?? 0)
  const [error, setError] = useState('')

  useEffect(() => {
    setValue(value)
  }, [props.value])

  useEffect(() => {
    setType(type)
  }, [props.type])

  const validate = (numb: number) => {
    if (props.maxValue) {
      if (type == COST_TYPE[COST_TYPE.Percent] && numb > 100) {
        props.onChanged && props.onChanged(undefined)
        setError('Percentages are always less than 100%.')
        return false
      } else if (type == COST_TYPE[COST_TYPE.Amount] && numb > props.maxValue) {
        props.onChanged && props.onChanged(undefined)
        setError(`The amount are always less than ${props.maxValue}.`)
        return false
      }
    }
    setError('')
    return true
  }

  const onValueChange = (val: string) => {
    const numb = parseInt(val ? val.replace(/,/g, '') : '0')
    if (!validate(numb)) {
      return
    }

    setValue(numb)
    if (!!props.onChanged) {
      props.onChanged({ value: numb, type })
    }
  }

  const onTypeChange = (val: string) => {
    setValue(0)
    setType(val)
    if (!!props.onChanged) {
      props.onChanged({ value, type: val })
    }
  }

  return (
    <View style={styles.container}>
      <AppInput
        {...props}
        value={(value ?? 0).toString()}
        keyboardType={'number-pad'}
        inputType={'currency'}
        selectTextOnFocus
        inputStyle={{ textAlign: 'right', paddingRight: 60 }}
        onChangeText={onValueChange}
        error={error}
      />
      <AppText
        text={
          type === COST_TYPE[COST_TYPE.Percent] && props.maxValue
            ? numberWithCommas((props.maxValue * value) / 100)
            : ''
        }
        style={styles.amount}
      />

      <AppSelectDropDown
        data={items}
        inputStyle={styles.selectBox}
        containerStyle={styles.selectBoxContainer}
        textStyle={styles.selectBoxText}
        value={props.type}
        onSelectedValue={onTypeChange}
      />
    </View>
  )
}
