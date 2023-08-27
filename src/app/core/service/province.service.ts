import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CityDataInterface} from "../models/city-data.interface";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private http: HttpClient) {
  }

  get() {
    return this.http.get<CityDataInterface>(`${environment.apiUrl}/Province/GetAll`);
  }

  getAll() {
    return this.http.get<CityDataInterface>(`${environment.apiUrl}/Province/List`);
  }
}
