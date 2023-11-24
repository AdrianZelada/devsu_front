import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { ToastService } from '../components/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorHttpErrorService implements HttpInterceptor {

  constructor(private toastService: ToastService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.loadService.show();
    return next.handle(req).pipe(
      catchError((error: any) => {
        let errorMessage = `Server-side error: ${error.status} ${error.message}`;
        this.toastService.setMessage({
          code: 'error',
          message: errorMessage
        });
        return throwError(() =>{});
      }));
  }
}
