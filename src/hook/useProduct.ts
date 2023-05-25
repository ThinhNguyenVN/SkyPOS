import { getProductCategories } from '@api/index'
import type { IProductCategory } from '@modal'

import { AxiosError } from 'axios'
import { useQuery, UseQueryResult } from 'react-query'

export const useGetProductCategories = (): UseQueryResult<IProductCategory[], AxiosError> => {
  return useQuery('product-categories', getProductCategories)
}
