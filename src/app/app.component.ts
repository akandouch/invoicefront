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
import {AuthenticationService} from './authenticationservice';
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
  public username: string;
  public returnUrl: string;
  public password: string;

  menu: MenuLink[];
  currentMenu: MenuLink;

  constructor(private router: Router, private actRoute: ActivatedRoute, private authenticationService: AuthenticationService,
              private translate: TranslateService) {
    this.translate.setDefaultLang(this.translate.currentLang || this.translate.getBrowserLang());

    this.menu = [];

    this.menu.push({color: '#ff84ff', route: '/dashboard', label: 'menu.dashboard', icon: faChartLine});
    this.menu.push({color: '#5cc664', route: '/invoice', label: 'menu.invoice', icon: faFileInvoice});
    this.menu.push({color: '#848dff', route: '/invoiceprofile', label: 'menu.profile', icon: faAddressBook});
    this.menu.push({color: '#ff8d64', route: '/product', label: 'menu.product', icon: faListAlt});
    this.menu.push({color: '#ff8484', route: '/settings', label: 'menu.setting', icon: faCogs});
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.menu.forEach(menu => menu.selected = false);
        const url = e.url;
        if (url === null || url.length === 0 || url === '/') {
          this.currentMenu = {color: '#00c68e', route: '/', label: 'menu.home', icon: this.faHome};
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
    this.returnUrl = '';
    this.actRoute.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    });
  }

  login() {
    console.log(`Username : ${this.username}, password : ${this.password}`);
    this.authenticationService.login(this.username, this.password, (resp) => {
      console.log(this.returnUrl);
      this.router.navigateByUrl(this.returnUrl);
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  isLoggedIn() {
    return this.getUser() !== null;
  }

  getUser() {
    return this.authenticationService.getUser();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
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
}

class MenuLink {
  color?: string;
  route?: string;
  label: string;
  icon?: IconDefinition;
  active?: string = 'active';
  public selected?: boolean = false;
}

