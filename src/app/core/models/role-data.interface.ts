import {RoleBodyInterface} from "./role-body.interface";

export interface RoleDataInterface {
  data: null,
  errors: string,
  extra: RoleBodyInterface[],
  id: number,
  longid: number,
  message: string,
  recordsFiltered: string,
  recordsTotal: string,
  status: number
}
