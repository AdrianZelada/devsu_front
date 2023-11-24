import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'devsu-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnChanges{
  @Input() sizePage: number = 5;
  @Input() total: number = 10;
  @Output() pageFn: EventEmitter<number> = new EventEmitter();
  items: number = 0;
  pageSelected: number = 1;
  Arr = Array;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {        
    this.items = Math.ceil(this.total / this.sizePage);
    this.pageSelected =1;
    this.pageFn.emit(this.pageSelected);
  }

  clickPage(page: number){    
    this.pageSelected = page;
    this.pageFn.emit(page);
  }

  next() {    
    if(this.pageSelected < this.items) {
      this.pageSelected++;
      this.pageFn.emit(this.pageSelected);
    }
  }

  prev() {    
    if(this.pageSelected > 1) {
      this.pageSelected--;
      this.pageFn.emit(this.pageSelected);
    }    
  }

}
