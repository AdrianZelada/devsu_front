import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover.component';



@NgModule({
  declarations: [
    PopoverComponent
  ],
  exports: [
    PopoverComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PopoverModule { }
