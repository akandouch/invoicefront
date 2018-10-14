import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { faEye } from '@fortawesome/free-solid-svg-icons';


export interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges {

  @Input()
  public  dataSource;

  @Input()
  public  dataColumns:Array<string>;

  @ViewChild(MatSort) sort:MatSort;

  public  matDataSource;
  faOpen=faEye;

  constructor() {
  }

  ngOnInit() {
    this.matDataSource = new MatTableDataSource(this.dataSource);
    this.matDataSource.sort = this.sort;
  }
  ngOnChanges(){
    this.matDataSource = new MatTableDataSource(this.dataSource);
    this.matDataSource.sort = this.sort;
  }

}
