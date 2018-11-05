import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.css']
})
export class TitlePageComponent implements OnInit {

  @Input()
  public menu: any;

  constructor() {
  }

  ngOnInit() {
    console.log(this.menu);
  }

}
