import { DataSource, Page } from "./datasource.interface";
import { RestServiceAbstract } from "../services/restserviceabstract.class";
import { resolve } from "q";


export class RestDataSource implements DataSource{
    constructor(private _source:RestServiceAbstract){
    }
    get source():RestServiceAbstract{
        return this._source;
    }
    set source(source:RestServiceAbstract){
        this._source = source;
    }
    getPage(pageSize:number, pageNumber:number){

        var promise:Promise<Page>= new Promise((resolve)=>{

        
        var p:Page;
        this._source.get({pageNumber:pageNumber, pageSize:pageSize},(data)=>{
            p = {
                totalPages: data.totalPages,
                totalElement: data.totalElement,
                last: data.last,
                content:data.content
            };
            resolve(p);
          },
          (err)=>{
            console.log('error' + err)
          })
        });
        
        return promise;
    }
}