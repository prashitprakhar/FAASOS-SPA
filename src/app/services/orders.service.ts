import { Injectable } from '@angular/core';
import { HttpRequestsService } from './http-requests.service';
import { BehaviorSubject } from '../../../node_modules/rxjs';
import { Observable } from '../../../node_modules/rxjs';
import { environment } from './../../environments/environment'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public apiUrl = environment.API_BASE.faasos_api;
  public _orders = {};
  public _updatedOrderStatus = {};
  public _products = {};
  public _placedOrders = {};

  public _allOrders = new BehaviorSubject<any>({ ...this._orders });
  public _allUpdatedOrderStatus = new BehaviorSubject<any>({ ...this._updatedOrderStatus });
  private _allProducts = new BehaviorSubject<any>({ ...this._products });
  private _allPlacedOrders = new BehaviorSubject<any>({ ...this._placedOrders });

  constructor(private httpRequestsService: HttpRequestsService,
    private router: Router) { }

  getAllProductsList() {
    this.httpRequestsService.getAPI('./../assets/all-products.json')
      .subscribe(data => {
        this._products = data;
        this._allProducts.next(data);
      })
  }

  subscribeAllProducts(): Observable<any> {
    this.getAllProductsList();
    return this._allProducts.asObservable();
  }

  createOrders(payload, product_id): Observable<any> {
    this.httpRequestsService.patchAPI(this.apiUrl + 'placeorder/' + product_id, payload).subscribe(data => {
      this._allPlacedOrders.next(data);
    });
    return this._allPlacedOrders.asObservable();
  }

  getAllOrders() {
    this.httpRequestsService.getAPI(this.apiUrl + 'allorders')
      .subscribe(data => {
        this._orders = data;
        this._allOrders.next(data);
      });
    return this._allOrders.asObservable();
  }

  subscribeAllOrders() {
    return this._allOrders.asObservable();
  }

  updateOrderStatus(id: number) {
    return this.httpRequestsService.patchAPI(this.apiUrl + 'order/' + id, { "status": true })
  }

  getAllData() {
    return this.httpRequestsService.getAPI(this.apiUrl + 'alldata')
  }

}
