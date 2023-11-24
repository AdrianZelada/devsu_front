import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogHandlerService {

  private activeDialog: Subject<boolean> = new Subject();
  public activeDialog$: Observable<boolean> = this.activeDialog.asObservable();
  constructor() { }

  showDialog() {
    this.activeDialog.next(true);
  }
  closeDialog() {
    this.activeDialog.next(false);
  }
}
