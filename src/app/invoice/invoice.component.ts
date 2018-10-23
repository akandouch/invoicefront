import {Component, Injectable, OnInit, Inject} from '@angular/core';
import {Invoice} from './invoice.class';
import {DataService} from '../services/data.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Item} from '../item/item.class';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {
  faArrowLeft,
  faEllipsisH,
  faEye,
  faFileDownload,
  faFileInvoice,
  faFilePdf,
  faFolderOpen,
  faHome,
  faPlus,
  faSearch,
  faTrashAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {InvoiceProfile} from '../invoiceprofile/invoiceprofile.class';
import {InvoiceRestServiceImpl} from '../services/invoicerestserviceimpl.class';
import {Upload} from '../upload/upload.class';
import { RestService } from '../services/restservice.interface';

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
  ds: DataService<any>;
  history: Invoice[];
  current: Invoice;
  preview: Invoice;
  faEye = faEye;
  faPlus = faPlus;
  faFolderOpen = faFolderOpen;
  faTrashAlt = faTrashAlt;
  faFileDownload = faFileDownload;
  faArrowLeft = faArrowLeft;

  faSearch = faSearch;
  faHome = faHome;
  faUser = faUser;
  faEllipsisH = faEllipsisH;
  faFilePdf = faFilePdf;
  faFileInvoice = faFileInvoice;
  private currentModal: NgbActiveModal;

  private profiles: InvoiceProfile[];
  private profilesFound: InvoiceProfile[];
  private currentProfile: InvoiceProfile;
  private currentCustomer: InvoiceProfile;

  constructor(ds: DataService<any>, private ngbModalService: NgbModal, @Inject(InvoiceRestServiceImpl)private invoiceService: RestService) {
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
    
    console.log(<InvoiceRestServiceImpl>this.invoiceService);
    this.invoiceService.get({}, (data: Invoice[]) => {
      this.history = data;
    });

  }

  addItem() {
    let item: Item = new Item();
    item.setDescription('dummy item');
    item.setUnit(8);
    item.setAmount(500);
    this.invoice.addItem(item);
  }

  openInvoice(invoice: Invoice) {
    let i: Invoice = new Invoice();

    i.fillInvoice(invoice);
    this.current = i;
  }

  getAttachments(upload: Upload) {
    return this.ds.getUploadUrl(upload.id);
  }

  addAttachment(event: any) {
    const blob = event.srcElement.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const upl = new Upload();
      upl.contentType = blob.type;
      upl.fileName = blob.name;
      upl.newUpload = fileReader.result.split(',')[1];
      this.ds.post('upload', upl, (u) => {
        this.current.attachments.push(u);
        this.ds.post('invoice', this.current, (invoiceUpdated) => {
          this.current = invoiceUpdated;
          alert('attachment added');
        });
      });
    });
    fileReader.readAsDataURL(blob);
  }
  removeAttachment(attachment: Upload) {
      this.ds.delete('upload', attachment, (deletedUpload) => {
        this.current.attachments = this.current.attachments.filter(u => u.id !== attachment.id);
        this.ds.post('invoice', this.current, (invoiceUpdated) => {
          this.current = invoiceUpdated;
          alert('attachment removed');
        });
      });
  }
  invoiceBack() {
    this.current = null;
    this.getAll();
  }

  update() {
    this.ds.postInvoice(this.current, () => {
      this.getAll();
      this.current = null;
      alert('Invoice updated');
    });
  }

  save() {
    this.ds.createNewInvoice().subscribe(invoice => {
      this.invoice = invoice;
      this.invoice.invoicer = this.currentProfile;
      this.invoice.invoiced = this.currentCustomer;
      this.ds.postInvoice(this.invoice, (response) => {
        this.invoice = new Invoice();
        this.getAll();
        this.closeModal();
      });
    });
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
