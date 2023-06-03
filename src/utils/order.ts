import { IOrder, IProduct, ITransaction } from '@modal'
import R from '@resource'

export const calculateOrder = (order: IOrder, quantity: number, product?: IProduct): IOrder => {
  const productPrice = product?.price ?? 0
  order.quantity = quantity
  order.totalPrice = quantity * productPrice
  order.amount = order.totalPrice - (order.discount?.value ?? 0) + (order.serviceCharge ?? 0)
  return order
}

export const createOrder = (product: IProduct, transaction?: ITransaction): IOrder => {
  const order: IOrder = {
    quantity: 1,
    productId: product?.id,
    product: product,
    transactionId: transaction?.id ?? 1, // TODO:
    status: R.Enums.ORDER_STATUS.Pending,
  }
  return calculateOrder(order, 1, product)
}

export const updateOrderList = (
  transaction: ITransaction | undefined,
  orders: IOrder[],
  quantity: number,
  product?: IProduct,
  order?: IOrder,
): IOrder[] => {
  const tmpOrders = [...orders]

  const tmpProduct = product || order?.product
  let existingOrder =
    order || (!!tmpOrders?.length && tmpOrders.find((o) => o?.product?.id === tmpProduct?.id))
  if (!existingOrder) {
    if (!!tmpProduct) {
      const order: IOrder = createOrder(tmpProduct, transaction)
      tmpOrders.push(order)
    }
  } else {
    existingOrder = calculateOrder(existingOrder, quantity, tmpProduct)
  }
  return tmpOrders.filter((o) => o.quantity !== 0)
}
