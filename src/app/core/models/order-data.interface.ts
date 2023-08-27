import {OrderBodyInterface} from "./order-body.interface";

export interface OrderDataInterface {
  data?: OrderBodyInterface | any,
  errors?: string,
  extra?: OrderBodyInterface,
  id?: number,
  longid?: number,
  message?: string,
  recordsFiltered?: string,
  recordsTotal: string,
  status?: number
}
