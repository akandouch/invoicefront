import { Component } from '@angular/core';
import {faHome, faHistory, faFileInvoice, faAddressBook, faCogs, IconDefinition, faChartLine} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'invoicecfront';
  faHome = faHome;faHistory = faHistory;faFileInvoice = faFileInvoice;faProfile=faAddressBook;faCogs=faCogs;

  menu:MenuLink[];
  currentMenu:MenuLink;

  constructor(private router:Router){
    this.menu = [];
    
    this.menu.push({color:"#ff84ff", route:"/dashboard", label:"Dashboard", icon:faChartLine, selected:true});
    this.menu.push({color:"#5cc664", route:"/invoice", label:"Invoices", icon:faFileInvoice});
    this.menu.push({color:"#848dff", route:"/invoiceprofile", label:"Profiles", icon:faAddressBook});
    this.menu.push({color:"#ff8484", route:"/settings", label:"Settings", icon:faCogs});

    console.log(router);
    this.currentMenu = {color:"#ff84ff", route:"/dashboard", label:"Dashboard", icon:faChartLine,selected:true};
  }
  click(item:MenuLink){
    this.menu.forEach(x=>x.selected=false);
    this.currentMenu = item;
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

