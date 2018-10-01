import { Injectable } from '@angular/core';
import { HttpRequestsService } from './http-requests.service';
import { BehaviorSubject } from '../../../node_modules/rxjs';
import { Observable } from '../../../node_modules/rxjs';
import { environment } from './../../environments/environment'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PredictionsService {

  public allProducts: any;

  public _products = {};
  public _predictions = {};
  public _entries = {};
  // {
  //   "productid":null,
  //   "productname":null,
  //   "predictedquantity":null,
  //   "timestamp":null
  // };
  private apiUrl = environment.API_BASE.faasos_api;
  private _allProducts = new BehaviorSubject<any>({ ...this._products });
  private _allPredictions = new BehaviorSubject<any>({ ...this._predictions });
  private _allEntries = new BehaviorSubject<any>({ ...this._entries });

  constructor(private httpRequestsService: HttpRequestsService,
    private router: Router) { }

  getAllProducts() {
    this.httpRequestsService.getAPI('./../assets/all-products.json')
      .subscribe(data => {
        this._products = data;
        this._allProducts.next(data);
      })
  }

  subscribeProducts(): Observable<any> {
    this.getAllProducts();
    return this._allProducts.asObservable();
  }

  sendPrediction(payload) {
    this.httpRequestsService.postAPI(this.apiUrl + 'prediction', payload).subscribe(data => {
      this._allPredictions.next(data);
      if (data) {
        this.router.navigate(['/allPredictions']);
      }
    });
  }

  subscribeAllPredictedData() {
    return this._allPredictions.asObservable();
  }

  getAllPredictionsForTable(): Observable<any> {
    this.httpRequestsService.getAPI(this.apiUrl+'allpredictions').subscribe(data => {
      if(data) {
        this._allEntries.next(data);
      }
    })
    return this._allEntries.asObservable();
  }

  // subscribeAllData() {
  //   return this._allEntries.asObservable();
  // }

}
