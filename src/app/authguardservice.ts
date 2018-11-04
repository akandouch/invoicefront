import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authenticationservice';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data.expectedRole || 'ANONYMOUS';
    if (this.auth.hasRole(expectedRole)) {
      return true;
    }
    this.router.navigate(['/error'],
      {
        queryParams: {label: 'error.label', status: 401, message: 'error.forbidden', returnUrl: state.url}
      });
    return false;
  }
}
