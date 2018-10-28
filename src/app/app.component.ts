import {Component} from '@angular/core';
import {faAddressBook, faChartLine, faCogs, faFileInvoice, faHistory, faHome, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {AuthenticationService} from './authenticationservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'invoicecfront';
  faHome = faHome;
  faHistory = faHistory;
  faFileInvoice = faFileInvoice;
  faProfile = faAddressBook;
  toggleNavbarClass = false;
  faCogs = faCogs;
  public username: string;
  public password: string;

  menu: MenuLink[];
  currentMenu: MenuLink;

  constructor(private router: Router, private actRoute: ActivatedRoute, private authenticationService: AuthenticationService) {
    this.menu = [];

    this.menu.push({color: '#ff84ff', route: '/dashboard', label: 'Dashboard', icon: faChartLine, selected: true});
    this.menu.push({color: '#5cc664', route: '/invoice', label: 'Invoices', icon: faFileInvoice});
    this.menu.push({color: '#848dff', route: '/invoiceprofile', label: 'Profiles', icon: faAddressBook});
    this.menu.push({color: '#ff8484', route: '/settings', label: 'Settings', icon: faCogs});
    this.currentMenu = {color: '#ff84ff', route: '/dashboard', label: 'Dashboard', icon: faChartLine, selected: true};
    console.log(this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        const currentMenuList = this.menu.filter(r => r.route === e.url);
        if (currentMenuList && currentMenuList.length > 0) {
          this.currentMenu = currentMenuList[0];
          this.currentMenu.selected = true;
        }
      }
    }));
  }

  login() {
    console.log(`Username : ${this.username}, password : ${this.password}`);
    this.authenticationService.login(this.username, this.password, (resp) => {
    });
  }

  isLoggedIn() {
    return this.getUser() !== null;
  }

  getUser() {
    return this.authenticationService.getUser();
  }

  logout() {
    this.authenticationService.logout();
  }

  click(item: MenuLink) {
    this.menu.forEach(x => x.selected = false);
    this.currentMenu = item;
  }


  toggleNavbar() {
    this.toggleNavbarClass = !this.toggleNavbarClass;
  }

  toggleNavbarShow() {
    if (this.toggleNavbarClass) {
      return 'collapse navbar-collapse show';
    }
    return 'collapse navbar-collapse';
  }
}

class MenuLink {
  color?: string;
  route?: string;
  label: string;
  icon?: IconDefinition;
  active?: string = 'active';
  public selected?: boolean = false;
}

