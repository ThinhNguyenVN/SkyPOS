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
