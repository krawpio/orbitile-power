import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const auth = sessionStorage.getItem('basicAuth');
    if (auth) {
      request = request.clone({
        setHeaders: {
          Authorization: auth
        }
      });
    }

    return next.handle(request);
  }
}
