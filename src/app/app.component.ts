import { Component } from '@angular/core';
import {faHome, faHistory, faFileInvoice, faAddressBook, faCogs} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'invoicecfront';
  faHome = faHome;faHistory = faHistory;faFileInvoice = faFileInvoice;faProfile=faAddressBook;faCogs=faCogs;
}
