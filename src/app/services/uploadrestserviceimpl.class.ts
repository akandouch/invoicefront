import { RestServiceAbstract } from "./restserviceabstract.class";
import { Injectable } from "@angular/core";
import { Upload } from "../upload/upload.class";
import { environment } from "../../environments/environment";

@Injectable()
export class UploadRestServiceImpl extends RestServiceAbstract{
    path:string="upload";

    public getResourcePath(resource:Upload){
        return environment.restApiUrl + "/" + this.path + "/" + resource.id;
    }
}