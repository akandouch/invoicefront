import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { RestService } from '../services/restservice.interface';
import { faFastBackward, faFastForward, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons';
import { Entity } from '../entity.interface';
import { RestServiceAbstract } from '../services/restserviceabstract.class';
import { DataSourceFactory } from '../data-table/datasourcefactory.class';
import { DataSource, Page } from '../data-table/datasource.interface';
import { RestDataSource } from '../data-table/restdatasource.class';
import { MatSelect} from '@angular/material';
import { columnOrder } from '../data-table/data-table.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  pageNumber:number = 0;
  pageSize:number = 10;
  totalPages:number;
  totalElement:number;
  last:boolean;
  pages:number[];

  faFastBackward=faFastBackward;faFastForward=faFastForward;faStepForward=faStepForward;faStepBackward=faStepBackward;

  @Input()
  dataSource:DataSource;

  @Input()
  columnOrder:columnOrder;

  @Output()
  newData:EventEmitter<any>=new EventEmitter();


  copyDataSource:Array<Entity>;

  constructor() {
  }

  ngOnChanges(){
    if(this.dataSource.getPage){
      this.get();
    }
  }
  ngOnInit() {
    
    this.dataSource = DataSourceFactory.getDataSource(this.dataSource);
    this.get();
    if( this.dataSource instanceof RestDataSource ){
      console.log('listen');
      (<RestDataSource>this.dataSource).source
      .on("post",()=>{
        this.get();
      })
      .on("delete", ()=>{
        this.get();
      })
      .on("get", ()=>{
      });
    }
  }

  get(){
    this.dataSource.getPage(this.pageSize, this.pageNumber, this.columnOrder.name?this.columnOrder:null).then((page)=>{

      this.totalPages = page.totalPages;
      this.totalElement = page.totalElement;
      this.last = page.last;
      
      this.pages = [];
      for(let i=0;i<this.totalPages;i++){
        this.pages.push(i);
      }
      this.newData.emit(page.content);
    });
  }
}
