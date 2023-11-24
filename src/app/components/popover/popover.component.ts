import { Component, ContentChild, ElementRef, HostListener, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'devsu-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent {

  template: HTMLElement;
  @HostListener("click")
  clicked() { }
  @HostListener("document:click")
  clickedOut() {
    if(this.template){
      this.template.style.display =  'none';
    }
  }

  viewPopover(template: HTMLElement, event : Event) {
    template.style.display = (template.style.display === 'none') || (template.style.display === '') ? 'block' : 'none';
    this.template = template;
    event.stopPropagation();
  }

}
