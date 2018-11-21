import {Component, Input, OnInit} from '@angular/core';
import {faCog} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.css']
})
export class TitlePageComponent implements OnInit {

  @Input()
  public menu: any;

  public faCog=faCog;

  constructor() {
  }

  ngOnInit() {
    console.log(this.menu);
  }

}
