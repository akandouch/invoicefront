import {Period} from './period.class';

export class Item {

  public id: string;
  public description: string;
  public unit: number;
  public vatRate: number;

  public project: string;
  public period: Period;
  public nature: string;
  public days: number = 0;
  public rate: number = 0;
  public amount: number = this.days * this.rate;

  public setDescription(description: string) {
    this.description = description;
  }

  public setAmount(amount: number) {
    this.amount = amount;
  }

  public setUnit(unit: number) {
    this.unit = unit;
  }
}
