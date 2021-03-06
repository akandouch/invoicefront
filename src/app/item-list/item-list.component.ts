import {Component, Input, OnInit} from '@angular/core';
import {Invoice} from '../invoice/invoice.class';
import {NgbActiveModal, NgbDate, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Item} from '../item/item.class';
import {Period} from '../item/period.class';
import {faCoffee, faCopy, faEdit, faEllipsisH, faEye, faListAlt, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {DataService} from '../services/data.service';
import {DataColumn} from '../data-table/data-table.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @Input()
  public invoice: Invoice;
  public newItem: Item;
  public currentItem: Item;
  public currentIdx: number;
  public currentModal: NgbActiveModal;
  public faCoffee = faCoffee;faEye = faEye; faTrashAlt = faTrashAlt;faCopy = faCopy;faEllipsisH = faEllipsisH;faEdit = faEdit;faListAlt = faListAlt;faPlus = faPlus;

  /* for data table */
  public dataColumns:Array<DataColumn> = [
    {field: {name: 'id'}, label: 'page.items.id'},
    /*{field:{name:"description"}, label:"Description"},*/
    {field: {name: 'project'}, label: 'page.items.project'},
    {field: {name: 'unit'}, label: 'page.items.priceUnit'},
    {field: {name: 'vatRate'}, label: 'page.items.vatRate'},
    {field: {name: 'period'}, label: 'page.items.period'}
  ];
  constructor(private ds: DataService<any>, private ngbModalService: NgbModal) {
    // this.invoice = invoice;
  }

  ngOnInit() {
  }

  addItem(content) {
    this.ds.getSettings().subscribe(settings => {
      this.newItem = new Item();
      this.newItem.rate = settings.currentRate;
      this.newItem.vatRate = settings.currentVatRate;
      this.newItem.period = new Period();
      const now: Date = new Date();
      this.newItem.period.from = new NgbDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
      this.newItem.period.to = new NgbDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
      this.currentModal = this.ngbModalService.open(content, {
        backdrop: 'static',
        keyboard: false
      });
    });

  }

  editItem(content, item: Item, idx?: number) {
    this.currentItem = item;
    this.currentIdx = idx;
    this.currentModal = this.ngbModalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
  }

  removeItem(item: Item) {
    var idx = this.invoice.items.findIndex(x=>{
      return x.id == item.id;
    })
    this.invoice.removeItem(idx);
  }

  updateItem() {
    console.log(this.invoice);
    const that = this;
    this.ds.postItem(this.invoice.id, this.currentItem, () => {
      that.invoice.updateItem(that.currentIdx, that.currentItem);
      that.currentModal.close();
    });
  }

  saveItem() {
    const that = this;
    this.ds.postItem(this.invoice.id, this.newItem, () => {
      that.invoice.addItem(that.newItem);
      that.currentModal.close();
    });
  }

  copyItem(item: Item) {
    let copy = item;
    copy.id = null;
    this.invoice.addItem(copy);
  }

  d(a) {
    this.currentModal.dismiss(a);
  }
  updateDays(days:number){
    this.currentItem.days = days;
  }
}
