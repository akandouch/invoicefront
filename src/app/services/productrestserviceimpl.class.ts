import { RestServiceAbstract } from "./restserviceabstract.class";
import { Product } from "../product/product.class";

export class ProductRestServiceImpl extends RestServiceAbstract{
    path:string = "product";
}