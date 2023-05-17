import { getTableCategoryList, getTableList } from '@api/index'
import type { ITable, ITableCategory } from '@modal'

import { AxiosError } from 'axios'
import { useQuery, UseQueryResult } from 'react-query'

export const useGetTableList = (): UseQueryResult<ITable[], AxiosError> => {
  return useQuery('table-list', getTableList)
}

export const useGetTableCategoryList = (): UseQueryResult<ITableCategory[], AxiosError> => {
  return useQuery('tableCategory-list', getTableCategoryList)
}
