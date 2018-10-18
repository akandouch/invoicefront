import { Address } from "./address.class";

export class InvoiceProfile {
    
    public id:string;
    public firstname:string;
    public lastname:string;
    public active:boolean;
    public vat:string;
    public mail:string;
    public phoneNumber:string;
    public accountNumber:string;
    public address:Address;
    public logo:Blob;

    constructor(){
        this.address = new Address();
    }



}
