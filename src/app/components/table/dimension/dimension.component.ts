import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'devsu-dimension',
  templateUrl: './dimension.component.html',
  styleUrls: ['./dimension.component.scss']
})
export class DimensionComponent implements OnInit {
  @Input() dimension: Array<number> = [];
  @Input() defaultSize: number = 5;
  @Output() size: EventEmitter<number> = new EventEmitter();
  public selected: number = 0;

  ngOnInit(): void {
    this.selected = this.defaultSize;
  }

  sizeSelected(size: number)  {
    this.size.emit(size);
  }

}
