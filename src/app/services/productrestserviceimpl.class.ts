import { RestServiceAbstract } from "./restserviceabstract.class";
import { Product } from "../product/product.class";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ProductRestServiceImpl extends RestServiceAbstract{
    path:string = "product";
}