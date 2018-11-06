import {RestServiceAbstract} from './restserviceabstract.class';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';

@Injectable({providedIn: 'root'})
export class ProductRestServiceImpl extends RestServiceAbstract {
  path: string = 'product';

  getCSVTemplatePath() {
    return environment.restApiUrl + '/' + this.path + '/template-csv';
  }

  postCSV(data: any, callBackNext?: any, callbackError?: any, callbackComplete?: any) {
    this.getDataService().post(this.path + '/upload-csv', data, callBackNext, callbackError, callbackComplete, this.onPost);
  }

}
