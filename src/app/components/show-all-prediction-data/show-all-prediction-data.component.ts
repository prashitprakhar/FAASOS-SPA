import { Component, OnInit } from '@angular/core';
import { PredictionsService } from './../../services/predictions.service';
import { Observable } from './../../../../node_modules/rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-all-prediction-data',
  templateUrl: './show-all-prediction-data.component.html',
  styleUrls: ['./show-all-prediction-data.component.css']
})
export class ShowAllPredictionDataComponent implements OnInit {

  //public allPredictedData:any = [];
  public allPredictionDetails: any = [];
  //public dataForTable: Observable<any>;
  //public allProductId: any = [];
  //public allProductName: any = [];
  //public allPredictedQuantity: any = [];
  //public allTimestamp: any = [];
  constructor(private predictionsService : PredictionsService,
             private router : Router) { }
  public displayedColumns: string[] = ['productid', 'productname', 'predictedquantity'];

  ngOnInit() {
    this.predictionsService.getAllPredictionsForTable().subscribe(data => {
      Object.keys(data).map(key => {
        this.allPredictionDetails.push(data[key]);
      });
    });
  }

  navigateToAllOrders() {
    this.router.navigate(['/orders']);
  }

  NavigateToCreatePrediction() {
    this.router.navigate(['/predictions']);
  }

}
