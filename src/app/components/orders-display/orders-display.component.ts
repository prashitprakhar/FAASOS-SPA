import { Component, OnInit } from '@angular/core';
import { OrdersService } from './../../services/orders.service';

@Component({
  selector: 'app-orders-display',
  templateUrl: './orders-display.component.html',
  styleUrls: ['./orders-display.component.css']
})
export class OrdersDisplayComponent implements OnInit {

  public allOrderDetails: any = [];
  public allOrders: any;
  
  constructor(private orderService : OrdersService) {}

  ngOnInit() {
    // this.orderService.getAllOrders().subscribe(orders => {
    //   Object.keys(orders).map(key => {
    //     this.allOrderDetails.push(orders[key]);
    //   });
    // })
    setInterval( this.getAllOrders(), 10000);
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe(orders => {
      Object.keys(orders).map(key => {
        this.allOrderDetails.push(orders[key]);
      });
    })
  }

  updateStatus(order) {
    let allOrderDetailsUpdates = [];
    this.allOrderDetails = []
    this.orderService.updateOrderStatus(order._id).subscribe(updatedOrders => {
      this.allOrderDetails = [];
      Object.keys(updatedOrders).map(key => {
        this.allOrderDetails.push(updatedOrders[key]);
      });
    });
  }

}
