import Config from 'react-native-config'
import axios from 'axios'
import type { IOrder, IProductCategory, ITable, ITableCategory, ITransaction } from '@modal'
import R from '@resource'

const api = axios.create({
  baseURL: `${Config.API_URL}/api`,
  timeout: R.Constants.REQUEST_TIMEOUT,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: 'sky-pos',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export const getTableList = async (): Promise<ITable[]> => {
  const res = await api.get('/tables/').then((result) => result.data)
  return res.data
}

export const getTableCategoryList = async (): Promise<{
  categories: ITableCategory[]
  takeawayTransactions: ITransaction[]
}> => {
  const res = await api.get('/tables/categories/').then((res) => res.data)
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
