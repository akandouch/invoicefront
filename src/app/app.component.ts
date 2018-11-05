import {Component, OnInit} from '@angular/core';
import {
  faAddressBook,
  faChartLine,
  faCogs,
  faFileInvoice,
  faHistory,
  faHome,
  faListAlt,
  faSignLanguage,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthenticationService} from './login/authenticationservice';
import {TranslateService} from '@ngx-translate/core';
import {environment} from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  localStorage = localStorage;
  title = 'invoicecfront';
  faHome = faHome;
  faHistory = faHistory;
  faFileInvoice = faFileInvoice;
  faProfile = faAddressBook;
  toggleNavbarClass = false;
  faCogs = faCogs;
  faLanguage = faSignLanguage;

  menu: MenuLink[];
  currentMenu: MenuLink;

  constructor(private router: Router, private actRoute: ActivatedRoute, private authenticationService: AuthenticationService,
              private translate: TranslateService) {
    this.translate.setDefaultLang(this.translate.currentLang || this.translate.getBrowserLang());

    this.menu = [];

    this.menu.push({color: '#ff84ff', role: ['ADMIN'], route: '/dashboard', label: 'menu.dashboard', icon: faChartLine});
    this.menu.push({color: '#5cc664', role: ['ADMIN'], route: '/invoice', label: 'menu.invoice', icon: faFileInvoice});
    this.menu.push({color: '#848dff', role: ['ADMIN'], route: '/invoiceprofile', label: 'menu.profile', icon: faAddressBook});
    this.menu.push({color: '#ff8d64', role: ['ADMIN'], route: '/product', label: 'menu.product', icon: faListAlt});
    this.menu.push({color: '#ff8484', role: ['ADMIN'], route: '/settings', label: 'menu.setting', icon: faCogs});

    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.menu.forEach(menu => menu.selected = false);
        const url = e.url;
        if (url === null || url.length === 0 || url === '/') {
          this.currentMenu = {color: '#00c68e', role: ['ANONYMOUS', 'USER', 'ADMIN'], route: '/', label: 'menu.home', icon: this.faHome};
          this.currentMenu.selected = true;
        } else {
          const currentMenuList = this.menu.filter(r => r.route === url);
          if (currentMenuList && currentMenuList.length > 0) {
            this.currentMenu = currentMenuList[0];
            this.currentMenu.selected = true;
          } else {
            this.currentMenu = null;
          }
        }

      }
    });
  }

  ngOnInit() {

  }



  useLanguage(language: string) {
    this.translate.use(language);
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
      return 'collapse navbar-collapse show ';
    }
    return 'collapse navbar-collapse';
  }

  gdprShow() {
    return environment.production && !localStorage.getItem('gdpr');
  }

  gdprAccepted() {
    localStorage.setItem('gdpr', 'true');
  }

  hasRole(expected) {
    return this.authenticationService.hasRole(expected);
  }

}

class MenuLink {
  color?: string;
  route?: string;
  role?: Array<string>;
  label: string;
  icon?: IconDefinition;
  active?: string = 'active';
  public selected?: boolean = false;
}

