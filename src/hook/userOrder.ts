import { createTransaction } from '@api/index'
import type { ITransaction } from '@modal'

import { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'

export const useCreateTransaction = (): UseMutationResult<
  ITransaction,
  AxiosError,
  ITransaction,
  unknown
> => {
  return useMutation(createTransaction)
}
