import {DataService} from './data.service';
import {RestService} from './restservice.interface';
import {Injectable} from '@angular/core';
import {Entity} from '../entity.interface';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export abstract class RestServiceAbstract implements RestService {
  
  path: string;
  on(method:string,callback: any) {
    switch( method.toLocaleLowerCase() ){

      case "get"    :this.onGet     = callback;break;
      case "post"   :this.onPost    = callback;break;
      case "delete" :this.onDelete  = callback;break;

    }
    return this;
  }
  onGet:any = ()=>{};
  onPost:any = ()=>{};
  onDelete:any = ()=>{};
  onPut:any = ()=>{};

  constructor(private dataService: DataService<any>, private http: HttpClient) {

  }

  getDataService() {
    return this.dataService;
  }

  get(params?: any, callBackNext?: any, callbackError?: any, callbackComplete?: any) {
    this.dataService.get(this.path, params, callBackNext, callbackError, callbackComplete, this.onGet);
  }

  post(data: any, callBackNext?: any, callbackError?: any, callbackComplete?: any) {
    this.dataService.post(this.path, data, callBackNext, callbackError, callbackComplete, this.onPost);
  }

  delete(entity: any, callBackNext?: any, callbackError?: any, callbackComplete?: any) {
    this.dataService.delete(this.path, entity, callBackNext, callbackError, callbackComplete, this.onDelete);
  }

  getResourcePath(entity: Entity) {
    return environment.restApiUrl + '/' + this.path + '/' + entity.id;
  }

  getImage(entity: Entity, callBackNext?: any, callbackError?: any, callbackComplete?: any) {
    const url = environment.restApiUrl + '/' + this.path + '/' + entity.id;
    this.http.get(url, {responseType: 'blob'})
      .subscribe(callBackNext, callbackError, callbackComplete);
  }
}
