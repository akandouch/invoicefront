import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {AuthenticationService} from './authenticationservice';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private router: Router, private actRoute: ActivatedRoute) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      console.log(err);
      console.log(err.status);
      let errorMessage = err.error.message;
      let errorLabel = 'error.unexpected';
      if (err.status === 401 || err.status === 403 || err.status === 0) {
        console.log('forbidden');
        this.authenticationService.logout();
        errorLabel = 'error.unauthorized';
        errorMessage = 'error.forbidden';
        this.router.navigate(['/error'],
          {
            queryParams: {label: errorLabel, status: err.status, message: errorMessage}
          });
      }
      return throwError(err);
    }));
  }
}
