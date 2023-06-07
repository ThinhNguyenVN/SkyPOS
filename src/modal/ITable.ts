import { TABLE_STATUS } from '@resource/Enums'
import ITableCategory from './ITableCategory'
import ITransaction from './ITransaction'

export default interface ITable {
  id: number
  name: string
  code?: string
  status: TABLE_STATUS
  category: ITableCategory
  categoryId: number
  isDisplay: boolean
  maxCustomer?: number
  displayOrder?: number
  transactionId?: number
  createUserId?: number
  updateUserId?: number
  isDeleted?: boolean
  createDate?: Date
  updateDate?: Date
  transaction: ITransaction
}
