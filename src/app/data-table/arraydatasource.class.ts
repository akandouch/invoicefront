import { DataSource, Page } from "./datasource.interface";
import { Entity } from "../entity.interface";
import { columnOrder } from "./data-table.component";

export class ArrayDataSource implements DataSource{
    constructor(private _source:Array<Entity>){
    }
    get source():Array<Entity>{
        return this._source;
    }
    set source(source:Array<Entity>){
        this._source = source;
    }
    getPage(pageSize:number, pageNumber:number, order:columnOrder){
        return new Promise<Page>((resolve)=>{
            var p:Page;
            var pages = [0];
            var totalPages = 0;
            var last = false;
            var totalElement = this._source.length;
            var content:any[] = order?this._source.sort((a,b)=>{return order.asc?('' + a[order.name]).localeCompare('' + b[order.name]):('' + b[order.name]).localeCompare('' + a[order.name]) }):this._source;
            if(pageSize < this._source.length ){
                pages = [];
                var max = this._source.length;
                var i = 0;
                while( max > 0 ){
                last = false;
                pages.push(i);
                i++
                max-=pageSize;
                }
                var start = pageNumber*pageSize;
                var end = +(pageNumber*pageSize).valueOf() + +pageSize.valueOf();

                content = this._source.slice(start, end);
                totalPages = pages.length;
            }
            if(pageSize* (+pageNumber + +1) >= this._source.length){
                last = true;
            }
            p = {
                content:content,
                last:last,
                totalElements:totalElement,
                totalPages:totalPages
            };
            console.log(p);
            resolve(p);
            });
    }


    
}