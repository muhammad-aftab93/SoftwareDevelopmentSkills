import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError} from 'rxjs';
import { DialogService } from '../services/dialog.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private globalErrorService: DialogService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.globalErrorService.showDialog('Error', error.error.error);
        return throwError(() =>  error);
      })
    );

  }
}
