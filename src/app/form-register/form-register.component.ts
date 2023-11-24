import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ProductService } from '../service/product-service.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs';
import { DateUtil } from '../utils/date';
import { ToastService } from '../components/toast/toast.service';

@Component({
  selector: 'devsu-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {

  public formGroup: FormGroup;
  public isEdit: boolean = false;
  public data: any= {};
  public idExist: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      this.formGroup = this.fb.group({
        id: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
        name: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
        logo: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
        date_release: new FormControl("", [Validators.required, this.dateRangeValidator]),
        date_revision: new FormControl("", [Validators.required]),
      });

      const id = this.route.snapshot.params['id'];
      if(id){
        this.idExist = false;
        this.productService.getById(id).subscribe((data) => {
          if(data) {
            this.data = data;
            console.log(data.date_release)
            const dateRelease = DateUtil.dateToString(data.date_release);

            const dateRevision = DateUtil.dateToString(data.date_revision);
            this.isEdit = true;
            this.formGroup.controls['id'].disable();
            this.formGroup.setValue({
              id: data.id,
              name: data.name,
              logo: data.logo,
              description: data.description,
              date_release: dateRelease,
              date_revision: dateRevision
            });
          }
        })
      } else {
        this.isEdit = false;
      }
  }

  ngOnInit(): void {
    this.formGroup.controls['id'].valueChanges.pipe(
      debounceTime(300),
      switchMap((text: any)=>{
        return this.productService.verification(text);
      })
    ).subscribe((data: any) => {
      this.idExist = data;
    });

    this.formGroup.controls['date_release'].valueChanges.subscribe((data: any) => {
      console.log("date_release");
      console.log(data);
      const newDate = new Date(data);
      const dateRevision = DateUtil.dateToStringPlusYear(newDate.toISOString());
      this.formGroup.controls['date_revision'].setValue(dateRevision);
      this.formGroup.controls['date_revision'].disable();
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  restart() {
    this.formGroup.reset();
    this.isEdit = false;
    this.formGroup.controls['id'].enable();
  }
  save(){
    const data = this.formGroup.getRawValue();
    console.log(data);
    if(this.isEdit) {
      this.productService.update(data).subscribe((response: any) => {
        this.toastService.setMessage({
          code: 'success',
          message: 'Editado con exito'
        });
        this.router.navigateByUrl('/');
      });
    } else {
      this.productService.save(data).subscribe((response: any) => {
        this.toastService.setMessage({
          code: 'success',
          message: 'Creado con exito'
        });
        this.router.navigateByUrl('/')
      });
    }
  }

  // todo : validar con una fecha existente si viene desde un proceso de edicion
  private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    let date: any = this.formGroup && this.formGroup.controls['date_release'].value;
    if(date) {
      date = date.split('-');
      const auxDate = new Date();
      const currentDate = new Date(auxDate.getFullYear(), auxDate.getMonth(), auxDate.getDate());
      const formDate = new Date(date[0], (+date[1]-1),date[2]);
      return formDate < currentDate ?  { invalidRange: date } : null;
    }
    return null;
  };
}
