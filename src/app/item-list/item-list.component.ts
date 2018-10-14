import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '../invoice/invoice.class';
import { NgbModal, NgbActiveModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../item/item.class';
import { Period } from '../item/period.class';
import { faCoffee,faEye,faTrashAlt, faCopy, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../data.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @Input()
  public invoice:Invoice;
  public newItem:Item;
  public currentItem:Item;
  public currentIdx: number;
  public currentModal: NgbActiveModal;
  public faCoffee = faCoffee;
  public faEye = faEye;
  public faTrashAlt = faTrashAlt;
  public faCopy = faCopy;faPlus=faPlus;
  constructor(private ds:DataService ,private ngbModalService:NgbModal) { 
   // this.invoice = invoice;
  }

  ngOnInit() {
  }

  addItem(content){
    this.newItem = new Item();
    this.newItem.period = new Period();
    this.currentModal = this.ngbModalService.open(content, {
      backdrop: 'static',
      keyboard:false
    });
    
  }
  editItem(content,item:Item,idx:number){
    this.currentItem = item;
    this.currentIdx = idx;
    this.currentModal = this.ngbModalService.open(content, {
      backdrop: 'static',
      keyboard:false
    });
  }
  removeItem(idx:number){
    this.invoice.removeItem(idx);
  }
  updateItem(){
    this.invoice.updateItem(this.currentIdx, this.currentItem);
    console.log(this.invoice);
    this.ds.postInvoice(this.invoice,()=>{});
    this.currentModal.close();
  }
  saveItem(){
    this.invoice.addItem(this.newItem);
    this.ds.postInvoice(this.invoice,()=>{});
    this.currentModal.close();
  }
  copyItem(item:Item){
    this.invoice.addItem(item);
  }
  d(a){
    this.currentModal.dismiss(a);
  }
}
