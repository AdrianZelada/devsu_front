import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormRegisterComponent } from './form-register/form-register.component';
import { TableProductsComponent } from './table-products/table-products.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorHttpService } from './service/interceptor-http.service';
import { InterceptorLoadingService } from './service/interceptor-loading.service';
import { TableModule } from './components/table/table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PopoverModule } from './components/popover/popover.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LoaderModule } from './components/loader/loader.module';
import { InterceptorHttpErrorService } from './service/interceptor-http-error.service';
import { ToastComponent } from './components/toast/toast.component';
import { ToastModule } from './components/toast/toast.module';
import { ConfirmDialogModule } from './components/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [
    AppComponent,
    FormRegisterComponent,
    TableProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    PopoverModule,
    LoaderModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorHttpService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorLoadingService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorHttpErrorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
