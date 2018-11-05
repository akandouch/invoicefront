import {Component, OnInit} from '@angular/core';
import {faCogs} from '@fortawesome/free-solid-svg-icons';
import {Settings} from './settings.class';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  faCogs = faCogs;
  settings: Settings;
  ds: DataService<any>;
  public menu = {color: '#ff8484', role: ['ADMIN'], route: '/settings', label: 'menu.setting', icon: faCogs};

  constructor(ds: DataService<any>) {
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
