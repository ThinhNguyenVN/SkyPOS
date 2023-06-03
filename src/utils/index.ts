import R from '@resource'
import currency from 'currency.js'

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
    return null
  }
}

export function validUrl(path: string | undefined) {
  const urlRegrex = /^(^http[s]?:\/{2})|(^www)|(^\/{1,2})/g
  const res = urlRegrex.test(path ?? '')
  return res
}
