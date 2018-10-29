import { Component, OnInit } from '@angular/core';
import { Product, ProductType, UnitOfMeasure } from './product.class';
import { faPlus,faEllipsisH,faEye,faEdit,faCopy,faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products:Product[];
  faPlus = faPlus; faEllipsisH = faEllipsisH;faEye = faEye;faEdit = faEdit;faCopy = faCopy;faTrashAlt = faTrashAlt;
  
  constructor() { 
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
        images:null
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
      images:null
  });

  }

  ngOnInit() {
  }

}
