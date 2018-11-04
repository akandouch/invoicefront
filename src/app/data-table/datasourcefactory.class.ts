import { ArrayDataSource } from "./arraydatasource.class";
import { RestServiceAbstract } from "../services/restserviceabstract.class";
import { RestDataSource } from "./restdatasource.class";

export class DataSourceFactory{
    public static getDataSource(source:any){

        console.log("iii")
        if(source instanceof Array){
            console.log('array')
            return new ArrayDataSource(source);
        }
        else if(source instanceof RestServiceAbstract){
            console.log('rest')
            return new RestDataSource(source);
        }
        else{
            throw new Error("data source not compatible with data table, please provide an array {key:value} or a RestService");
        }

    }
}