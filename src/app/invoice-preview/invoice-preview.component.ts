import { Component, OnInit, Input, Inject } from '@angular/core';
import { Invoice } from '../invoice/invoice.class';
import {Upload} from '../upload/upload.class';
import {DataService} from '../services/data.service';
import { RestService } from '../services/restservice.interface';
import { UploadRestServiceImpl } from '../services/uploadrestserviceimpl.class';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.css']
})
export class InvoicePreviewComponent implements OnInit {

  @Input() invoice:Invoice;
  constructor(@Inject(UploadRestServiceImpl) private uploadService: RestService) { }

  ngOnInit() {
  }

  getLogo(upload: Upload) {
    const uploadUrl = this.uploadService.getResourcePath(upload);
    return uploadUrl;
  }
}
