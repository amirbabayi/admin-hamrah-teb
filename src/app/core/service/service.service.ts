import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserInterface} from "../models/user.interface";
import {ServiceDataInterface} from "../models/service-data.interface";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) {
  }

  getAll(filter: any | null = null) {
    let params = new HttpParams();
    for (const key in filter) {
      filter[key] ? params = params.append(key, filter[key]) : null;
    }

    return this.http.get<ServiceDataInterface>(`${environment.apiUrl}/Service/List`, {params: params});
  }

  get(filter: any | null = null) {
    let params = new HttpParams();
    for (const key in filter) {
      filter[key] ? params = params.append(key, filter[key]) : null;
    }

    return this.http.get<ServiceDataInterface>(`${environment.apiUrl}/Service/GetAll`, {params: params});
  }

  add(value: UserInterface) {
    return this.http.post<ServiceDataInterface>(`${environment.apiUrl}/Service/Create`, value);
  }

  delete(customerId: number) {
    return this.http.post<ServiceDataInterface>(`${environment.apiUrl}/Service/Delete/${customerId}`, '');
  }

  update(value: UserInterface) {
    return this.http.post<ServiceDataInterface>(`${environment.apiUrl}/Service/Update`, value);
  }

  getOtherList(filter: any | null = null) {
    let params = new HttpParams();
    for (const key in filter) {
      filter[key] ? params = params.append(key, filter[key]) : null;
    }

    return this.http.get<ServiceDataInterface>(`${environment.apiUrl}/Service/OtherList`, {params: params});
  }
}
