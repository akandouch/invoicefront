import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {Invoice} from './invoice.class';
import {DataService} from '../services/data.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Item} from '../item/item.class';
import {
  faArrowLeft,
  faEllipsisH,
  faEye,
  faFileDownload,
  faFilePdf,
  faFolderOpen,
  faHome,
  faList,
  faListAlt,
  faMailBulk,
  faPaperclip,
  faPlus,
  faSearch,
  faTrashAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {InvoiceProfile} from '../invoiceprofile/invoiceprofile.class';
import {InvoiceRestServiceImpl} from '../services/invoicerestserviceimpl.class';
import {Upload} from '../upload/upload.class';
import {RestService} from '../services/restservice.interface';
import {UploadRestServiceImpl} from '../services/uploadrestserviceimpl.class';
import {InvoiceSendMailRestServiceImpl} from '../services/invoicesendmailrestserviceimpl.class';
import {Product} from '../product/product.class';
import {DataColumn, FieldCondition, CustomAction, CustomEventData} from '../data-table/data-table.component';
import {TranslateService} from '@ngx-translate/core';
import {faFileInvoice} from '@fortawesome/free-solid-svg-icons/faFileInvoice';

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
  faMailBulk = faMailBulk;
  faPlus = faPlus;
  faFolderOpen = faFolderOpen;
  faTrashAlt = faTrashAlt;
  faFileDownload = faFileDownload;
  faArrowLeft = faArrowLeft;
  faListAlt = faListAlt;
  faSearch = faSearch;
  faHome = faHome;
  faUser = faUser;
  faEllipsisH = faEllipsisH;
  faFilePdf = faFilePdf;
  faPaperclip = faPaperclip;
  faList = faList;
  public menu = {color: '#5cc664', label: 'menu.invoice', icon: faFileInvoice};

  private currentModal: NgbActiveModal;
  private profiles: InvoiceProfile[];
  private profilesFound: InvoiceProfile[];
  private currentProfile: InvoiceProfile;
  private currentCustomer: InvoiceProfile;

  private listOpened: string = 'items';
  public newVersion: boolean = true;

  public details: Invoice = new Invoice();
  public idDetailsSelected: string;
  public dataColumns: Array<DataColumn> = [
    {field: {name: 'invoiceNumber'}, label: 'page.invoice.invoiceId'},
    {field: {name: 'title'}, label: 'common.title', hide: true},
    {field: {name: 'invoicer', child: {name: 'firstname'}}, label: 'common.invoicer'},
    {field: {name: 'invoiced', child: {name: 'firstname'}}, label: 'common.customer'},
    {field: {name: 'invoiced', child: {name: 'vat'}}, label: 'common.vat'},
    {
      field: {name: 'status'},
      rules: [
        {condition: FieldCondition.EQ, value: '0', cssClass: 'open-status', label: 'common.open'},
        {condition: FieldCondition.EQ, value: '2', cssClass: 'close-status', label: 'common.close'}],
      label: 'common.status', cssClass: 'inv-status'
    }];

  public customActions: Array<CustomAction> = [
    {label:"Download PDF", action:"downloadPdf",icon:faFilePdf}
  ]

  constructor(
    ds: DataService<any>,
    private ngbModalService: NgbModal,
    private translate: TranslateService,
    @Inject(InvoiceRestServiceImpl) public invoiceService: InvoiceRestServiceImpl,
    @Inject(UploadRestServiceImpl) private uploadService: RestService,
    @Inject(InvoiceSendMailRestServiceImpl) private invoiceSendMailService
  ) {

    this.ds = ds;
    this.getAll();
    ds.getInvoiceProfiles().subscribe(x => this.profiles = x);
    this.currentProfile = new InvoiceProfile();
    this.currentCustomer = new InvoiceProfile();
    this.invoice = new Invoice();
  }

  ngOnInit() {
  }

  getAll() {
    this.invoiceService.get({}, (data: Invoice[]) => {
      this.history = data;
      let d: Invoice = new Invoice();
      d.fillInvoice(this.history[0]);
      this.details = d;
      this.idDetailsSelected = d.id;
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

  downloadAttachment(attachment: Upload) {
    return this.uploadService.getResourcePath(attachment);
  }

  invoiceBack() {
    this.current = null;
    this.getAll();
  }

  update() {
    this.invoiceService.post(this.current, () => {
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

      this.invoiceService.post(this.invoice, (response) => {
        this.invoice = new Invoice();
        this.getAll();
        this.closeModal();
      });
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

  sendMail(id: string) {
    console.log('send mail with id ' + id);
    /* TO TEST AND ADAPT
    this.invoiceSendMailService.post({id:id}, 
      (resp) => alert('email sent'),
      (resp) => alert('error: ' + JSON.stringify(resp)
    ));*/

    this.invoiceService.sendMail(id, (resp) => alert('email sent'),
      (resp) => alert('error: ' + JSON.stringify(resp)));
  }

  closeModal() {
    this.currentModal.close();
  }

  d(a) {
    this.currentModal.dismiss(a);
  }

  deleteInvoice(invoice: Invoice) {
    this.invoiceService.delete(invoice);
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

  openList(list: string) {
    this.listOpened = list;
  }

  calculateTotalRate(invoice: Invoice): number {
    var total = 0;
    invoice.items.forEach(x => total += x.rate * x.days);
    total = parseFloat(Number(total).toFixed(2));
    return total;
  }

  calculateTotalVatRate(invoice: Invoice): number {
    var total = 0;
    invoice.items.forEach(x => total += (x.rate * x.days) - ((x.rate * x.days) * x.vatRate));
    total = parseFloat(Number(total).toFixed(2));
    return total;
  }

  openDetails(invoice: Invoice) {
    this.details.fillInvoice(invoice);
    this.idDetailsSelected = invoice.id;
  }

  productSelected(product: Product) {
    console.log(product);
    if (!this.current.products) {
      this.current.products = [];
    }
    this.current.products.push(product);
  }

  removeProduct(i: number) {
    console.log(i);
    this.current.products = this.current.products.slice(i);
  }

  refreshGrid(data) {
    this.history = data;
  }

  customDataTableEvent(data:CustomEventData){
    switch(data.action){
      case "downloadPdf": this.generatePdf(<Invoice>data.data);
    }
  }
}
