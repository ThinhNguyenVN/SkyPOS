import Config from 'react-native-config'
import axios from 'axios'
import type ITable from '@modal/ITable'
import R from '@resource'
import ITableCategory from '@modal/ITableCategory'

const api = axios.create({
  baseURL: `${Config.API_URL}/api`,
  timeout: R.Constants.REQUEST_TIMEOUT,
  headers: { Accept: 'application/vnd.github.v3+json' },
  withCredentials: true,
})

export const getTableList = async (): Promise<ITable[]> => {
  const res = await api.get('/table/list').then((result) => result.data)
  return res.data
}

export const getTableCategoryList = async (): Promise<ITableCategory[]> => {
  const res = await api.get('/tableCategory/list').then((result) => result.data)
  return res.data
}
