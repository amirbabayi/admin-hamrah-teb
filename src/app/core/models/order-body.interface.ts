export interface OrderBodyInterface {
  id: number,
  clientId: number,
  employeeId: number,
  description: string,
  status: number,
  createdAt: string,
  modifiedAt: string,
  orderItems: [
    {
      id: number,
      orderId: number,
      serviceId: number,
      price: number,
      quantity: number,
      createdAt: string,
      modifiedAt: string
    }
  ]
}
