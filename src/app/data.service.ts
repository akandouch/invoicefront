import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Invoice } from "./invoice/invoice.class";
import { InvoiceProfile } from "./invoiceprofile/invoiceprofile.class";

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

    postInvoiceProfile(invoiceProfile:InvoiceProfile,callback?){
        this.http.post("http://127.0.0.1:8080/invoiceprofile", invoiceProfile ).subscribe(()=>callback());
    }

    getInvoiceProfiles(){
        return this.http.get<InvoiceProfile[]>("http://127.0.0.1:8080/invoiceprofile");
    }

    deleteInvoiceProfile(invoiceProfile:InvoiceProfile,callback?){
        this.http.delete("http://127.0.0.1:8080/invoiceprofile",{params:{id:invoiceProfile.id}}).subscribe(()=>callback());
    }
}