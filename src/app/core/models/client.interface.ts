import {ClientDataInterface} from "./client-data.interface";

export interface ClientInterface {
  status?: number,
  message?: string,
  errors?: string,
  id?: string,
  longid?: number,
  extra?: string | any,
  data?: ClientDataInterface[] | any,
  recordsTotal: number,
  recordsFiltered?: number
}
