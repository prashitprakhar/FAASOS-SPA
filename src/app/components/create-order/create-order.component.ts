import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { OrdersService } from './../../services/orders.service';
import { Observable, interval } from './../../../../node_modules/rxjs';
import { Router } from '@angular/router';
//import 'rxjs/add/observable/interval';
//import 'rxjs/Rx'


interface OrdersPayload  {
  order : {
    username : string,
    orderedamount : number
  }
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
  public username: string;

  public orderPayload : OrdersPayload = {
    order : {
      username : '',
      orderedamount : 0
    }
  }

  public allOrdersForUser : any = [];
  public allOrderDetails: any = [];

  public sub : Observable<any>
  public successFlag : boolean;
  //private publicIp = require('public-ip');

  constructor(private ordersService : OrdersService, private router : Router) { 
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
    new Observable(observer => {
      setInterval(() => { this.getAllOrders() }, 1000)
    })
    //this.getAllOrders()
  }

  ngDoCheck() {
    //this.getAllOrders();
  }

  getAllOrders() {
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
      order : {
        username : this.username,
        orderedamount : this.orderedQuantity
      }
    }
  }

  createOrder() {
    this.preparePayload();
    this.allOrdersForUser = []
    this.ordersService.createOrders(this.orderPayload, this.selectedProduct[0].objectid).subscribe(orderDetails => {
      if(orderDetails) {
        this.router.navigate(['/ordersuccess'])
      } else {
        this.router.navigate(['/orderfailure'])
      }
      //this.allOrdersForUser = orderDetails;
      this.allOrdersForUser = [];
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
