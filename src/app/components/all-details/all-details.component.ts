import { Component, OnInit, OnChanges } from '@angular/core';
import { AllDetailsService } from './../../services/all-details.service';
import { Observable } from './../../../../node_modules/rxjs';
import { BehaviorSubject } from './../../../../node_modules/rxjs';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';

interface ObjectForTable {
  productId: number,
  productName: string,
  quantity: number,
  createdTillNow: number,
  predictedQuantity: number,
  status: boolean,
  predictionId: string,
  orderId: string,
  orderTimestamp: Date,
  isDefault: boolean
}

@Component({
  selector: 'app-all-details',
  templateUrl: './all-details.component.html',
  styleUrls: ['./all-details.component.css']
})
export class AllDetailsComponent implements OnInit, OnChanges {

  public allDataArray: any = [];
  public finalDataArray: any[] = [];
  public arrayUnique: any = [];

  public orderDetails: ObjectForTable = {
    productId: null,
    productName: '',
    quantity: null,
    createdTillNow: null,
    predictedQuantity: null,
    status: false,
    predictionId: '',
    orderId: '',
    orderTimestamp: null,
    isDefault: true
  }

  public completedCount: any = {};
  public pdfDownload: boolean = false;

  public base64Img = null;
  public margins = {
    top: 70,
    bottom: 40,
    left: 30,
    width: 550
  };

  constructor(private allDetailsService: AllDetailsService) { }

  ngOnInit() {
    this.allDetailsService.getAllData().subscribe(data => {
      if (data.length > 0) {
        this.processData(data);
      }
    });
  }

  processData(data: any[]) {
    this.completedCount = {};
    let allData: any[] = [];
    allData = data;
    allData.forEach(row => {
      this.createdTillNowCalculation(row.productid, row.orders);
      if (row.orders.length > 1) {
        row.orders.forEach(product => {
          if (product.username !== 'New User') {
            this.prepareFinalDataArray(product, row, this.completedCount[row.productid])
          }
        });
      } else if (row.orders.length === 1) {
        this.prepareFinalDataArray(row.orders[0], row, 0)
      }
    })
    this.arrayUnique = this.generateDataForPDF(this.finalDataArray)
  }

  prepareFinalDataArray(product, row, completedTillNow): void {
    this.orderDetails = {
      productId: row.productid,
      productName: row.productname,
      quantity: product.orderedamount,
      createdTillNow: completedTillNow,
      predictedQuantity: row.prediction[0].predictedquantity,
      status: product.status,
      predictionId: row._id,
      orderId: product._id,
      orderTimestamp: product.ordertimestamp,
      isDefault: false
    }
    this.finalDataArray.push(this.orderDetails);
    return;
  }

  createdTillNowCalculation(productId, allOrdersArray: any[]): any {
    allOrdersArray.forEach(product => {
      if (product.status) {
        this.completedCount[productId] = typeof this.completedCount[productId] === 'number' ?
          this.completedCount[productId] + product.orderedamount :
          product.orderedamount;
      }
    });
  }


  updateStatus(orderDetails) {
    this.allDetailsService.updateOrderStatus(orderDetails.orderId).subscribe(data => {
      this.finalDataArray = [];
      this.processData(data);
    })
  }

  generateDataForPDF(dataArray) {
    dataArray = dataArray.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.productId === thing.productId
      ))
    )
    return dataArray;
  }


  captureScreen() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data, {
      onclone: () => { 
        data.style.opacity = '1'
      }
    })
      .then(canvas => {
        //setTimeout(data.style.opacity = '0', 2000);
        setTimeout(this.renderingPDF(canvas), 3000);
        
      });
  }

  renderingPDF(canvas) {
    var imgWidth = 500;
        var pageHeight = 700;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save('production-report.pdf'); // Generated PDF   
  }


  ngOnChanges() {
  }

}
