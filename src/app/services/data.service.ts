import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Invoice} from '../invoice/invoice.class';
import {InvoiceProfile} from '../invoiceprofile/invoiceprofile.class';
import {environment} from '../../environments/environment';
import {Item} from '../item/item.class';
import {Settings} from '../settings/settings.class';
import {Upload} from '../upload/upload.class';
import {Entity} from '../entity.interface';

@Injectable(
  {providedIn: 'root'}
)
export class DataService<T extends Entity> {

  constructor(private http: HttpClient) {
  }

  get(path: string, params?: any, callBackNext?: any, callbackError?: any, callbackComplete?: any) {
    this.http.get<any[]>(environment.restApiUrl + '/' + path, {params: params}).subscribe(
      (datas) => {
        if (callBackNext) callBackNext(datas);
      },
      (err) => {
        if (callbackError) callbackError(err);
      },
      () => {
        if (callbackComplete) callbackComplete();
      },
    );
  }
  post(path:string, data:T, callBackNext?:any,callbackError?:any, callbackComplete?:any){
    this.http.post(environment.restApiUrl + '/' + path , data).subscribe(
      (datas)=> {
        if(callBackNext)callBackNext(datas);
        },

      (err) => {
        if (callbackError) callbackError(err);
      },
      () => {
        if (callbackComplete) callbackComplete();
      },
    );
  }

  put(){
    throw new Error("to implement");

  }

  delete(path: string, entity: T, callBackNext?: any, callbackError?: any, callbackComplete?: any) {
    this.http.delete(environment.restApiUrl + '/' + path, {params: {id: entity.id}}).subscribe(
      (datas) => {
        if (callBackNext) callBackNext(datas);
      },
      (err) => {
        if (callbackError) callbackError(err);
      },
      () => {
        if (callbackComplete) callbackComplete();
      },
    );
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

  getSettings() {
    return this.http.get<Settings>(environment.restApiUrl + '/settings');
  }

  createNewInvoice() {
    return this.http.get<Invoice>(environment.restApiUrl + '/invoice/create-new-invoice');
  }

  postSettings(settings: Settings, callback?) {
    this.http
      .post(environment.restApiUrl + '/settings', settings)
      .subscribe(() => {
        }, (err) => alert(JSON.stringify(err))
        , () => callback());
  }

  postInvoiceProfile(invoiceProfile: InvoiceProfile, callback?) {
    this.http
      .post(environment.restApiUrl + '/invoiceprofile', invoiceProfile)
      .subscribe(() => {
        }, (err) => alert(JSON.stringify(err))
        , () => callback());
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

  getRatePerMonthForYear(year: number) {
    return this.http.get<number[]>(environment.restApiUrl + '/statistics', {params: {year: '' + year}});
  }

  postUpload(upload: Upload, callback?) {
    this.http
      .post(environment.restApiUrl + '/upload', upload)
      .subscribe((u) => {
        callback(u);
      }, (err) => alert(JSON.stringify(err)), () => {
      });
  }
}
