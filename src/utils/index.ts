import { IChargeAmount, ITransaction } from '@modal'
import R from '@resource'
import { COST_TYPE } from '@resource/Enums'
import currency from 'currency.js'
// @ts-ignore
import diacritic from 'diacritic'

export const formatCurrency = (
  value: number,
  currencyData = R.Enums.CURRENCY_DATA?.[R.Enums.CURRENCY_TYPE.VND],
  precision = 0,
) =>
  currency(value, {
    symbol: currencyData.symbol,
    precision: precision,
  }).format()

export const getCurrencyValue = (
  value: number,
  currencyData = R.Enums.CURRENCY_DATA?.[R.Enums.CURRENCY_TYPE.USD],
  precision = 0,
) => {
  return currency(value, {
    symbol: currencyData.symbol,
    precision: precision,
  }).dollars()
}

export function numberWithCommas(numb: string | number | undefined) {
  if (typeof numb === 'number') {
    return numb.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  } else if (typeof numb === 'string') {
    return numb.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  } else {
    return ''
  }
}

export function validUrl(path: string | undefined) {
  const urlRegrex = /^(^http[s]?:\/{2})|(^www)|(^\/{1,2})/g
  const res = urlRegrex.test(path ?? '')
  return res
}

export function getAppCode(refix: string, id: number | string) {
  return `${refix}${id?.toString().padStart(5, '0')}`
}

export function getChargeAmount(charge: IChargeAmount, total: number) {
  return `${numberWithCommas(charge?.value)}${
    charge?.type === COST_TYPE[COST_TYPE.Percent]
      ? `% (${numberWithCommas((charge.value * total) / 100)})`
      : ''
  }`
}

export function getTakeoutName(transaction?: ITransaction) {
  if (!transaction) {
    return null
  }
  return `TA-${transaction.id}`
}

export function removeAccents(text: string) {
  return diacritic.clean(text)
}
