import {Injectable} from '@angular/core';
import {RestServiceAbstract} from './restserviceabstract.class';
import {RestPath} from './restpath.class';

@Injectable({providedIn: 'root'})
export class InvoiceRestServiceImpl extends RestServiceAbstract {
  path: string = 'invoice';

  sendMail(id: string, callBackNext?: any, callbackError?: any, callbackComplete?: any) {
    return this.getDataService().post(this.path + '/send-mail/' + id, {}, callBackNext, callbackError, callbackComplete);
  }
}
