import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableProductsComponent } from './table-products/table-products.component';
import { FormRegisterComponent } from './form-register/form-register.component';

export const routes: Routes = [
  {
    path: '',
    component: TableProductsComponent
  },
  {
    path: 'product',
    component: FormRegisterComponent
  },
  {
    path: 'product/:id',
    component: FormRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
