import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Product, ProductType, UnitOfMeasure} from './product.class';
import {faCopy, faEdit, faEllipsisH, faEye, faListAlt, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {RestService} from '../services/restservice.interface';
import {ProductRestServiceImpl} from '../services/productrestserviceimpl.class';
import {DataColumn} from '../data-table/data-table.component';

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

  /* for data table */
  public dataColumns: Array<DataColumn> = [
    {field: {name: 'id'}, label: 'page.product.id'},
    {field: {name: 'name'}, label: 'common.name'},
    {field: {name: 'description'}, label: 'common.description'},
    {field: {name: 'quantity'}, label: 'page.items.qty'},
    {field: {name: 'unitOfMeasure'}, label: 'page.items.unitOfMeasure'},
    {field: {name: 'unitPrice'}, label: 'page.items.priceUnit'},
    {field: {name: 'vat'}, label: 'page.items.vatRate'},
    {field: {name: 'type'}, label: 'common.type'}
  ];

  constructor(@Inject(ProductRestServiceImpl) private productRestService: RestService) {
    this.products = new Array();
    this.reload();
  }

  ngOnInit() {
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

  newProduct() {

    var product: Product = {
      id: '' + Date.now(),
      description: 'test add',
      name: 'Test Rest Add Generic',
      quantity: 20,
      unitOfMeasure: UnitOfMeasure.UNIT,
      unitPrice: 35,
      vat: 0.21,
      type: ProductType.ITEM,
      uploads: null
    };
    console.log(product);
    this.productRestService.post(product, (data) => {
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

}
