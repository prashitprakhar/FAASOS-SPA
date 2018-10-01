import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { OrdersService } from './../../services/orders.service';
import { Observable, interval } from './../../../../node_modules/rxjs';
//import 'rxjs/add/observable/interval';
//import 'rxjs/Rx'


interface OrdersPayload  {
  productid : number,
  productname : string,
  quantity : number
}

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit, DoCheck {


  public allProducts: any;
  public productID: any = [];
  public productName: any = [];

  public selectedProductName: string;
  public selectedProduct: any;
  public orderedQuantity: number;

  public orderPayload : OrdersPayload = {
    productid : 0,
    productname : '',
    quantity : 0
  }

  public allOrdersForUser : any = [];
  public allOrderDetails: any = [];

  public sub : Observable<any>
  //private publicIp = require('public-ip');

  constructor(private ordersService : OrdersService) { 
    this.ordersService.subscribeAllProducts().subscribe(data => {
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
    // Observable.interval(2000 * 60).subscribe(x => {
    //   doSomething();
    // });
    new Observable(observer => {
      setInterval(() => { this.getAllOrders() }, 1000)
    })
      
    //);
    // let obs = Rx.Observable
    //             .interval(3000)
    this.getAllOrders()
    // setInterval( function() { 
    //   console.log("triggered...")
    //   this.ordersService.getAllOrders().subscribe(orders => {
    //   Object.keys(orders).map(key => {
    //     this.allOrdersForUser.push(orders[key]);
    //   });
    // }) }, 5000);
  }

  ngDoCheck() {
    //this.getAllOrders();
  }

  getAllOrders() {
    console.log("triggered")
    this.allOrdersForUser = []
    this.ordersService.getAllOrders().subscribe(orders => {
      this.allOrdersForUser = [];
      Object.keys(orders).map(key => {
        this.allOrdersForUser.push(orders[key]);
      });
    })
  }
  // createOrder() {

  // }

  filterProducts(selectedProductName: any) {
    this.selectedProductName = selectedProductName;
    //console.log("filterValue : ",filterValue)
  }

  preparePayload(){
    this.selectedProduct = this.allProducts.filter(data => {
      return this.selectedProductName === data.productname
    });
    this.orderPayload = {
      productid : this.selectedProduct[0].productid,
      productname : this.selectedProductName,
      quantity : this.orderedQuantity
    }
  }

  createOrder() {
    this.preparePayload();
    this.allOrdersForUser = []
    this.ordersService.createOrders(this.orderPayload).subscribe(orderDetails => {
      //this.allOrdersForUser = orderDetails;
      this.allOrdersForUser = []
      Object.keys(orderDetails).map(key => {
        this.allOrdersForUser.push(orderDetails[key]);
      });
    })
  }

  updateStatus(order) {
    //let allOrderDetailsUpdates = [];
    this.allOrdersForUser = []
    this.ordersService.updateOrderStatus(order._id).subscribe(updatedOrders => {
      this.allOrdersForUser = [];
      Object.keys(updatedOrders).map(key => {
        this.allOrdersForUser.push(updatedOrders[key]);
      });
    });
  }

}
