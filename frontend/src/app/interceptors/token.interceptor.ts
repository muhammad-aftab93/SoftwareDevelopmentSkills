import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, switchMap, take } from 'rxjs';
import { Store, select } from "@ngrx/store";
import { selectJwtToken } from "../ngrx/selectors/login.selectors";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.pipe(
      select(selectJwtToken),
      take(1),
      switchMap(token => {
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: token
            }
          });
        }
        return next.handle(request);
      })
    );
  }
}
