import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private accountService: AccountService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error) {
          switch (error.status) {
            case 400:
              const errorObject = error.error.errors;
              if (errorObject) {
                const modalStateErrors = [];

                for (const key in errorObject) {
                  if (errorObject[key]) {
                    modalStateErrors.push(errorObject[key]);
                  }
                }
                throw modalStateErrors.flat();
              } else {
                this.accountService.openSnackBar(error.statusText);
              }
              break;

            case 401:
              this.accountService.openSnackBar(error.error);
              break;

            case 404:
              this.router.navigateByUrl('/not-found');
              break;

            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: error.error },
              };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;

            default:
              this.accountService.openSnackBar('Something unexpected Happened');
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
