import { Observable } from "rxjs";

export interface DataSource{
    getPage(pageSize:number, pageNumber:number):Promise<Page>;
}
export class Page {
    totalPages:number;
    totalElement:number;
    last:boolean;
    content:any[];
}