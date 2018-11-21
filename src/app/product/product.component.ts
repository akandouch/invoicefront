import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Product, ProductType} from './product.class';
import {faCopy, faDownload, faEdit, faEllipsisH, faEye, faListAlt, faPlus, faTrashAlt, faUpload} from '@fortawesome/free-solid-svg-icons';
import {ProductRestServiceImpl} from '../services/productrestserviceimpl.class';
import {DataColumn, CustomAction} from '../data-table/data-table.component';
import {Upload} from '../upload/upload.class';
import { BreakpointObserver } from '@angular/cdk/layout';
import { $ } from 'protractor';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { UnitOfMeasureRestServiceImpl } from '../services/unitofmeasurerestserviceimpl.class';
import { UnitOfMeasure } from '../domain/unitofmeasure.class';
import { UploadRestServiceImpl } from '../services/uploadrestserviceimpl.class';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products: Product[];
  public _filteredProducts: Product[];
  public menu = {color: '#ff8d64', label: 'menu.product', icon: faListAlt};

  faPlus = faPlus;
  faDownload = faDownload;
  faUpload = faUpload;
  faEllipsisH = faEllipsisH;
  faEye = faEye;
  faEdit = faEdit;
  faCopy = faCopy;
  faTrashAlt = faTrashAlt;

  @Output()
  productSelected = new EventEmitter<Product>();

  @Input()
  selectOnly: boolean = false;

  typeFilter: number;
  nameFilter: string;

  public uom:Array<UnitOfMeasure>;

  public currentImage:number = 0;

  /* for data table */
  public dataColumns: Array<DataColumn> = [
    {field: {name: 'id'}, label: 'page.product.id'},
    {field: {name: 'name'}, label: 'common.name'},
    {field: {name: 'description'}, label: 'common.description'},
    {field: {name: 'quantity'}, label: 'page.items.qty'},
    {field: {name: 'unitOfMeasure', child:{name:'name'}}, label: 'page.items.unitOfMeasure'},
    {field: {name: 'unitPrice'}, label: 'page.items.priceUnit'},
    {field: {name: 'vat'}, label: 'page.items.vatRate'},
    {field: {name: 'type'}, label: 'common.type'}
  ];

  public dataTableButtons:Array<CustomAction> = [
    {action:'importData',icon:faUpload, label:"page.product.uploadcsv"},
    {action:'exportData',icon:faDownload, label:"page.product.downloadtemplatecsv"}
  ]

  public newProduct: Product = new Product();
  constructor(
    @Inject(ProductRestServiceImpl) private productRestService: ProductRestServiceImpl,
    @Inject(UnitOfMeasureRestServiceImpl) private uomRestService: UnitOfMeasureRestServiceImpl,
    @Inject(UploadRestServiceImpl) private uploadRestService: UploadRestServiceImpl
  ) {
    this.products = new Array();
    this.reload();
  }

  ngOnInit() {
    this.uomRestService.get({},(data)=>{this.uom = data})
  }

  select(product: Product) {
    this.productSelected.emit(Object.assign(new Product, product));
  }

  get filteredProduct() {
    console.log('test');
    var filteredList = this.products;
    if (this.typeFilter && this.typeFilter != -1) {
      filteredList = filteredList.filter(p => p.type == this.typeFilter);
    }
    if (this.nameFilter && this.nameFilter != '') {
      filteredList = filteredList.filter(p => p.name.toLowerCase().includes(this.nameFilter));
    }

    console.log(filteredList);
    return filteredList;
  }

  tableConsult(data: Product) {
    console.log('consult : ' + data.id);
  }

  tableEdit(data: Product) {
    console.log('edit : ' + data.id);
  }

  tableDelete(data: Product) {
    console.log('delete : ' + data.id);
  }

  saveNewProduct() {
    this.productRestService.post(this.newProduct, (data) => {
        this.reload();
      },
      () => {
        alert('error');
      },
      () => {
        alert('product successfully added');
      });

  }

  reload() {
    this.productRestService.get({},
      (data) => {
        console.log(data);
        this.products = data;
      });
  }

  refreshGrid(data) {
    this.products = data;
  }

  public downloadCSV() {
    const csvTemplatePath = this.productRestService.getCSVTemplatePath();
    console.log(csvTemplatePath);

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(csvTemplatePath, 'export.csv');
    } else {
      window.open(csvTemplatePath);
    }
    return csvTemplatePath;
  }

  addAttachment(event: any) {    
    const blob = event.srcElement.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const upl = new Upload();
      upl.contentType = blob.type;
      upl.fileName = blob.name;
      upl.newUpload = fileReader.result.split(',')[1];

      
      this.uploadRestService.post(upl, 
        (u)=>{
          if(!this.newProduct.uploads){
            this.newProduct.uploads = [];
          }
          this.newProduct.uploads.push(u);
          alert('file successfully added')
        },
        ()=>{alert('errora')});
      /*this.productRestService.postCSV(upl, (u) => {
        this.reload();
        alert('csv loaded successfully');
      }, (err) => {
        alert('error loading csv');
      });*/
    });
    fileReader.readAsDataURL(blob);
  }
  
  getAttachment(upload: Upload) {
    console.log(upload);
    const uploadUrl = this.uploadRestService.getResourcePath(upload);
    return uploadUrl;
  }
  manageCustomAction(action:CustomAction){
    switch(action.action){
      case "importData":document.getElementById('file').click;break;
      case "exportData":this.downloadCSV();break;
    }
  }

  openEdit(product:Product){
    this.newProduct = product;
  }

}
