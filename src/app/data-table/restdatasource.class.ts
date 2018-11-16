import { DataSource, Page } from "./datasource.interface";
import { RestServiceAbstract } from "../services/restserviceabstract.class";
import { resolve } from "q";
import { columnOrder } from "./data-table.component";


export class RestDataSource implements DataSource{
    constructor(private _source:RestServiceAbstract){
    }
    get source():RestServiceAbstract{
        return this._source;
    }
    set source(source:RestServiceAbstract){
        this._source = source;
    }
    getPage(pageSize:number, pageNumber:number, order?:columnOrder){
        var promise:Promise<Page>= new Promise((resolve)=>{

        if(pageNumber>0)pageNumber-=1;
        var params = {pageNumber:pageNumber, pageSize:pageSize, orderColumn:null, direction:null};
        var p:Page;
        if(order){
            params.orderColumn = order.name
            params.direction = order.asc?"asc":"desc";
        }
        this._source.get(params,(data)=>{
            p = {
                totalPages: data.totalPages,
                totalElements: data.totalElements,
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