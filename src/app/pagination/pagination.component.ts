import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { RestService } from '../services/restservice.interface';
import { faFastBackward, faFastForward, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons';
import { Entity } from '../entity.interface';
import { RestServiceAbstract } from '../services/restserviceabstract.class';
import { DataSourceFactory } from '../data-table/datasourcefactory.class';
import { DataSource, Page } from '../data-table/datasource.interface';
import { RestDataSource } from '../data-table/restdatasource.class';

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

 /* @Input()
  dataSource:RestService|Array<Entity>;*/

  @Input()
  dataSource:DataSource;

  @Output()
  newData:EventEmitter<any>=new EventEmitter();


  copyDataSource:Array<Entity>;

  constructor() {
  }

  ngOnChanges(){
    //this.get();
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
    this.dataSource.getPage(this.pageSize, this.pageNumber).then((page)=>{

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

  getiold(){
    if(this.dataSource instanceof RestServiceAbstract){
      (<RestService>this.dataSource).get({pageNumber:this.pageNumber, pageSize:this.pageSize},(data)=>{
        this.newData.emit(data.content)
        this.totalPages = data.totalPages;
        this.totalElement = data.totalElement;
        this.last = data.last;
        this.pages = [];

        for(let i=0;i<this.totalPages;i++){
          
          this.pages.push(i);
        }
      },
      (err)=>{
        console.log('error' + err)
      })
    }else if(this.dataSource instanceof Array){
      //parseInt()
      console.log("front pagination")
      var datas:Array<Entity> = this.dataSource;
      this.pages = [0];
      if(this.pageSize < this.dataSource.length ){
        this.pages = [];
        var max = this.dataSource.length;
        var i = 0;
        while( max > 0 ){
          this.last = false;
          this.pages.push(i);
         // datas=this.dataSource.copyWithin(this.pageSize,j);
          i++
          max-=this.pageSize;
        //  j+=this.pageSize;
        }
        var start = this.pageNumber*this.pageSize;
        var end = +(this.pageNumber*this.pageSize).valueOf() + +this.pageSize.valueOf();
        console.log(start +"  -- " +  end);

        datas = this.dataSource.slice(start, end);
        this.totalPages = this.pages.length;
      }
      if(this.pageSize* (+this.pageNumber + +1) >= this.dataSource.length){
        this.last = true;
      }
      this.newData.emit(datas);
    }
  }

}
