import { Component,Type, OnChanges, OnInit } from '@angular/core';
import {faHome, faHistory, faFileInvoice, faAddressBook, faCogs, IconDefinition} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'invoicecfront';
  faHome = faHome;faHistory = faHistory;faFileInvoice = faFileInvoice;faProfile=faAddressBook;faCogs=faCogs;

  menu:MenuLink[];

  constructor(){
    console.log('heere')
    this.menu = [];
    this.menu.push({color:"#5cc664", route:"/invoice", label:"Invoices", icon:faFileInvoice});
    this.menu.push({color:"#848dff", route:"/invoiceprofile", label:"Profiles", icon:faAddressBook});
    this.menu.push({color:"#ff8484", route:"/settings", label:"Settings", icon:faHome});
  }
  click(){
    this.menu.forEach(x=>x.selected=false);
  }


}
class MenuLink {
  color?:string;
  route?:string;
  label:string;
  icon?:IconDefinition;
  active?:string="active";
  public selected?:boolean=false;
}

