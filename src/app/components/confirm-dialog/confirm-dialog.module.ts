import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';



@NgModule({
  exports: [ConfirmDialogComponent],
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule
  ]
})
export class ConfirmDialogModule { }
