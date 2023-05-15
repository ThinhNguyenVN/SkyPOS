export default interface ITable {
  id: string
  name: string
  code: string
  color: string
  status: 'Ready' | 'Empty'
  maxCustomer: number
  isDisplay: boolean
  displayOrder: 0
}
