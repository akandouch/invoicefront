import {Component, Input, OnInit} from '@angular/core';
import {faCogs} from '@fortawesome/free-solid-svg-icons';
import {Settings} from './settings.class';
import {DataService} from '../data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  faCogs = faCogs;
  settings: Settings;
  ds: DataService;

  constructor(ds: DataService) {
    this.ds = ds;
    this.getSettings();
  }

  save() {
    this.ds.postSettings(this.settings,() => {
      this.getSettings();
    });
  }

  getSettings() {
    this.ds.getSettings().subscribe(s => this.settings = s);
  }

  ngOnInit() {

  }

}
