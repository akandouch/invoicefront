import { Component, OnInit, Injectable } from '@angular/core';
import { Invoice } from './invoice.class';
import { DataService } from '../data.service';
import {NgbModal, NgbModalOptions, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../item/item.class';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { faEye,faPlus, faFolderOpen, faTrashAlt, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { InvoiceProfile } from '../invoiceprofile/invoiceprofile.class';

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
  preview:Invoice;
  faEye=faEye;faPlus=faPlus;faFolderOpen=faFolderOpen;faTrashAlt=faTrashAlt;faFileDownload=faFileDownload;
  private currentModal: NgbActiveModal;

  private profiles:InvoiceProfile[];
  private currentProfile:InvoiceProfile;

  constructor(ds:DataService, private ngbModalService:NgbModal) {
      this.ds = ds;
      this.faEye = faEye;
      this.getAll();
      ds.getInvoiceProfiles().subscribe(x=>this.profiles=x);
      this.currentProfile = new InvoiceProfile();
   }

  ngOnInit() {
  }

  getAll(){
    this.ds.getInvoices().subscribe((data:Invoice[])=> this.history = data);
  }
  save(){
    console.log('I will save this sheet');
    this.invoice.setInvoicer(this.currentProfile);
    this.invoice.setInvoiced(this.currentProfile);
    this.ds.postInvoice(this.invoice, ()=>{this.getAll();this.closeModal()});
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
    this.invoice = new Invoice();
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
  openModal(content,invoice?:Invoice){
    invoice?this.preview = invoice:this.invoice = new Invoice();

    this.profiles.forEach(x=>x.active?this.currentProfile=x:{});
    this.currentModal = this.ngbModalService.open(content, {
      backdrop: 'static',
      keyboard:false
    });
  }  
  closeModal(){
    this.currentModal.close();
  }
  d(a){
    this.currentModal.dismiss(a);
  }
  deleteInvoice(invoice:Invoice){
    this.ds.deleteInvoice(invoice,()=>{this.getAll()});
  }
  generatePdf(invoice:Invoice){
    this.ds.generatePdf(invoice);
  }
}
