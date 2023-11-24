import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoadService } from './load-service.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorLoadingService implements HttpInterceptor {

  constructor(private loadService: LoadService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
    this.loadService.show();
    return next.handle(req).pipe(
      finalize(() => {
        this.loadService.hide();
      }));
  }  
}
