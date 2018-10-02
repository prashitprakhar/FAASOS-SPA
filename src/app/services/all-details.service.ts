import { Injectable } from '@angular/core';
import { HttpRequestsService } from './http-requests.service';
import { BehaviorSubject } from '../../../node_modules/rxjs';
import { Observable } from '../../../node_modules/rxjs';
import { environment } from './../../environments/environment'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AllDetailsService {

  public apiUrl = environment.API_BASE.faasos_api;

  constructor(private httpRequestsService : HttpRequestsService) { }

  getAllData() {
    return this.httpRequestsService.getAPI(this.apiUrl+'alldata');
  }

  updateOrderStatus(orderId) {
    return this.httpRequestsService.patchAPI(this.apiUrl+'updatestatus/'+orderId)
  }

}
