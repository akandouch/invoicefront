import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '../invoice/invoice.class';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.css']
})
export class InvoicePreviewComponent implements OnInit {

  @Input() invoice:Invoice;
  constructor() { }

  ngOnInit() {
  }

}
