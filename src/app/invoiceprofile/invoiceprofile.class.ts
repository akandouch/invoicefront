import { Address } from "./address.class";

export class InvoiceProfile {
    
    private _id:string;
    private _firstname:string;
    private _lastname:string;
    private _active:boolean;
    private _vat:string;
    private address:Address;

    constructor(){
        this.address = new Address();
    }

    get id():string{
        return this._id;
    }
    get active():boolean{
        return this._active;
    }
    get firstname():string{
        return this._firstname;
    }
    get lastname():string{
        return this._lastname;
    }
    get vat():string{
        return this._vat;
    }

    
    set id(id:string){
        this._id = id;
    }
    set active(active:boolean){
        this._active = active;
    }
    set firstname(firstname:string){
        this._firstname = firstname;
    }
    set lastname(lastname:string){
        this._lastname = lastname;
    }
    set vat(vat:string){
        this._vat = vat;
    }

}