import { Injectable } from "@angular/core";
import { RestServiceAbstract } from "./restserviceabstract.class";
import { RestPath } from "./restpath.class";

@Injectable({providedIn:"root"})
export class ItemRestServiceImpl extends RestServiceAbstract {
    path:string = "items";
}