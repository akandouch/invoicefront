import { Injectable } from "@angular/core";
import { RestServiceAbstract } from "./restserviceabstract.class";
import { RestPath } from "./restpath.class";

@Injectable({providedIn: 'root'})
export class InvoiceRestServiceImpl extends RestServiceAbstract {
    static path:string = "invoice";
}