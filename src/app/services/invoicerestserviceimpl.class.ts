import { RestService } from "./restservice.interface";
import { Invoice } from "../invoice/invoice.class";
import { DataService } from "./data.service";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class InvoiceRestServiceImpl implements RestService {
    path: string = "invoice";
    constructor(private dataService:DataService<any>){
    }

    get(params?:any,callBackNext?:any,callbackError?:any, callbackComplete?:any){
        this.dataService.get(this.path, params, callBackNext, callbackError, callbackComplete );
    }
    post(data: any, callBackNext?: any, callbackError?: any, callbackComplete?: any) {
        this.dataService.post(this.path, data, callBackNext, callbackError, callbackComplete);
    }
}