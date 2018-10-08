import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '../invoice/invoice.class';
import { NgbModal, NgbActiveModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../item/item.class';
import { Period } from '../item/Period.class';
import { faCoffee,faEye,faTrashAlt, faCopy } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @Input()
  private invoice:Invoice;
  private newItem:Item;
  private currentItem:Item;
  private currentIdx: number;
  private currentModal: NgbActiveModal;
  private faCoffee = faCoffee;
  private faEye = faEye;
  private faTrashAlt = faTrashAlt;
  private faCopy = faCopy;
  constructor(private ngbModalService:NgbModal) { 
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
    this.currentModal.close();
  }
  saveItem(){
    this.invoice.addItem(this.newItem);
    this.currentModal.close();
  }
  copyItem(item:Item){
    this.invoice.addItem(item);
  }
  d(a){
    this.currentModal.dismiss(a);
  }
}
