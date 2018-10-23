import { DataService } from "./data.service";
import { RestService } from "./restservice.interface";
import { Injectable } from "@angular/core";
import { RestPath } from "./restpath.class";
import { Entity } from "../entity.interface";
import { environment } from "../../environments/environment.prod";

@Injectable({providedIn:"root"})
export abstract class RestServiceAbstract implements RestService{
    path:string;
    constructor(private dataService:DataService<any>){
 
    }
    get(params?:any,callBackNext?:any,callbackError?:any, callbackComplete?:any){
        this.dataService.get(this.path, params, callBackNext, callbackError, callbackComplete );
    }
    post(data: any, callBackNext?: any, callbackError?: any, callbackComplete?: any) {
        this.dataService.post(this.path, data, callBackNext, callbackError, callbackComplete);
    }
    delete(entity:any, callBackNext?:any,callbackError?:any, callbackComplete?:any){
        this.dataService.delete(this.path, entity, callBackNext, callbackError, callbackComplete);
    }
    getResourcePath(entity:Entity){
        return environment.restApiUrl + "/" + this.path + "/" + entity.id;
    }
}