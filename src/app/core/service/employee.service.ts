import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserDataInterface} from "../models/user-data.interface";
import {environment} from "../../../environments/environment";
import {UserInterface} from "../models/user.interface";
import {EmployeeTypeDataInterface} from "../models/employee-type-data.interface";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  get(filter: any | null = null) {
    let params = new HttpParams();
    for (const key in filter) {
      filter[key] ? params = params.append(key, filter[key]) : null;
    }

    return this.http.get<UserDataInterface>(`${environment.apiUrl}/Employee/GetAll`, {params: params});
  }

  getAll(filter: any | null = null) {
    let params = new HttpParams();
    for (const key in filter) {
      filter[key] ? params = params.append(key, filter[key]) : null;
    }

    return this.http.get<UserDataInterface>(`${environment.apiUrl}/Employee/List`, {params: params});
  }

  add(value: UserInterface) {
    return this.http.post<UserDataInterface>(`${environment.apiUrl}/Employee/Create`, value);
  }

  delete(customerId: number) {
    return this.http.post<UserDataInterface>(`${environment.apiUrl}/Employee/Delete/${customerId}`, '');
  }

  update(value: UserInterface) {
    return this.http.post<UserDataInterface>(`${environment.apiUrl}/Employee/Update`, value);
  }

  getEmployeeType() {
    return this.http.post<EmployeeTypeDataInterface>(`${environment.apiUrl}/Employee/GetEmployeeTypes`, '');
  }
}
