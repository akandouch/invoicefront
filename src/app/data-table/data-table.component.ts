import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { faEye, faEdit, faCopy, faTrashAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { RestService } from '../services/restservice.interface';
import { Entity } from '../entity.interface';
import { RestServiceAbstract } from '../services/restserviceabstract.class';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges {

  @Input()
  public dataSource:RestService|Array<Entity>;
  @Input()
  public dataColumns:Array<DataColumn>;

  @Output()
  public editEvent:EventEmitter<Entity> = new EventEmitter();
  
  @Output()
  public consultEvent:EventEmitter<Entity> = new EventEmitter();

  @Output()
  public deleteEvent:EventEmitter<Entity> = new EventEmitter();

  public datas:Array<Entity> = new Array();

  public noPagination:boolean = false;
  
  faEye=faEye;faEdit=faEdit;faCopy=faCopy;faTrashAlt=faTrashAlt;faEllipsisH=faEllipsisH;

  constructor() {
  }

  ngOnInit() {
    if(this.dataSource instanceof RestServiceAbstract == false){
      this.datas = <Array<Entity>>this.dataSource;
      this.noPagination = true;
    }
  }
  ngOnChanges(){
  }
  refreshGrid(data){
    this.datas = data;
  }

  consult(entity:Entity){
    this.consultEvent.emit(entity);
  }
  edit(entity:Entity){
    this.editEvent.emit(entity);
  }
  delete(entity:Entity){
    this.deleteEvent.emit(entity);
  }
  getdata(data:any, field:NestedField){
    var value=data[field.name];

    if(field.child){
      return this.getdata(value,field.child);
    }
    return value;
  }

}
export class DataColumn{
  label:string;
  field:NestedField;
  sortable?:boolean;
  searcheable?:boolean;
}
export class NestedField{
  name:string;
  child?:NestedField;
}