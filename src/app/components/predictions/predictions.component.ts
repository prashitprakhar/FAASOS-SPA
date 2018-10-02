import { Component, OnInit } from '@angular/core';
import { PredictionsService } from './../../services/predictions.service';

interface PredictionsPayload  {
  prediction : {
    predictedquantity : number
  }
}

@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.css']
})



export class PredictionsComponent implements OnInit {


  public allProducts: any;
  public productID: any = [];
  public productName: any = [];
  public productObjectID : any = []

  public selectedProductName: string;
  public selectedProduct: any;
  public predictedQuantity: number;
  public selectedProductObject: any ;

  public predictionPayload : PredictionsPayload = {
    prediction : {
      predictedquantity : 0
    }
  }

  constructor(private predictionsService : PredictionsService) { 
    this.predictionsService.subscribeProducts().subscribe(data => {
      if(data.length > 0){
        this.allProducts = data;
      }
    });
  }

  ngOnInit() {
  }

  filterProducts(selectedProductName: any) {
    this.selectedProductName = selectedProductName;
  }

  preparePayload(){
    this.selectedProduct = this.allProducts.filter(data => {
      return this.selectedProductName === data.productname
    });
    this.predictionPayload = {
      prediction : {
        predictedquantity : this.predictedQuantity
      }
    }
  }

  sendPrediction() {
    //console.log("product",this.selectedProductObject)
    this.preparePayload();
    this.predictionsService.sendPrediction(this.predictionPayload, this.selectedProductObject);
  }

}
