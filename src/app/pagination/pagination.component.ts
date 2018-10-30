import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RestService } from '../services/restservice.interface';
import { faFastBackward, faFastForward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  pageNumber:number = 0;
  pageSize:number = 10;
  totalPages:number;
  totalElement:number;
  last:boolean;
  pages:number[];

  faFastBackward=faFastBackward;faFastForward=faFastForward;

  @Input()
  restService:RestService;

  @Output()
  newData:EventEmitter<any>=new EventEmitter();

  constructor() {
   }

  ngOnInit() {
    this.get();
  }

  get(){
    this.restService.get({pageNumber:this.pageNumber, pageSize:this.pageSize},(data)=>{
      console.log(data);

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
  }

}
