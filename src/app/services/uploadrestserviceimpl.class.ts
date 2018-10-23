import { RestServiceAbstract } from "./restserviceabstract.class";
import { Injectable } from "@angular/core";

@Injectable()
export class UploadRestServiceImpl extends RestServiceAbstract{
    path:string="upload";
}