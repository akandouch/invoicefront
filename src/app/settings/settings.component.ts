import {Component, OnInit, Inject} from '@angular/core';
import {faCogs} from '@fortawesome/free-solid-svg-icons';
import {Settings} from './settings.class';
import {DataService} from '../services/data.service';
import { UnitOfMeasureRestServiceImpl } from '../services/unitofmeasurerestserviceimpl.class';
import { UnitOfMeasure } from '../domain/unitofmeasure.class';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  faCogs = faCogs;
  settings: Settings;
  ds: DataService<any>;
  newUom:UnitOfMeasure;
  public menu = {color: '#ff8484', role: ['ADMIN'], route: '/settings', label: 'menu.setting', icon: faCogs};

  public uom:Array<UnitOfMeasure>;
  constructor(ds: DataService<any>, @Inject(UnitOfMeasureRestServiceImpl) private uomRestService:UnitOfMeasureRestServiceImpl) {
    this.ds = ds;
    this.getSettings();
    this.newUom = new UnitOfMeasure();
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
    this.uomRestService.get({},(data)=>{this.uom=data});
  }
  saveNewUom(){
    this.uomRestService.post(this.newUom,
    ()=>{
      alert('saved successfully');
    },
    (err)=>{
      alert('error during saving process');
      console.log(err)
    })
  }
  resetNewUom(){
    this.newUom = new UnitOfMeasure();
  }

}
