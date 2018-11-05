import {Component, OnInit} from '@angular/core';

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
    return !localStorage.getItem('gdpr');
  }

  gdprAccepted() {
    localStorage.setItem('gdpr', 'true');
  }
}
