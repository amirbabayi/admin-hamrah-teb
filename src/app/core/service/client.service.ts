import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ClientInterface} from "../models/client.interface";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {
  }

  get(filter: any | null = null) {
    let params = new HttpParams();
    for (const key in filter) {
      filter[key] ? params = params.append(key, filter[key]) : null;
    }

    return this.http.get<ClientInterface>(`${environment.apiUrl}/Client/GetAll`, {params: params});
  }

  getAll(filter: any | null = null) {
    let params = new HttpParams();
    for (const key in filter) {
      filter[key] ? params = params.append(key, filter[key]) : null;
    }

    return this.http.get<ClientInterface>(`${environment.apiUrl}/Client/List`, {params: params});
  }

  add(value: ClientInterface) {
    return this.http.post<ClientInterface>(`${environment.apiUrl}/Client/Create`, value);
  }

  delete(customerId: number) {
    return this.http.post<ClientInterface>(`${environment.apiUrl}/Client/Delete/${customerId}`, '');
  }

  update(value: ClientInterface) {
    return this.http.post<ClientInterface>(`${environment.apiUrl}/Client/Update`, value);
  }

  getWithPhoneNumber(phoneNumber: string) {
    return this.http.get<ClientInterface>(`${environment.apiUrl}/Client/GetByPhone/${phoneNumber}`);
  }
}
