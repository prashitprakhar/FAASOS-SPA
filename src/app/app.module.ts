import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { OrdersDisplayComponent } from './components/orders-display/orders-display.component';
import { PredictionsComponent } from './components/predictions/predictions.component';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';
import { ShowAllPredictionDataComponent } from './components/show-all-prediction-data/show-all-prediction-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { AllDetailsComponent } from './components/all-details/all-details.component';
import { SuccessPageComponent } from './components/success-page/success-page.component';
import { FailurePageComponent } from './components/failure-page/failure-page.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersDisplayComponent,
    PredictionsComponent,
    NotfoundpageComponent,
    ShowAllPredictionDataComponent,
    CreateOrderComponent,
    AllDetailsComponent,
    SuccessPageComponent,
    FailurePageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    RouterModule.forRoot([
      {
        path : '',
        component : AllDetailsComponent
      },
      {
        path : 'createorder',
        component : CreateOrderComponent
      },
      {
        path : 'orders',
        component : OrdersDisplayComponent
      },
      {
        path : 'predictions',
        component : PredictionsComponent
      },
      {
        path : 'allPredictions',
        component : ShowAllPredictionDataComponent
      },
      {
        path : 'ordersuccess',
        component : SuccessPageComponent
      },
      {
        path : 'orderfailure',
        component : FailurePageComponent
      },
      {
        path : '**',
        component : NotfoundpageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
