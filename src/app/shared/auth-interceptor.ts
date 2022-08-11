import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: UserService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf('/refreshtoken') > -1) {
      return next.handle(req);
    }
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.log('its 401');

          return this.handle401Error(req, next, error);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler,
    originalError: any
  ) {
    return this.auth.refreshToken().pipe(
      switchMap(() => {
        console.log('in authhfvfhvvfhvyvryryyvyrryryvyrv');

        return next.handle(req);
      }),
      catchError((error) => {
        console.log(error);
        return throwError(() => originalError);
      })
    );
  }
}
