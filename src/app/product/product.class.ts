import { Upload } from "../upload/upload.class";
import { Entity } from "../entity.interface";
import { UnitOfMeasure } from "../domain/unitofmeasure.class";

export class Product implements Entity {

    public id:string;
    public name:string;
    public description:string;
    public type:ProductType;

    public unitOfMeasure:UnitOfMeasure = new UnitOfMeasure();
    public unitPrice:number;
    public quantity:number;

    public vat:number;

    public uploads:Upload[];
}
export enum ProductType {
    SERVICE = 0,
    ITEM = 1
}