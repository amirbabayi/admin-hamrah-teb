import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserInterface} from "../models/user.interface";
import {UserDataInterface} from "../models/user-data.interface";
import {RoleDataInterface} from "../models/role-data.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  get(filter: any | null = null) {
    let params = new HttpParams();
    for (const key in filter) {
      filter[key] ? params = params.append(key, filter[key]) : null;
    }

    return this.http.get<UserDataInterface>(`${environment.apiUrl}/User/GetAll`, {params: params});
  }

  add(value: UserInterface) {
    return this.http.post<UserDataInterface>(`${environment.apiUrl}/User/Create`, value);
  }

  delete(customerId: number) {
    return this.http.post<UserDataInterface>(`${environment.apiUrl}/User/Delete/${customerId}`, '');
  }

  update(value: UserInterface) {
    return this.http.post<UserDataInterface>(`${environment.apiUrl}/User/Update`, value);
  }

  getRoles() {
    return this.http.get<RoleDataInterface>(`${environment.apiUrl}/User/GetAllRoles`);
  }
}
