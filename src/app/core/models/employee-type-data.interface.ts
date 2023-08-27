import {EmployeeTypeBodyInterface} from "./employee-type-body.interface";

export interface EmployeeTypeDataInterface {
  data: null,
  errors: string,
  extra: EmployeeTypeBodyInterface[],
  id: number,
  longid: number,
  message: string,
  recordsFiltered: string,
  recordsTotal: string,
  status: number
}
