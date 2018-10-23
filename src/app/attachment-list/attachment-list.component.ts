import { Component, OnInit, Input, Inject } from '@angular/core';
import { Invoice } from '../invoice/invoice.class';
import { faPaperclip, faEllipsisH,faPlus, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UploadRestServiceImpl } from '../services/uploadrestserviceimpl.class';
import { RestService } from '../services/restservice.interface';
import { InvoiceRestServiceImpl } from '../services/invoicerestserviceimpl.class';
import { Upload } from '../upload/upload.class';

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.css']
})
export class AttachmentListComponent implements OnInit {

  @Input()
  invoice:Invoice;
  faPaperclip=faPaperclip;faEllipsisH=faEllipsisH;faPlus=faPlus;faEye=faEye;faTrashAlt=faTrashAlt;

  constructor(
    @Inject(UploadRestServiceImpl)private uploadService:RestService,
    @Inject(InvoiceRestServiceImpl)private invoiceService:RestService
  
  ) { }

  ngOnInit() {
  }
  getAttachments(attachment:Upload){
    window.open(this.uploadService.getResourcePath(attachment));
  }
  addAttachment(event: any) {
    const blob = event.srcElement.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const upl = new Upload();
      upl.contentType = blob.type;
      upl.fileName = blob.name;
      upl.newUpload = fileReader.result.split(',')[1];
      this.uploadService.post(upl, (u) => {
        this.invoice.attachments.push(u);
        this.invoiceService.post(this.invoice, (invoiceUpdated)=> {
          this.invoice = invoiceUpdated;
          alert('attachment added successfully');
        });
      }, (err)=>{
        alert('error adding the attachment');
      });
    });
    fileReader.readAsDataURL(blob);
  }
  removeAttachment(attachment: Upload) {
    this.uploadService.delete(attachment,(deletedUpload) => {
      this.invoice.attachments = this.invoice.attachments.filter(u => u.id !== attachment.id);
      this.invoiceService.post(this.invoice,  (invoiceUpdated) => {
        this.invoice = invoiceUpdated;
        alert('attachment removed');
      });
    });
  }

}
