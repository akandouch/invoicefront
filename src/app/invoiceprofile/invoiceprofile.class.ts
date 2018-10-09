import { Address } from "./address.class";

export class InvoiceProfile {
    
    private _id:string;
    private firstname:string;
    private lastname:string;
    private active:boolean;
    private vat:string;
    private address:Address;

    constructor(){
        this.address = new Address();
    }
    get id(){
        return this._id;
    }
    set id(id:string){
        this._id = id;
    }

}