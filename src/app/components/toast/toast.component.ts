import { Component, OnInit } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'devsu-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit{

  currentMessage: any = {};

  show: boolean = false;

  constructor(public toastService:ToastService) {

  }

  ngOnInit(): void {
      this.toastListening()
  }

  toastListening() {
    this.toastService.message$.subscribe((data: any) => {
      console.log(data)
      this.show = true;
      this.currentMessage = data;
      setTimeout(() => {
        this.show = false;
      }, 3000)
    })
  }
}
