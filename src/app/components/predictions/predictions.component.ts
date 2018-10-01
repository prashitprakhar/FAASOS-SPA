import { Component, OnInit } from '@angular/core';
import { PredictionsService } from './../../services/predictions.service';

interface PredictionsPayload  {
  productid : number,
  productname : string,
  predictedquantity : number
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

  public selectedProductName: string;
  public selectedProduct: any;
  public predictedQuantity: number;

  public predictionPayload : PredictionsPayload = {
    productid : 0,
    productname : '',
    predictedquantity : 0
  }

  constructor(private predictionsService : PredictionsService) { 
    this.predictionsService.subscribeProducts().subscribe(data => {
      this.allProducts = data.Products;
      if(this.allProducts){
        this.allProducts.map(data => {
          this.productID.push(data.productid);
          this.productName.push(data.productname);
        })
      }
    });
  }

  ngOnInit() {
  }

  filterProducts(selectedProductName: any) {
    this.selectedProductName = selectedProductName;
    //console.log("filterValue : ",filterValue)
  }

  preparePayload(){
    this.selectedProduct = this.allProducts.filter(data => {
      return this.selectedProductName === data.productname
    });
    this.predictionPayload = {
      productid : this.selectedProduct[0].productid,
      productname : this.selectedProductName,
      predictedquantity : this.predictedQuantity
    }
  }

  sendPrediction() {
    this.preparePayload();
    this.predictionsService.sendPrediction(this.predictionPayload);
  }

}
