import { Item } from "../item/item.class";
import { InvoiceProfile } from "../invoiceprofile/invoiceprofile.class";

export class Invoice {
    private title:string = "";
    public id:string;
    private items:Item[] = [];

    private invoicer:InvoiceProfile;
    private invoiced:InvoiceProfile;

    public addItem(item:Item){
        this.items.push(item);
    }
    public setTitle(title:string){
        this.title = title;
    }
    public getInvoicer(){
        return this.invoicer;
    }
    public getInvoiced(){
        return this.invoiced;
    }
    public setInvoicer(invoicer:InvoiceProfile){
        this.invoicer = invoicer;
    }
    public setInvoiced(invoiced:InvoiceProfile){
        this.invoiced = invoiced;
    }

    public fillInvoice(invoice:Invoice){
        this.id = invoice.id;
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
    public getId():string{
        return this.id;
    }
    public setId(id:string){
        this.id = id;
    }/*
    get id():string{
        return this._id;
    }

    set id(id:string){
        this._id = id;
    }*/
    /*get invoicer(){
        return this._invoicer;
    }
    set invoicer(invoicer:InvoiceProfile){
        this._invoicer = invoicer;
    }

    get invoiced(){
        return this._invoiced;
    }
    set invoiced(invoiced:InvoiceProfile){
        this._invoiced = invoiced;
    }*/
}