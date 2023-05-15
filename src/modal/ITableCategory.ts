/* @flow */
import type ITable from './ITable'
export default interface ITableCategory {
  id: string
  displayOrder: number
  printerId: string
  name: string
  code: string
  tableCount: number
  tables: Array<ITable>
}
