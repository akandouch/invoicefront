import { Component, OnInit, Injectable } from '@angular/core';
import { Invoice } from './invoice.class';
import { DataService } from '../data.service';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../item/item.class';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [NgbModal]
})
@Injectable( 
  {providedIn:'root'}
)
export class InvoiceComponent implements OnInit {

  invoice:Invoice;
  ds:DataService;
  history:Invoice[];
  current:Invoice;

  constructor(ds:DataService) {
      this.invoice = new Invoice();
      this.ds = ds;
      ds.getInvoices().subscribe((data:Invoice[])=> this.history = data);

   }

  ngOnInit() {
  }

  save(){
    console.log('I will save this sheet');
    this.ds.postInvoice(this.invoice);
  }
  addItem(){
    let item:Item = new Item();
    item.setDescription('dummy item');
    item.setUnit(8);
    item.setAmount(500);
    this.invoice.addItem(item);
  }
  openInvoice(invoice:any){
    this.current = this.invoice;

    let i:Invoice = new Invoice();
    i.fillInvoice(invoice);
    this.invoice = i;

  }
  newInvoice(){
    this.invoice = this.current;
    this.current = null;
  }


  public captureScreen()  
  {  
    var data = document.getElementById('invoice');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  } 
  dragMe(event:MouseEvent){
    console.log(event);
    console.log('drag him !! x : ' + event.clientX + ' y : ' + event.clientY);
    

  }
}
