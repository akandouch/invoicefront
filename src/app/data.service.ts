import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Invoice } from "./invoice/invoice.class";
import { InvoiceProfile } from "./invoiceprofile/invoiceprofile.class";

@Injectable( 
   {providedIn:'root'}
)
export class DataService {
    constructor(private http:HttpClient){}

    postInvoice(invoice:Invoice,callback?){
        this.http.post("http://127.0.0.1:8080/invoice",invoice).subscribe(()=>callback());
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

    deleteInvoice(invoice:Invoice, callback?){
        this.http.delete("http://127.0.0.1:8080/invoice",{params:{id:invoice.id}}).subscribe(()=>callback());
    }
    generatePdf(invoice: Invoice): any {
        this.http.get("http://127.0.0.1:8080/invoice/generatepdf",{
            params:{id:invoice.id},
            responseType:"arraybuffer"
        }).subscribe(
            data=>{
                var file = new Blob([data], {type: 'application/pdf'});
                var fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            }
        );
    }
}