import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '../invoice/invoice.class';
import {Upload} from '../upload/upload.class';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.css']
})
export class InvoicePreviewComponent implements OnInit {

  @Input() invoice:Invoice;
  constructor(private ds: DataService<any>) { }

  ngOnInit() {
  }
  public captureScreen(){
    console.log('do nothing right now');
  }

  getLogo(upload: Upload) {
    const uploadUrl = this.ds.getUploadUrl(upload.id);
    return uploadUrl;
  }
}
