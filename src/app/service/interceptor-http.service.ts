import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InterceptorHttpService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const httpRequest = new HttpRequest(<any>req.method, environment.host + req.url,req.body, {
      responseType: req.method == 'DELETE' ? 'text':'json'
    });

    req = Object.assign(req, httpRequest);
    const clone = req.clone({
        headers: req.headers.set('authorId', environment.authorId.toString()),
    });
    return next.handle(clone);
  }
}
