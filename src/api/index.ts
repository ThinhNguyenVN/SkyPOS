import Config from 'react-native-config'
import axios from 'axios'
import type { IOrder, IProductCategory, ITable, ITableCategory, ITransaction } from '@modal'
import R from '@resource'
import { Platform } from 'react-native'

const url = Platform.select({ ios: `${Config.API_URL}/api`, android: 'http://127.0.0.1:3000/api' })
const api = axios.create({
  baseURL: url,
  timeout: R.Constants.REQUEST_TIMEOUT,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: 'sky-pos',
    'content-type': 'application/json',
  },
  withCredentials: true,
})

console.log('.....', Config.API_URL)

export const getTableList = async (): Promise<ITable[]> => {
  const res = await api.get('/tables/').then((result) => result.data)
  return res.data
}

export const getTableCategoryList = async (): Promise<{
  categories: ITableCategory[]
  takeawayTransactions: ITransaction[]
}> => {
  console.log('getTableCategoryList ---')
  const res = await api.get('/tables/categories/').then((res) => res.data)
  console.log('getTableCategoryList ---', res)
  return res.data
}

export const createTransaction = async (transaction: ITransaction): Promise<ITransaction> => {
  const res = await api.post('/transactions/', transaction).then((res) => res.data)
  return res.data
}

export const updateTransaction = async ({
  transaction,
  id,
}: {
  transaction: ITransaction
  id: number
}): Promise<ITransaction> => {
  const res = await api.put(`/transactions/${id}`, transaction).then((res) => res.data)
  return res.data
}

export const createOrders = async (orders: IOrder[]): Promise<IOrder[]> => {
  const res = await api.post('/orders/', orders).then((res) => res.data)
  return res.data
}

export const updateOrder = async ({
  order,
  id,
}: {
  order: IOrder
  id: number
}): Promise<IOrder> => {
  const res = await api.put(`/orders/${id}`, order).then((res) => res.data)
  return res.data
}

export const getOrders = async (): Promise<IOrder[]> => {
  const res = await api.get(`/orders/`).then((res) => res.data)
  return res.data
}

export const finishTransaction = async ({
  transaction,
  id,
}: {
  transaction: ITransaction
  id: number
}): Promise<ITransaction> => {
  const res = await api.put(`/transactions/${id}/finish`, transaction).then((res) => res.data)
  return res.data
}

export const getProductCategories = async (): Promise<IProductCategory[]> => {
  const res = await api.get('/products/categories').then((res) => res.data)
  return res.data
}

export const getTransaction = async (id: number): Promise<ITransaction> => {
  const res = await api.get(`/transactions/${id}`).then((res) => res.data)
  return res.data
}
