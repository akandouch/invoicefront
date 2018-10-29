import { Component, OnInit, EventEmitter, Output, Input, Inject } from '@angular/core';
import { Product, ProductType, UnitOfMeasure } from './product.class';
import { faPlus,faEllipsisH,faEye,faEdit,faCopy,faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { RestService } from '../services/restservice.interface';
import { ProductRestServiceImpl } from '../services/productrestserviceimpl.class';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products:Product[];
  public _filteredProducts:Product[];

  faPlus = faPlus; faEllipsisH = faEllipsisH;faEye = faEye;faEdit = faEdit;faCopy = faCopy;faTrashAlt = faTrashAlt;

  @Output()
  productSelected = new EventEmitter<Product>();

  @Input()
  selectOnly:boolean = false;

  typeFilter:number;
  nameFilter:string;
  
  constructor(@Inject(ProductRestServiceImpl) private productRestService:RestService) { 
    this.products = new Array();
    this.products.push({
        id:"666",
        description:"maintenance applicative",
        name:"Prestation",
        quantity: 20,
        unitOfMeasure: UnitOfMeasure.DAYS,
        unitPrice: 500,
        vat: 0.21,
        type: ProductType.SERVICE,
        uploads:null
    });
    this.products.push({
      id:"777",
      description:"location serveur virtuel",
      name:"Cloud Server",
      quantity: 20,
      unitOfMeasure: UnitOfMeasure.UNIT,
      unitPrice: 35,
      vat: 0.21,
      type: ProductType.ITEM,
      uploads:null
  });
  }

  ngOnInit() {
  }

  select(product:Product){
    this.productSelected.emit(Object.assign(new Product,product));
  }

  get filteredProduct(){
    var filteredList= this.products;
    if(this.typeFilter && this.typeFilter != -1){
      filteredList = filteredList.filter(p=>p.type == this.typeFilter);
    }
    if(this.nameFilter && this.nameFilter != ""){
      filteredList = filteredList.filter(p=>p.name.toLowerCase().includes(this.nameFilter));
    }

    return filteredList;
  }

  newProduct(){

    var product:Product = {
      id:""+Date.now(),
      description:"test add",
      name:"Test Rest Add Generic",
      quantity: 20,
      unitOfMeasure: UnitOfMeasure.UNIT,
      unitPrice: 35,
      vat: 0.21,
      type: ProductType.ITEM,
      uploads:null
    }
    this.productRestService.post(product,(data)=>{
      console.log(data)
    },
    ()=>{
      alert("error")
    },
    ()=>{
      alert("product successfully added")
    })

  }

}
