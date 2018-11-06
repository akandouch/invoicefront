import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.css']
})
export class GdprComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }


  gdprShow() {
    return environment.production && !localStorage.getItem('gdpr');
  }

  gdprAccepted() {
    localStorage.setItem('gdpr', 'true');
  }
}
