import { Observable } from "rxjs";
import { columnOrder } from "./data-table.component";

export interface DataSource{
    getPage(pageSize:number, pageNumber:number, columnOrder?:columnOrder):Promise<Page>;
}
export class Page {
    totalPages:number;
    totalElement:number;
    last:boolean;
    content:any[];
}