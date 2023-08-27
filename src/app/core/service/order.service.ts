import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserInterface} from "../models/user.interface";
import {OrderDataInterface} from "../models/order-data.interface";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  get(filter: any | null = null) {
    let params = new HttpParams();
    for (const key in filter) {
      filter[key] ? params = params.append(key, filter[key]) : null;
    }

    return this.http.get<OrderDataInterface>(`${environment.apiUrl}/Order/List`, {params: params});
  }

  getAll(filter: any | null = null) {
    let params = new HttpParams();
    for (const key in filter) {
      filter[key] ? params = params.append(key, filter[key]) : null;
    }

    return this.http.get<OrderDataInterface>(`${environment.apiUrl}/Order/GetAll`, {params: params});
  }

  getClientOrder(clientId: number) {
    return this.http.get<OrderDataInterface>(`${environment.apiUrl}/Order/GetByClientId/${clientId}`);
  }

  add(value: UserInterface) {
    return this.http.post<OrderDataInterface>(`${environment.apiUrl}/Order/Create`, value);
  }

  delete(customerId: number) {
    return this.http.post<OrderDataInterface>(`${environment.apiUrl}/Order/Delete/${customerId}`, '');
  }

  update(value: UserInterface) {
    return this.http.post<OrderDataInterface>(`${environment.apiUrl}/Order/Update`, value);
  }

  getOrderItemsById(id: number) {
    return this.http.get<OrderDataInterface>(`${environment.apiUrl}/Order/GetById/${id}`);
  }

  editOrderItem(value: any) {
    return this.http.post<OrderDataInterface>(`${environment.apiUrl}/Order/EditOrderItem`, value);
  }

  addOrderItem(value: any) {
    return this.http.post<OrderDataInterface>(`${environment.apiUrl}/Order/AddItemToOrder`, value);
  }

  deleteOrderItem(value: any) {
    return this.http.post<OrderDataInterface>(`${environment.apiUrl}/Order/RemoveItemFromOrder`, value);
  }

  getUnAssignOrders() {
    return this.http.get<OrderDataInterface>(`${environment.apiUrl}/Order/GetAllUnAssignOrder`);
  }

  getMyOrders(filter: any | null = null) {
    let params = new HttpParams();
    for (const key in filter) {
      filter[key] ? params = params.append(key, filter[key]) : null;
    }

    return this.http.get<OrderDataInterface>(`${environment.apiUrl}/Order/GetEmployeeOrders`, {params});
  }

  acceptOrder(orderId: number) {
    return this.http.post<OrderDataInterface>(`${environment.apiUrl}/Order/AcceptOrder/${orderId}`, '');
  }

  OnClientWay(orderId: number) {
    return this.http.post<OrderDataInterface>(`${environment.apiUrl}/Order/ChangeStatusToOnClientWay/${orderId}`, '');
  }

  OnClientLocation(orderId: number) {
    return this.http.post<OrderDataInterface>(`${environment.apiUrl}/Order/ChangeStatusToOnClientLocation/${orderId}`, '');
  }

  orderDone(orderId: number) {
    return this.http.post<OrderDataInterface>(`${environment.apiUrl}/Order/ChangeStatusToDone/${orderId}`, '');
  }

  orderPaid(orderId: number) {
    return this.http.post<OrderDataInterface>(`${environment.apiUrl}/Order/ManuallyChangeStatusToPaid/${orderId}`, '');
  }

  cancelOrder(orderId) {
    let params = new HttpParams()
    params = params.append('orderId', orderId);

    return this.http.post<OrderDataInterface>(`${environment.apiUrl}/Order/CancelOrder`, '', {params});
  }
}
