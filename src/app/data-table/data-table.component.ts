import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {faCopy, faEdit, faEllipsisH, faEye, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {RestService} from '../services/restservice.interface';
import {Entity} from '../entity.interface';
import {RestServiceAbstract} from '../services/restserviceabstract.class';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges {

  @Input()
  public dataSource: RestService | Array<Entity>;
  @Input()
  public dataColumns: Array<DataColumn>;

  @Input()
  enableConsult:boolean = false;
  
  @Input()
  enableDelete:boolean = false;
  
  @Input()
  enableEdit:boolean = false;

  @Output()
  public editEvent: EventEmitter<Entity> = new EventEmitter();

  @Output()
  public consultEvent: EventEmitter<Entity> = new EventEmitter();

  @Output()
  public deleteEvent: EventEmitter<Entity> = new EventEmitter();

  public datas: Array<Entity> = new Array();

  public noPagination: boolean = false;

  faEye = faEye;
  faEdit = faEdit;
  faCopy = faCopy;
  faTrashAlt = faTrashAlt;
  faEllipsisH = faEllipsisH;

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
    if (this.dataSource instanceof RestServiceAbstract == false) {
      this.datas = <Array<Entity>>this.dataSource;
      this.noPagination = true;
    }
  }
  
  ngOnChanges(){
    console.log("table change")
  }

  refreshGrid(data) {
    this.datas = data;
  }

  consult(entity: Entity) {
    this.consultEvent.emit(entity);
  }

  edit(entity: Entity) {
    this.editEvent.emit(entity);
  }

  delete(entity: Entity) {
    this.deleteEvent.subscribe((valid) => {

      console.log('refresh grid');

    });

    this.deleteEvent.emit(entity);
  }

  getdata(data: any, column: DataColumn) {

    var value = this.finddata(data, column.field);
    if (column.rules) {
      column.rules.forEach(x => {
        // TODO : implement other condition with switch case
        if (x.condition == FieldCondition.EQ && this.finddata(data, column.field) == x.value) {

          if (x.label) value = this.translate.instant(x.label);
        }
      });
    }
    return value;
  }

  finddata(data: any, field: NestedField) {
    var value = data[field.name];

    if (field.child) {
      return this.finddata(value, field.child);
    }
    return value;
  }

  getdataclass(data: any, column: DataColumn) {
    var cssClass = '';
    if (column.rules) {
      column.rules.forEach(x => {

        // TODO : implement other condition with switch case

        if (x.condition == FieldCondition.EQ && this.finddata(data, column.field) == x.value) {
          cssClass += x.cssClass;
        }

      });
    }
    return cssClass;
  }

}

export class DataColumn {
  label: string;
  field: NestedField;
  sortable?: boolean;
  searcheable?: boolean;
  rules?: FieldRule[];
  cssClass?: string;
}

export class NestedField {
  name: string;
  child?: NestedField;
}

export class FieldRule {
  condition: FieldCondition;
  value: string;
  cssClass?: string;
  label?: string;
}

export enum FieldCondition {
  GT,
  LT,
  EQ,
  EQGT,
  EQLT,
  DIFF
}
