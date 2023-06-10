import {
  createTransaction,
  createOrders,
  getTransaction,
  updateOrder,
  finishTransaction,
  updateTransaction,
  getOrders,
} from '@api/index'
import type { IOrder, ITransaction } from '@modal'

import { AxiosError } from 'axios'
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query'

export const useCreateTransaction = (): UseMutationResult<
  ITransaction,
  AxiosError,
  ITransaction,
  unknown
> => {
  return useMutation(createTransaction)
}

export const useUpdateTransaction = (): UseMutationResult<
  ITransaction,
  AxiosError,
  { transaction: ITransaction; id: number },
  unknown
> => {
  return useMutation(updateTransaction)
}

export const useCreateOrders = (): UseMutationResult<IOrder[], AxiosError, IOrder[], unknown> => {
  return useMutation(createOrders)
}
export const useUpdateOrder = (): UseMutationResult<
  IOrder,
  AxiosError,
  { id: number; order: IOrder },
  unknown
> => {
  return useMutation(updateOrder)
}

export const useGetOrders = (): UseQueryResult<IOrder[], AxiosError> => {
  return useQuery(['orders'], getOrders)
}

export const useGetTransaction = (id?: number): UseQueryResult<ITransaction, AxiosError> => {
  return useQuery(
    ['transaction', id],
    () => {
      if (id) {
        return getTransaction(id)
      }
      return null
    },
    { enabled: !!id },
  )
}

export const useFinishTransaction = (): UseMutationResult<
  ITransaction,
  AxiosError,
  { id: number; transaction: ITransaction },
  unknown
> => {
  return useMutation(finishTransaction)
}
