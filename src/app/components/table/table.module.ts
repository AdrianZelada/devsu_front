import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { DimensionComponent } from './dimension/dimension.component';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  exports: [
    TableComponent
  ],
  declarations: [
    TableComponent,
    SearchComponent,
    DimensionComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TableModule { }
