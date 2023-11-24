import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterComponent } from './form-register.component';
import { ProductService } from '../service/product-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

fdescribe('FormRegisterComponent', () => {
  let component: FormRegisterComponent;
  let fixture: ComponentFixture<FormRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService],
      declarations: [FormRegisterComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(FormRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('form invalid when empty', () => {
    expect(component.formGroup.valid).toBeFalsy();
  });

  describe('validate field : id', ()=>{
    it('id is required', () => {
      let errors:any = {};
      let id = component.formGroup.controls['id'];
      errors = id.errors || {};
      expect(errors['required']).toBeTruthy();
    });
    it('id validate min length 3', () => {
      let errors:any = {};
      let id = component.formGroup.controls['id'];
      id.setValue("22");
      errors = id.errors || {};
      expect(errors['minlength']).toBeTruthy();
    });

    it('id validate max length 10', () => {
      let errors:any = {};
      let id = component.formGroup.controls['id'];
      id.setValue("22222222222");
      errors = id.errors || {};
      expect(errors['maxlength']).toBeTruthy();
    });
  });

  describe('validate field : name', ()=>{
    it('name is required', () => {
      let name = component.formGroup.controls['name'];
      let errors:any = {};
      errors = name.errors || {};
      expect(errors['required']).toBeTruthy();
    });
    it('name validate min length 5', () => {
      let name = component.formGroup.controls['name'];
      let errors:any = {};
      name.setValue("22222");
      errors = name.errors || {};
      expect(errors['minlength']).toBeFalsy();
    });

    it('name validate max length 100', () => {
      let name = component.formGroup.controls['name'];
      let errors:any = {};
      name.setValue("2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222");
      errors = name.errors || {};
      expect(errors['maxlength']).toBeTruthy();
    });
  })
  // describe('validate field : id', ()=>{
  //   it('id is required', () => {
  //     let errors:any = {};
  //     let id = component.formGroup.controls['id'];
  //     errors = id.errors || {};
  //     expect(errors['required']).toBeTruthy();
  //   });
  //   it('id validate min length 3', () => {
  //     let errors:any = {};
  //     let id = component.formGroup.controls['id'];
  //     id.setValue("22");
  //     errors = id.errors || {};
  //     expect(errors['minlength']).toBeTruthy();
  //   });

  //   it('id validate max length 10', () => {
  //     let errors:any = {};
  //     let id = component.formGroup.controls['id'];
  //     id.setValue("22222222222");
  //     errors = id.errors || {};
  //     expect(errors['maxlength']).toBeTruthy();
  //   });
  // })

  // it('id is required', () => {
  //   let errors:any = {};
  //   let id = component.formGroup.controls['id'];
  //   // id.setValue();
  //   errors = id.errors || {};

  //   // fixture.detectChanges();
  //   expect(errors['required']).toBeFalsy();
  //   expect(errors['minLength']).toBeFalsy();
  //   // expect(component.formGroup.valid).toBeFalsy();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
