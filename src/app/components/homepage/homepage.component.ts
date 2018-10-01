import { Component, OnInit, OnChanges } from '@angular/core';
import { OrdersService } from './../../services/orders.service';
import { PredictionsService } from './../../services/predictions.service';
import { Observable } from './../../../../node_modules/rxjs';
import { BehaviorSubject } from './../../../../node_modules/rxjs';
import { resolve } from 'path';

interface ObjectForTable {
  productId: number,
  productName: string,
  quantity: number,
  createdTillNow: number,
  predictedQuantity: number,
  status: boolean,
  predictionId: string,
  orderId: string,
  orderTimestamp: Date
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnChanges {

  public allOrderDetails: any = [];
  public allProducts: any = [];
  public productID: any = [];
  public productName: any = [];
  public allPredictionDetails: any = [];
  public entryForTable: any = [];
  public allPredictionFilteredResults: any = [];
  public allOrderedFilteredResults: any = [];
  public allDataArray: any = [];
  public updatedUniqueData: any = [];
  public _updatedData = {};
  public allPredictionDataForUpdates : any = [];
  public isUpdating: boolean = false;
  public updatedOrders : any = [];

  public _allUpdatedData = new BehaviorSubject<any>({ ...this._updatedData });


  public dataForTable: ObjectForTable = {
    productId: null,
    productName: '',
    quantity: null,
    createdTillNow: null,
    predictedQuantity: null,
    status: false,
    predictionId: '',
    orderId: '',
    orderTimestamp: null
  }

  constructor(private ordersService: OrdersService,
    private predictionsService: PredictionsService) { }

  ngOnInit() {
    this.allOrderDetails = [];
    this.allPredictionDetails = [];
    this.ordersService.getAllOrders().subscribe(orders => {
      Object.keys(orders).map(key => {
        this.allOrderDetails.push(orders[key]);
      });
    });

    this.predictionsService.getAllPredictionsForTable().subscribe(data => {
      this.allPredictionDetails = [];
      Object.keys(data).map(key => {
        this.allPredictionDetails.push(data[key]);
      });
      this.allPredictionDataForUpdates = this.allPredictionDetails;
      this.combineOrderedAndPredictedData()
    });
    // this.getAllOrders();
    // this.getAllPredictionsForTable();
    // this.combineOrderedAndPredictedData();
  }

  ngOnChanges() {
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& called ng on changes &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    this.getAllOrders();
    this.getAllPredictionsForTable();
    this.combineOrderedAndPredictedData();
  }

  getAllOrders() {
    this.ordersService.getAllOrders().subscribe(orders => {
      Object.keys(orders).map(key => {
        this.allOrderDetails.push(orders[key]);
      });
    })
  }

  getAllPredictionsForTable()  {
    //return new Promise((resolve, reject) => {
      this.predictionsService.getAllPredictionsForTable().subscribe(data => {
        Object.keys(data).map(key => {
          this.allPredictionDetails.push(data[key]);
        });
      });
      // if(this.allPredictionDetails.length > 0){
      //   return resolve(this.allPredictionDetails)
      // } else {
      //   return reject()
      // }
    //})
    
  }

  combineOrderedAndPredictedData() {
    // this.getAllPredictionsForTable().then(data => {
    //   console.log("data : ",data)
    // })
    
    this.allOrderedFilteredResults = [];
    this.allPredictionFilteredResults = [];
    console.log("allOrderDetails combined : ",this.allOrderDetails)
    console.log("all Perdictions details : ",this.allPredictionDetails)
    console.log(" updatedOrders ###############",this.updatedOrders)
    // if(this.updatedOrders.length > 0){
    //   this.allOrderDetails = this.updatedOrders;
    // }
    this.allOrderDetails.forEach(eachOrder => {
      //if(){
        if (eachOrder.status === false) {/////

        //console.log("eachOrder : ",eachOrder);
        this.entryForTable = this.allPredictionDetails.filter(prediction => {
          //console.log("eachOrder.status true",eachOrder.status,' eachOrder.productID',eachOrder.productid)
       
          if (eachOrder.productid === prediction.productid) {
            console.log("Came here_________________------------------__________________")
            this.allOrderedFilteredResults.push(eachOrder);
            this.allPredictionFilteredResults.push(prediction); //Added Here
            return eachOrder.productid === prediction.productid
          }
        })
      }////
    //)
        //console.log("entryForTable : ",this.entryForTable)
     // });
    //} else {
       //console.log("all this.allOrderedFilteredResults details : ",this.allOrderedFilteredResults)
       //console.log("allPredictionFilteredResults : ",this.allPredictionFilteredResults);
      // this.entryForTable = this.allPredictionDataForUpdates.filter(prediction => {
      //   if (!eachOrder.status) {
      //     if (eachOrder.productid === prediction.productid) {
      //       this.allOrderedFilteredResults.push(eachOrder);
      //       this.allPredictionFilteredResults.push(prediction); //Added Here
      //       return eachOrder.productid === prediction.productid
      //     }
      //   } else {
      //     return;
      //   }
        //console.log("entryForTable : ",this.entryForTable)
     // });
    //}
    });
    this.createObjectForReport(this.allPredictionFilteredResults, this.allOrderedFilteredResults)

    // Removed from here
  }

  createObjectForReport(predictionArray: any[], orderArray: any[]) {
    console.log("predictionArray : ",predictionArray)
    console.log("orderArray : ",orderArray)
    let index = 0;
    this.updatedUniqueData = [];
    if(predictionArray.length > 0 && orderArray.length > 0){
    predictionArray.forEach(element => {
      if (orderArray.length > 0) {
        this.dataForTable = {
          productId: element.productid,
          productName: element.productname,
          quantity: orderArray[index].quantity,
          createdTillNow: null,
          predictedQuantity: element.predictedquantity,
          status: orderArray[index].status,
          predictionId: element._id,
          orderId: orderArray[index]._id,
          orderTimestamp: orderArray[index].timestamp
        }
      } else {
        this.dataForTable = {
          productId: element.productid,
          productName: element.productname,
          quantity: 0,
          createdTillNow: null,
          predictedQuantity: element.predictedquantity,
          status: null,
          predictionId: element._id,
          orderId: null,
          orderTimestamp: null
        }
      }
      this.updatedUniqueData.push(this.dataForTable);
      index++;
    });

  }

    //To add those objects for which there is no Orders but there is prediction
    //let filteredResult: any = [];
    let allUnaccountedEntriesArray: any = [];
    let uniqueProductIDArray: any = [];
    if(uniqueProductIDArray.length > 0){
    this.updatedUniqueData.forEach(element => {
      uniqueProductIDArray.push(element.productId);
    });
    console.log(" uniqueProductIDArray : ",uniqueProductIDArray)
    let predictionArrayPlayground: any[] = this.allPredictionDetails;
    let ordersArrayPlayground = this.allOrderDetails;
    uniqueProductIDArray.forEach(element => {
      predictionArrayPlayground.filter(function (item, index, object) {
        if (item.productid === element) {
          object.splice(index, 1)
        }
      });
      ordersArrayPlayground.filter(function (item, index, object) {
        if (item.productid === element) {
          object.splice(index, 1)
        }
      });
    });
    allUnaccountedEntriesArray.push(ordersArrayPlayground);
    allUnaccountedEntriesArray.push(predictionArrayPlayground);
  } else {
    allUnaccountedEntriesArray.push(this.allOrderDetails);
    allUnaccountedEntriesArray.push(this.allPredictionDetails);
  }
    
    //let allJoinedDataArray = [...predictionArray, ...allUnaccountedEntriesArray]
    this.createObjectForUnAccountedEntries(allUnaccountedEntriesArray);

  }

  createObjectForUnAccountedEntries(allUnaccountedEntriesArray) {
    console.log("allUnaccountedEntriesArray123123123 : ", allUnaccountedEntriesArray);
    if (allUnaccountedEntriesArray.length > 0) {
      allUnaccountedEntriesArray.forEach(element => {
        let counter = 0;
        console.log("Element tttttttttttttttttttttttttttttttttttttttttttttttt",element)
        if (element.length > 0) {
          console.log("RRRRrrrrwdsdnsdndsndksbddrreererrerere",element[counter].status === false)
          if (element[counter].status === false) {
            console.log("@@@@@@@@@@!%!!%!%!%!%!%!%!%!%!%%!%!%!!!!!!!!!!!!!%%%%%%%%%%%%%%%%!%!%!%!%!%%!!%%!")
            element.forEach(elem => {
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!W!!!!!!!!!!!!!!!!!!!!!!!!!!! status : ",element)
              this.dataForTable = {
                productId: elem.productid,
                productName: elem.productname,
                quantity: elem.quantity,
                createdTillNow: null,
                predictedQuantity: null,
                status: elem.status,
                predictionId: null,
                orderId: elem._id,
                orderTimestamp: elem.timestamp
              }
              this.updatedUniqueData.push(this.dataForTable);
              counter++;
            });
          } else if (element[counter].predictedquantity) {
            console.log("dskhgadgjhdgdad,k@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            element.forEach(elemen => {
              this.dataForTable = {
                productId: elemen.productid,
                productName: elemen.productname,
                quantity: null,
                createdTillNow: null,
                predictedQuantity: elemen.predictedquantity,
                status: elemen.status,
                predictionId: elemen._id,
                orderId: null,
                orderTimestamp: null
              }
              this.updatedUniqueData.push(this.dataForTable);
              counter++;
            });
          }
        }
      });
      console.log("updatedUniqueData %^%^%^%^%^%^%^%^%^%^%^%^%%%^%^ ",this.updatedUniqueData)
    }
    this.isUpdating = false;
  }

  updateStatus(order) {
    //console.log("order @@@@@@@@@@@",order)
    this.isUpdating = true;
    this.allOrderDetails = [];
    this.ordersService.updateOrderStatus(order.orderId).subscribe(updatedOrders => {
      //this.allOrderDetails = [];
      console.log("updatedOrders : ",updatedOrders)
      this.updatedOrders = updatedOrders;
      // Object.keys(updatedOrders).map(key => {
      //   this.allOrderDetails.push(updatedOrders[key]);
      //   //this._allUpdatedData.next(this.allOrderDetails);
      // });
      // if(this.allOrderDetails.length>0){
      //   console.log("allOrderDetails updated : ",this.allOrderDetails);
      //   //console.log("allPredictionDetails updated : ",this.allPredictionDetails);
      //   this.combineOrderedAndPredictedDataUpdated();
      // }
      // if(updatedOrders.length > 0 ){
      //   this.combineOrderedAndPredictedData();
      // }
      
    });

    this.ngOnChanges();
    
  }

  combineOrderedAndPredictedDataUpdated() {
    console.log("predicted data@@@@@@@@@!!!!!!!!!!!!!!!! : ",this.allPredictionDetails);
    console.log("allOrderData@@@@@@@@@@@@!!!!!!!!!!!  :",this.allOrderDetails);
    let allpredicts = [];
    this.predictionsService.getAllPredictionsForTable().subscribe(data => {
      Object.keys(data).map(key => {
        allpredicts.push(data[key]);
      });
    });

    console.log("all predicts : ",allpredicts)
  }

}
