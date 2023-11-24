import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Header } from './interface/header';

@Component({
  selector: 'devsu-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterContentChecked {

  @Input() get data() :Array<any> {
    return this._data;
  }
  set data(data: Array<any>) {
    this._data = data;
    this.renderTable();
  }

  private _data: Array<any>= [];
  public currentData: Array<any>= [];
  @Input() columns: Array<Header> = [];
  @Input() dimension: Array<number> = [5,10,15];
  @Input() defaultSize: number = 5;
  @Input() text: String = '';
  @Input() filterFields: Array<String> = [];
  sizeTable: number = 0;

  public sizePage: number = 0;
  public page: number = 1;
  constructor(

    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.sizePage = this.defaultSize;
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  search(text: String) {
    this.text = text;
    this.renderTable();
  }

  sizeFn(size: number) {
    this.sizePage= size;
    this.renderTable();
  }

  pageFn(page: number) {
    this.page = page;
    this.renderTable();
  }

  renderTable() {
    if(this.sizePage != 0) {
      const start = ((this.page-1)* this.sizePage);
      const end = start + (+this.sizePage);
      const response = this._data.filter((item:any) => {
        let sw = false;
        this.filterFields.forEach((key: any)=>{
          const textField = item[key].toLowerCase();
          if(textField.includes(this.text.toLowerCase())){
            sw=true;
          }
        });
        return sw;
      })
      this.sizeTable = response.length;
      this.currentData = response.slice(start, end);
    }

  }
}
