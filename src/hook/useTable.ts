import { getTableList } from '@api/index'
import type ITable from '@modal/ITable'
import { AxiosError } from 'axios'
import { useQuery, UseQueryResult } from 'react-query'

export const useGetTableList = (): UseQueryResult<ITable[], AxiosError> => {
  return useQuery('table-list', getTableList)
}
