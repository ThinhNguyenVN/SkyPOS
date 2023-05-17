export const ENV = {
  DEVELOP: 'dev',
  PRODUCTION: 'pro',
}

export const TABS = {
  Table: 'Table',
  Order: 'Order',
  History: 'History',
  AddOrder: 'AddOrder',
} as const

export const MAIN_TABS = [TABS.Table, TABS.Order, TABS.History, TABS.AddOrder]

export const CURRENCY_LIST = [
  {
    value: 'usd',
    label: 'USD',
  },
  {
    value: 'jpy',
    label: 'JPY',
  },
  {
    value: 'vnd',
    label: 'VNĐ',
  },
]

export enum CURRENCY_TYPE {
  USD = 'usd',
  JPY = 'jpy',
  SGD = 'sgd',
  VND = 'vnd',
}

export const CURRENCY_DATA = {
  usd: {
    type: 'en-US',
    currency: 'USD',
    symbol: '$',
  },
  jpy: {
    type: 'ja-JP',
    currency: 'JPY',
    symbol: '¥',
  },
  sgd: {
    type: 'zh-SG',
    currency: 'SGD',
    symbol: 'SGD',
  },
  vnd: {
    type: 'vi-VN',
    currency: 'VND',
    symbol: 'đ',
  },
}
