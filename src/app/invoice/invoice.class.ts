import { Item } from "../item/item.class";

export class Invoice {
    private title:string = "";
    private _id:string;
    private items:Item[] = [];

    /** customer informations */
    private cust_vat:string;
    private cust_street:string;
    private cust_city:string;
    private cust_postcode:string;
    private cust_name:string;
    /** customer informations */

    /** invoicer informations */
    private vat:string;
    private street:string;
    private city:string;
    private postcode:string;
    private name:string;
    /** invoicer informations */


    public addItem(item:Item){
        this.items.push(item);
    }
    public setTitle(title:string){
        this.title = title;
    }
    public fillInvoice(invoice:any){
        this._id = invoice.id;
        this.items = invoice.items;
        this.title = invoice.title;
       
        this.vat = invoice.vat;
        this.city = invoice.city;
        this.postcode = invoice.postcode;
        this.street = invoice.street;
        this.name = invoice.name;

        this.cust_city =invoice.cust_city;
        this.cust_postcode = invoice.cust_postcode;
        this.cust_street = invoice.cust_street;
        this.cust_vat = invoice.cust_vat;
        this.cust_name = invoice.cust_name;

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