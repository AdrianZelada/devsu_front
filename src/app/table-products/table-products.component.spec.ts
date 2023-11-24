import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProductsComponent } from './table-products.component';
import { ProductService } from '../service/product-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TableModule } from '../components/table/table.module';
import { ConfirmDialogModule } from '../components/confirm-dialog/confirm-dialog.module';
import { FormRegisterComponent } from '../form-register/form-register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from '../app-routing.module';
import {Location} from '@angular/common';
import { DialogHandlerService } from '../components/confirm-dialog/dialog-handler.service';
import { of } from 'rxjs';

describe('TableProductsComponent', () => {
  let component: TableProductsComponent;
  let fixture: ComponentFixture<TableProductsComponent>;
  let router: Router;
  let location: Location;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async() => {

    const productServiceSpy = jasmine.createSpyObj('ProductService',['getAllProducts']);
    await TestBed.configureTestingModule({
      providers: [ProductService , Router, DialogHandlerService ],
      // providers: [{
      //   provide: ProductService, useValue : productServiceSpy
      // }, Router, DialogHandlerService],
      declarations: [TableProductsComponent, FormRegisterComponent],
      imports:[
        HttpClientTestingModule,
        TableModule,
        ConfirmDialogModule,
        RouterTestingModule.withRoutes(routes),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router)
    location = TestBed.inject(Location)
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    fixture = TestBed.createComponent(TableProductsComponent);
    component = fixture.componentInstance;

    // router = TestBed.get(Router); // TestBed.inject(Router) for Angular 9+

    fixture.detectChanges();
  })



  it('should navigate to the correct URL when data argument is provided', function() {
    const data = { id: '123' };
    component.edit(data);
    fixture.detectChanges();
    fixture.whenStable().then(() =>{
      expect(location.path()).toBe('/product/123');
    });
  });

  it('should navigate to "/product" route when add method is called', function(doneFn: any) {
    component.add();
    fixture.detectChanges();
    // expect(productService.save).toHaveBeenCalled();
    fixture.whenStable().then(() =>{
      expect(location.path()).toBe('/product');
      doneFn()
    });
  });

  it('should call closeDialog method of dialogHandlerService', function() {
    const dialogHandlerService = jasmine.createSpyObj('DialogHandlerService', ['closeDialog']);
    const tableProductsComponent = new TableProductsComponent(productService, router, dialogHandlerService);
    tableProductsComponent.cancelar();
    expect(dialogHandlerService.closeDialog).toHaveBeenCalled();
  });

  it('should set itemToDelete property to the passed data parameter', function() {
    // const component = new TableProductsComponent();
    const data = { id: '123', name: 'Product' };
    component.showConfirm(data);
    expect(component.itemToDelete).toEqual(data);
  });

  it('should retrieve and set products array with data', () => {
    const productServiceMock = jasmine.createSpyObj('ProductService', ['getAllProducts']);
    const data = [{ id: '1', name: 'Product 1' }, { id: '2', name: 'Product 2' }];
    component.products = data;
    productServiceMock.getAllProducts.and.returnValue(of(data));
    component.getAllProducts();
    expect(component.products).toEqual(data);
  });
  it('should successfully delete an item', function() {

    const itemToDelete = { id: '123' };
    spyOn(component.productService, 'delete').and.returnValue(of("null"));
    spyOn(component.dialogHandlerService, 'closeDialog');
    spyOn(component, 'getAllProducts');
    component.itemToDelete = itemToDelete;
    component.delete();
    expect(component.productService.delete).toHaveBeenCalledWith(itemToDelete.id);
    expect(component.dialogHandlerService.closeDialog).toHaveBeenCalled();
    expect(component.getAllProducts).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
