import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'devsu-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() search: EventEmitter<String> = new EventEmitter();
  public text: String = '';

  searchText(text: String)  {
    this.search.emit(text);
  }
}
