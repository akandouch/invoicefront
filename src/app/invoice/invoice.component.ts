import {Component, Injectable, OnInit} from '@angular/core';
import {Invoice} from './invoice.class';
import {DataService} from '../data.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Item} from '../item/item.class';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {faEye, faFileDownload, faFolderOpen, faPlus, faSearch, faTrashAlt, faHome, faUser, faEllipsisH, faFilePdf} from '@fortawesome/free-solid-svg-icons';
import {InvoiceProfile} from '../invoiceprofile/invoiceprofile.class';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [NgbModal]
})
@Injectable(
  {providedIn: 'root'}
)
export class InvoiceComponent implements OnInit {

  invoice: Invoice;
  ds: DataService;
  history: Invoice[];
  current: Invoice;
  preview: Invoice;
  faEye = faEye;faPlus = faPlus;faFolderOpen = faFolderOpen;faTrashAlt = faTrashAlt;faFileDownload = faFileDownload;
  faSearch = faSearch;faHome = faHome;faUser = faUser;faEllipsisH = faEllipsisH;faFilePdf=faFilePdf
  private currentModal: NgbActiveModal;

  private profiles: InvoiceProfile[];
  private profilesFound: InvoiceProfile[];
  private currentProfile: InvoiceProfile;
  private currentCustomer: InvoiceProfile;

  constructor(ds: DataService, private ngbModalService: NgbModal) {
    this.ds = ds;
    this.faEye = faEye;
    this.getAll();
    ds.getInvoiceProfiles().subscribe(x => this.profiles = x);
    this.currentProfile = new InvoiceProfile();
    this.currentCustomer = new InvoiceProfile();
    this.invoice = new Invoice();
  }

  ngOnInit() {
  }

  getAll() {
    this.ds.getInvoices().subscribe((data: Invoice[]) => this.history = data);
  }

  save() {
    console.log('I will save this sheet');
    console.log(this.invoice);
    //let newInvoice:Invoice = new Invoice();

    this.invoice.invoicer = this.currentProfile;
    this.invoice.invoiced = this.currentCustomer;
    this.invoice.title = 'No title yet';
    //ewInvoice.fillInvoice(this.invoice);
    this.ds.postInvoice(this.invoice, () => {
      this.invoice = new Invoice();
      this.getAll();
      this.closeModal();
    });
  }

  addItem() {
    let item: Item = new Item();
    item.setDescription('dummy item');
    item.setUnit(8);
    item.setAmount(500);
    this.invoice.addItem(item);
  }

  openInvoice(invoice: any) {
    console.log(invoice);
    let i: Invoice = new Invoice();
    i.fillInvoice(invoice);
    this.current = i;
  }

  newInvoice() {
    this.invoice = new Invoice();
  }

  public captureScreen() {
    var data = document.getElementById('invoice');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }

  dragMe(event: MouseEvent) {
    console.log(event);
    console.log('drag him !! x : ' + event.clientX + ' y : ' + event.clientY);


  }

  openModal(content, invoice?: Invoice) {
    invoice ? this.preview = invoice : this.invoice = new Invoice();

    this.profiles.forEach(x => x.active ? this.currentProfile = x : this.currentCustomer = x); // todo use list of profiles
    this.currentModal = this.ngbModalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
  }

  closeModal() {
    this.currentModal.close();
  }

  d(a) {
    this.currentModal.dismiss(a);
  }

  deleteInvoice(invoice: Invoice) {
    this.ds.deleteInvoice(invoice, () => {
      this.getAll();
    });
  }

  generatePdf(invoice: Invoice) {
    this.ds.generatePdf(invoice);
  }

  searchProfiles(event: any) {
    var value: string = event.target.value.toLowerCase();
    this.profilesFound = [];
    if (value.length >= 2) {
      this.profiles.forEach(x => {
        if (x.firstname.toLowerCase().indexOf(value, 0) != -1 || x.lastname.toLowerCase().indexOf(value, 0) != -1 || x.vat.toLowerCase().indexOf(value, 0) != -1) {
          this.profilesFound.push(x);
        }
      });
    }
  }

  selectCustomer(profile: InvoiceProfile) {
    this.currentCustomer = profile;
  }
}
