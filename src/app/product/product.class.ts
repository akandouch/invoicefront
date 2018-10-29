import { Upload } from "../upload/upload.class";

export class Product {

    public id:string;
    public name:string;
    public description:string;
    public type:ProductType;

    public unitOfMeasure:UnitOfMeasure;
    public unitPrice:number;
    public quantity:number;

    public vat:number;

    public uploads:Upload[];
}

export enum UnitOfMeasure{
    DAYS = 0,
    UNIT = 1
}
export enum ProductType {
    SERVICE = 0,
    ITEM = 1
}