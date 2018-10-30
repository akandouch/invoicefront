import { RestServiceAbstract } from "./restserviceabstract.class";
import { Injectable } from "@angular/core";

@Injectable({providedIn:"root"})
export class InvoiceProfileRestServiceImpl extends RestServiceAbstract{
    path = "invoiceprofile";
}