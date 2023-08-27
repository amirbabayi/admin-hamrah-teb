import {ServiceBodyInterface} from "./service-body.interface";

export interface ServiceDataInterface {
  data?: ServiceBodyInterface[] | any,
  errors?: string,
  extra?: ServiceBodyInterface[],
  id?: number,
  longid?: number,
  message?: string,
  recordsFiltered?: string,
  recordsTotal: string,
  status?: number
}
