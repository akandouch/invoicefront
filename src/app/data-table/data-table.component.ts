import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {faCopy, faEdit, faEllipsisH, faEye, faFileExcel, faTrashAlt, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {RestService} from '../services/restservice.interface';
import {Entity} from '../entity.interface';
import {RestServiceAbstract} from '../services/restserviceabstract.class';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


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
  public customActions: Array<CustomAction>;

  @Input()
  enableConsult: boolean = false;

  @Input()
  enableDelete: boolean = false;

  @Input()
  enableEdit: boolean = false;

  @Output()
  public editEvent: EventEmitter<Entity> = new EventEmitter();

  @Output()
  public consultEvent: EventEmitter<Entity> = new EventEmitter();

  @Output()
  public deleteEvent: EventEmitter<Entity> = new EventEmitter();

  @Output()
  public clickEvent: EventEmitter<Entity> = new EventEmitter();

  @Output()
  public customEvent: EventEmitter<CustomEventData> = new EventEmitter();

  public datas: Array<Entity> = new Array();

  public noPagination: boolean = false;

  faEye = faEye;
  faEdit = faEdit;
  faCopy = faCopy;
  faTrashAlt = faTrashAlt;
  faFileExcel = faFileExcel;
  faEllipsisH = faEllipsisH;

  constructor(private translate: TranslateService, private modalService: NgbModal) {
  }

  ngOnInit() {
    if (this.dataSource instanceof RestServiceAbstract === false) {
      this.datas = <Array<Entity>>this.dataSource;
      this.noPagination = true;
    }
  }

  generateCSV() {
    const labelHeaders = this.dataColumns.map(d => d.field.name);
    const header = labelHeaders.join(',');
    const rows = this.datas.map(data => labelHeaders.map((value) => data[value]).join(','))
      .join('\n');
    const csvData = header + '\n' + rows;
    console.log(csvData);
    const blob = new Blob([csvData], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, 'generated-file.csv>');
    } else {
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated-file.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }

  ngOnChanges() {
    console.log('table change');
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

  custom(action: string, entity: Entity) {
    this.customEvent.emit({action: action, data: entity});
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

  click(entity: Entity) {
    this.clickEvent.emit(entity);
  }

  /*modal*/
  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {
    });
  }

  /*
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }*/

}

export class DataColumn {
  label: string;
  field: NestedField;
  sortable?: boolean;
  searcheable?: boolean;
  rules?: FieldRule[];
  cssClass?: string;
  hide?: boolean;
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

export class CustomAction {
  label: string;
  action: string;
  icon?: IconDefinition;
  cssClass?: string;
}

export class CustomEventData {
  action: string;
  data: Entity;
}
