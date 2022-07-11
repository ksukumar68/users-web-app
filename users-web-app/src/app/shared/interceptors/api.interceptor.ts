import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private baseUrl = environment.baseApiUrl;
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiUrl = `${this.baseUrl}${req.url}`;    

    req = req.clone({

      url: apiUrl,
      setHeaders: {
        'Content-Security-Policy': `frame-ancestors ${environment.security.allowedOrigins}`,
        'X-Frame-Options': `ALLOW-FROM ${environment.security.allowedOrigins}`,
        'X-XSS-Protection': '1; mode=block',
        'Authorization': "Bearer " + localStorage.getItem("token")
      }
    });

    return next.handle(req);
  }
}
