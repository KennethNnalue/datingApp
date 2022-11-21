import { SpinnerService } from './../services/spinner.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Activate the spinner when sending out request with our spinner service
    // this.spinnerService.busy();

    // Deactivate the spinner when the request is completed
    return next.handle(request).pipe(
      //Add a delay for because our local server is too fast to enable us see the spinner
      delay(1000),
      finalize(() => {
        // this.spinnerService.idle();
      })
    );
  }
}
