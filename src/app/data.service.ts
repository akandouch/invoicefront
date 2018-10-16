import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Invoice} from './invoice/invoice.class';
import {InvoiceProfile} from './invoiceprofile/invoiceprofile.class';
import {environment} from '../environments/environment';
import {Item} from './item/item.class';

@Injectable(
  {providedIn: 'root'}
)
export class DataService {
  constructor(private http: HttpClient) {
  }

  postInvoice(invoice: Invoice, callback?) {
    this.http
      .post(environment.restApiUrl + '/invoice', invoice)
      .subscribe(() => {
      }, (err) => alert(JSON.stringify(err)), () => callback());

  }

  postItem(invoiceId: string, item: Item, callback?) {
    this.http
      .post(environment.restApiUrl + '/invoice/' + invoiceId + '/item', item)
      .subscribe(() => {
      }, (err) => alert(JSON.stringify(err)), () => callback());
  }

  getInvoices() {
    return this.http.get<Invoice[]>(environment.restApiUrl + '/invoice');
  }

  postInvoiceProfile(invoiceProfile: InvoiceProfile, callback?) {
    this.http
      .post(environment.restApiUrl + '/invoiceprofile', invoiceProfile)
      .subscribe(() => {
        }, (err) => alert(JSON.stringify(err))
        , () => callback());
    ;
  }

  getInvoiceProfiles() {
    return this.http.get<InvoiceProfile[]>(environment.restApiUrl + '/invoiceprofile');
  }

  deleteInvoiceProfile(invoiceProfile: InvoiceProfile, callback?) {
    this.http.delete(environment.restApiUrl + '/invoiceprofile', {params: {id: invoiceProfile.id}}).subscribe(() => callback());
  }

  deleteInvoice(invoice: Invoice, callback?) {
    this.http.delete(environment.restApiUrl + '/invoice', {params: {id: invoice.id}}).subscribe(() => callback());
  }

  generatePdf(invoice: Invoice): any {
    this.http.get(environment.restApiUrl + '/invoice/generatepdf', {
      params: {id: invoice.id},
      responseType: 'arraybuffer'
    }).subscribe(
      data => {
        var file = new Blob([data], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(file);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(file, 'invoice.pdf');
        } else {
          window.open(fileURL);
        }
      }
    );
  }
}
