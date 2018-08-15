export class Item {
    private description:string;
    private amount:number;
    private unit:number;

    private project:string;
    private period:string;
    private nature:string;
    private days:number;
    private rate:number;
    
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