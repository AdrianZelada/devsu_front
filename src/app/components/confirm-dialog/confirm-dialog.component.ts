import {  AfterViewInit, Component,   OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogHandlerService } from './dialog-handler.service';
import { DialogElement } from './type';

@Component({
  selector: 'devsu-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements AfterViewInit{

  confirmation: any;

  constructor(public dialogHandle: DialogHandlerService) {}

  ngAfterViewInit(): void {
    this.confirmation = document.getElementById("confirmation");
    this.dialogHandle.activeDialog$.subscribe((sw) => {
      if(sw) {
        this.confirmation?.showModal();
      } else {
        this.confirmation?.close();
      }
    });
  }

  close() {
    this.confirmation?.close();
  }
}
