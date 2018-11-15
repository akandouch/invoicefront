import { RestServiceAbstract } from "./restserviceabstract.class";
import { Injectable } from "@angular/core";

@Injectable({providedIn:"root"})
export class UnitOfMeasureRestServiceImpl extends RestServiceAbstract{
    path:string="uom";
}