import { Item } from "../item/item.class";

export class Invoice {
    private title:string = "";
    private id:number=0;
    private items:Item[] = [];

    /** customer informations */
    private cust_vat:string;
    private cust_street:string;
    private cust_city:string;
    private cust_postcode:string;
    /** customer informations */

    /** invoicer informations */
    private vat:string;
    private street:string;
    private city:string;
    private postcode:string;
    /** invoicer informations */


    public addItem(item:Item){
        this.items.push(item);
    }
    public setTitle(title:string){
        this.title = title;
    }
    public fillInvoice(invoice:any){
        this.id = invoice.id;
        this.items = invoice.items;
        this.title = invoice.title;
       
        this.vat = invoice.vat;
        this.city = invoice.city;
        this.postcode = invoice.postcode;
        this.street = invoice.street;

        this.cust_city =invoice.cust_city;
        this.cust_postcode = invoice.cust_postcode;
        this.cust_street = invoice.cust_street;
        this.cust_vat = invoice.cust_vat

    }
}