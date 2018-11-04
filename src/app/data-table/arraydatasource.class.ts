import { DataSource, Page } from "./datasource.interface";
import { Entity } from "../entity.interface";

export class ArrayDataSource implements DataSource{
    constructor(private _source:Array<Entity>){
    }
    get source():Array<Entity>{
        return this._source;
    }
    set source(source:Array<Entity>){
        this._source = source;
    }
    getPage(pageSize:number, pageNumber:number){

        return new Promise<Page>((resolve)=>{
            var p:Page;
            var pages = [0];
            var totalPages = 0;
            var last = false;
            var totalElement = this._source.length;
            var content:any[] = this._source;
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
                totalElement:totalElement,
                totalPages:totalPages
            };
            console.log(p);
            resolve(p);
            });
    }


    
}