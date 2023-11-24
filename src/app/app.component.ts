import { AfterContentInit, Component, OnInit } from '@angular/core';
import { LoadService } from './service/load-service.service';
import { Observable, debounceTime, of, timeout } from 'rxjs';
import { ToastService } from './components/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'sudev_frontend';
  loading: boolean = true;

  constructor(public loadService: LoadService, private toastService: ToastService){
      this.loadingService();
  }

  loadingService() {
    this.loadService.isLoading$.pipe(
      debounceTime(300)
    ).
    subscribe((sw: boolean) => {
      setTimeout(() => {
        this.loading = sw;
      }, 500);
    })
  }
}
