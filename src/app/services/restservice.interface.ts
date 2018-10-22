import { Entity } from "../entity.interface";

export interface RestService {
    path:string;
    get(path:string, params?:any,callBackNext?:any,callbackError?:any, callbackComplete?:any);
    post<T extends Entity>(path:string, data:T, callBackNext?:any,callbackError?:any, callbackComplete?:any);
    delete<T extends Entity>(path:string, entity:Entity, callBackNext?:any,callbackError?:any, callbackComplete?:any);
}