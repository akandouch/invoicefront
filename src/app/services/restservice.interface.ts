import { DataService } from "./data.service";
import { Entity } from "../entity.interface";

export interface RestService {
    path:string;
    //dataService:DataService<RestService>;

    /* HTTP GET *//*
    getNext(t:U[]);
    getError(error:any);
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