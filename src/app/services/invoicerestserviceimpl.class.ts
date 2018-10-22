import { RestService } from "./restservice.interface";
import { Invoice } from "../invoice/invoice.class";
import { DataService } from "./data.service";
import { Injectable } from "@angular/core";


export class InvoiceRestServiceImpl implements RestService {
    path: string;
    constructor(){
        this.path = "invoice";
    }
}