/* eslint-disable no-unused-vars */
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

export enum TABLE_STATUS {
  Empty,
  Ready,
}

export enum LOGIN_TYPE {
  Facebook,
  Google,
  Mail,
}

export enum GENDER {
  Male,
  Female,
  Other,
}

export enum PACKAGE {
  Trial,
  Premium,
  Family,
}

export enum ROLE {
  OWNER,
  MANAGER,
  STAFF,
}

export enum PAYMENT_TYPE {
  Cash,
  CreditCard,
  BankTransfer,
}

export enum ORDER_STATUS {
  Pending,
  Accepted,
  Rejected,
  Canceled,
  Completed,
}
