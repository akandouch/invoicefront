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
} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthenticationService} from '../login/authenticationservice';
import {TranslateService} from '@ngx-translate/core';
import MenuLink from './menulink';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menu: MenuLink[];
  currentMenu: MenuLink;
  faHome = faHome;
  faHistory = faHistory;
  faFileInvoice = faFileInvoice;
  faProfile = faAddressBook;
  toggleNavbarClass = false;
  faCogs = faCogs;
  faLanguage = faSignLanguage;

  constructor(private translate: TranslateService, private router: Router,
              private actRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {
    this.translate.setDefaultLang(this.translate.currentLang || this.translate.getBrowserLang());
  }

  ngOnInit() {
    this.createMenu();
    this.setupRoute();
  }

  private createMenu() {
    this.menu = [
      {color: '#ff84ff', role: ['ADMIN'], route: '/dashboard', label: 'menu.dashboard', icon: faChartLine},
      {color: '#5cc664', role: ['ADMIN'], route: '/invoice', label: 'menu.invoice', icon: faFileInvoice},
      {color: '#848dff', role: ['ADMIN'], route: '/invoiceprofile', label: 'menu.profile', icon: faAddressBook},
      {color: '#ff8d64', role: ['ADMIN'], route: '/product', label: 'menu.product', icon: faListAlt},
      {color: '#ff8484', role: ['ADMIN'], route: '/settings', label: 'menu.setting', icon: faCogs}
    ];
  }

  private setupRoute() {
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

  hasRole(expected) {
    return this.authenticationService.hasRole(expected);
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

}
