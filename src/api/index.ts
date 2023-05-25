import Config from 'react-native-config'
import axios from 'axios'
import type { IProductCategory, ITable, ITableCategory, ITransaction } from '@modal'
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

export const getTableCategoryList = async (): Promise<ITableCategory[]> => {
  const res = await api.get('/tables/categories/').then((res) => res.data)
  return res.data
}

export const createTransaction = async (transaction: ITransaction): Promise<ITransaction> => {
  const res = await api.post('/transactions/', transaction).then((res) => res.data)
  return res.data
}

export const getProductCategories = async (): Promise<IProductCategory[]> => {
  const res = await api.get('/products/categories').then((res) => res.data)
  return res.data
}
