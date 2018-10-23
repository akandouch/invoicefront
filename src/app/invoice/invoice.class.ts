import {Item} from '../item/item.class';
import {InvoiceProfile} from '../invoiceprofile/invoiceprofile.class';
import { StatusEnum } from './status.enum';
import { Entity } from '../entity.interface';
import {Upload} from '../upload/upload.class';

export class Invoice implements Entity {
  public title: string = '';
  public id: string;
  public invoiceNumber: string;
  public items: Item[] = [];
  public attachments: Upload[] = [];

  public invoicer: InvoiceProfile = new InvoiceProfile();
  public invoiced: InvoiceProfile = new InvoiceProfile();

  public status:StatusEnum = StatusEnum.OPEN;

  constructor() {
  }

  public addItem(item: Item) {
    this.items.push(item);
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public getInvoicer() {
    return this.invoicer;
  }

  public getInvoiced() {
    return this.invoiced;
  }

  public setInvoicer(invoicer: InvoiceProfile) {
    this.invoicer = invoicer;
  }

  public setInvoiced(invoiced: InvoiceProfile) {
    this.invoiced = invoiced;
  }

  public fillInvoice(invoice: Invoice) {
    this.id = invoice.id;
    this.items = invoice.items;
    this.title = invoice.title;
    this.invoicer = invoice.invoicer;
    this.invoiced = invoice.invoiced;
    this.status = invoice.status;
    this.invoiceNumber = invoice.invoiceNumber;
    this.attachments = invoice.attachments;
    if( !this.attachments){
      this.attachments = [];
    }
  }

  public removeItem(idx: number) {
    this.items.splice(idx, 1);
  }

  public updateItem(idx: number, item: Item) {
    this.items[idx] = item;
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }
}
