import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  constructor(private httpClient : HttpClient) { }

  getAPI(url, params?): Observable<any>{
      return this.httpClient.get(url)
  }

  postAPI(url, payload) : Observable<any> {
    return this.httpClient.post(url, payload);
  }

  patchAPI(url, payload?, queryparams?) : Observable<any> {

    //if(queryparams){
      //this.createParamString(queryparams)
      console.log("this.mangleUrl(url, queryparams) : ",this.mangleUrl(url, queryparams))
      if(queryparams){
        return this.httpClient.patch(this.mangleUrl(url, queryparams), payload);  
      } else {
        return this.httpClient.patch(url, payload);
      }
      
    //}
    //this.mangleUrl(url, params)
    //return this.httpClient.patch(url, payload);
  }

  createParamString(queryParams) : any {

  }

  private mangleUrl(url: string, params?: any): string {
    let updatedUrl = this.appendParams(url, params);
    return updatedUrl;
  }

  private appendParams(url, params: any = {}) : any{
    console.log("params from append",params)
    const qsEncoded = Object.keys(params).map(p => `${p}=${params[p]}`).join('&');
    return `${url}?${qsEncoded}`;
  }


}
