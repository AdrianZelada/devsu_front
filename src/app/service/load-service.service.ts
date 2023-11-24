import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // private isLoading: Subject<boolean> = new Subject<boolean>();
  public isLoading$: Observable<boolean> = this.isLoading.asObservable();
  constructor() { }

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }
}
