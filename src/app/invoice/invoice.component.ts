import { Component, OnInit, Injectable } from '@angular/core';
import { Invoice } from './invoice.class';
import { DataService } from '../data.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../item/item.class';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
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
    this.invoice.getAddItem(item);
  }
  openInvoice(invoice:Invoice){
    this.current = invoice;
    this.invoice = invoice;
  }

}
