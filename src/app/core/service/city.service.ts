import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CityDataInterface} from "../models/city-data.interface";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  obsCities: BehaviorSubject<CityDataInterface[] | null> = new BehaviorSubject<CityDataInterface[] | null>(null);

  constructor(private http: HttpClient) {
  }

  get(filter: any) {
    let params = new HttpParams();
    for (const key in filter) {
      filter[key] ? params = params.append(key, filter[key]) : null;
    }

    this.http.get<CityDataInterface>(`${environment.apiUrl}/City/GetAll`, {params: params}).subscribe(res => {
      this.obsCities.next(res?.data);
    });
  }

  getAll(filter: any) {
    let params = new HttpParams();
    for (const key in filter) {
      filter[key] ? params = params.append(key, filter[key]) : null;
    }

    this.http.get<CityDataInterface>(`${environment.apiUrl}/City/List`, {params: params}).subscribe(res => {
      this.obsCities.next(res?.data);
    });
  }
}
