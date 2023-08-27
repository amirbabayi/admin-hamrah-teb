import {UserInterface} from "./user.interface";

export interface UserDataInterface {
  status: number,
  message?: string,
  errors?: string,
  id?: number,
  longid: number,
  extra?: UserInterface,
  data: UserInterface[],
  recordsTotal: number,
  recordsFiltered: number
}
