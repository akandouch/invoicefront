import { DataService } from "./data.service";
import { Entity } from "../entity.interface";

export interface RestService {
    path:string;
    //dataService:DataService<RestService>;

    /* HTTP GET */
    get(params?:any,callBackNext?:any,callbackError?:any, callbackComplete?:any);
    post(data:any, callBackNext?:any,callbackError?:any, callbackComplete?:any);
    /*getError(error:any);
    getComplete();*/

    /* HTTP POST *//*
    postNext();
    postError(error:any);
    postComplete();
*/
    /* HTTP DELETE *//*
    deleteNext();
    deleteError(error:any);
    deleteComplete();*/
}