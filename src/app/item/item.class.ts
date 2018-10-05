import { Period } from "./period.class";

export class Item {

    private id:number;
    private description:string;
    private unit:number;

    private project:string;
    public period:Period;
    private nature:string;
    private days:number = 0;
    private rate:number = 0;
    private amount:number = this.days * this.rate;
    
    public setDescription(description:string){
        this.description = description;
    }
    public setAmount(amount:number){
        this.amount = amount;
    }
    public setUnit(unit:number){
        this.unit = unit;
    }
}