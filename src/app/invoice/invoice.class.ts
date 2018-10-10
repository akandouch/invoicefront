import { Item } from "../item/item.class";
import { InvoiceProfile } from "../invoiceprofile/invoiceprofile.class";

export class Invoice {
    private title:string = "";
    private _id:string;
    private items:Item[] = [];

    private invoicer:InvoiceProfile;
    private invoiced:InvoiceProfile;

    public addItem(item:Item){
        this.items.push(item);
    }
    public setTitle(title:string){
        this.title = title;
    }
    public setInvoicer(invoicer:InvoiceProfile){
        this.invoicer = invoicer;
    }
    public setInvoiced(invoiced:InvoiceProfile){
        this.invoiced = invoiced;
    }

    public fillInvoice(invoice:any){
        this._id = invoice.id;
        this.items = invoice.items;
        this.title = invoice.title;
        this.invoicer = invoice.invoicer;
        this.invoiced = invoice.invoiced;
    }

    public removeItem(idx:number){
        this.items.splice(idx, 1);
    }

    public updateItem(idx:number,item:Item){
        this.items[idx] = item;
    }

    get id():string{
        return this._id;
    }

    set id(id:string){
        this._id = id;
    }
}