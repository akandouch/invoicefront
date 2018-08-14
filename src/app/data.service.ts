import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Invoice } from "./invoice/invoice.class";

@Injectable( 
   {providedIn:'root'}
)
export class DataService {
    constructor(private http:HttpClient){}

    postInvoice(invoice:Invoice){
        this.http.post("http://127.0.0.1:8080/invoice",invoice).subscribe();
    }

    getInvoices(){
        return this.http.get<Invoice[]>("http://127.0.0.1:8080/invoice");
    }
}