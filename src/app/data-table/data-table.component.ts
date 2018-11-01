import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { faEye, faEdit, faCopy, faTrashAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { RestService } from '../services/restservice.interface';
import { Entity } from '../entity.interface';
import { RestServiceAbstract } from '../services/restserviceabstract.class';
import { findLocaleData } from '@angular/common/src/i18n/locale_data_api';


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
    console.log("table change")
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
    console.log(this.datas);
    this.deleteEvent.subscribe((valid)=>{
      
        console.log('refresh grid');
        console.log(this.datas);
      
    })
    
    this.deleteEvent.emit(entity);
  }
  getdata(data:any, column:DataColumn){

    var value = this.finddata(data,column.field);
    if(column.rules){
      column.rules.forEach(x=>{
        // TODO : implement other condition with switch case
        if(x.condition == FieldCondition.EQ && this.finddata(data,column.field) == x.value){
          
          if(x.label)value= x.label;
        }
      });
    }
    return value;
  }
  finddata(data:any, field:NestedField){
    var value=data[field.name];

    if(field.child){
      return this.finddata(value,field.child);
    }
    return value;
  }
  getdataclass(data:any, column:DataColumn){
    var cssClass="";
    if(column.rules){
      column.rules.forEach(x=>{

       // TODO : implement other condition with switch case

        if(x.condition == FieldCondition.EQ && this.finddata(data,column.field) == x.value){
            cssClass += x.cssClass;
        }

      });
    }
    return cssClass;
  }

}
export class DataColumn{
  label:string;
  field:NestedField;
  sortable?:boolean;
  searcheable?:boolean;
  rules?:FieldRule[];
  cssClass?:string;
}
export class NestedField{
  name:string;
  child?:NestedField;
}
export class FieldRule{
  condition:FieldCondition;
  value:string;
  cssClass?:string;
  label?:string;
}
export enum FieldCondition{
  GT,
  LT,
  EQ,
  EQGT,
  EQLT,
  DIFF
}