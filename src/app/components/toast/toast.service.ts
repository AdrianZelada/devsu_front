import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private message: Subject<any> = new Subject()
  public message$: Observable<any> = this.message.asObservable();
  constructor() { }

  public setMessage(data : any) {
    this.message.next(data);
  }
}
