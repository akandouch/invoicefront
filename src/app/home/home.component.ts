import {Component, OnInit} from '@angular/core';
import {faHome} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faHome = faHome;
  public menu = {color: '#00c68e', label: 'menu.home', icon: this.faHome};

  constructor() {
  }

  ngOnInit() {
  }

}
