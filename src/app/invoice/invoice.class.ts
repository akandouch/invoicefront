import { Item } from "../item/item.class";

export class Invoice {
    private title:string = "";
    private items:Item[] = [];

    public getAddItem(item:Item){
        this.items.push(item);
    }
    public setTitle(title:string){
        this.title = title;
    }
}