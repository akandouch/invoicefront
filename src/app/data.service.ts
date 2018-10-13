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
        this.http.post("REST_API_URL/invoice",invoice).subscribe(()=>callback());
    }

    getInvoices(){
        return this.http.get<Invoice[]>("REST_API_URL/invoice");
    }

    postInvoiceProfile(invoiceProfile:InvoiceProfile,callback?){
        this.http.post("REST_API_URL/invoiceprofile", invoiceProfile ).subscribe(()=>callback());
    }

    getInvoiceProfiles(){
        return this.http.get<InvoiceProfile[]>("REST_API_URL/invoiceprofile");
    }

    deleteInvoiceProfile(invoiceProfile:InvoiceProfile,callback?){
        this.http.delete("REST_API_URL/invoiceprofile",{params:{id:invoiceProfile.id}}).subscribe(()=>callback());
    }

    deleteInvoice(invoice:Invoice, callback?){
        this.http.delete("REST_API_URL/invoice",{params:{id:invoice.id}}).subscribe(()=>callback());
    }
    generatePdf(invoice: Invoice): any {
        this.http.get("REST_API_URL/invoice/generatepdf",{
            params:{id:invoice.id},
            responseType:"arraybuffer"
        }).subscribe(
            data=>{
                var file = new Blob([data], {type: 'application/pdf'});
                var fileURL = URL.createObjectURL(file);
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(file,'invoice.pdf');  
                }else{
                    window.open(fileURL);
                }
            }
        );
    }
}
