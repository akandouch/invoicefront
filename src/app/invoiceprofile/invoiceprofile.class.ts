import { Address } from "./address.class";

export class InvoiceProfile {
    
    private _id:string;
    private firstname:string;
    private lastname:string;
    private _active:boolean;
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
    get active(){
        return this._active;
    }
    set active(active:boolean){
        this._active = active;
    }

}