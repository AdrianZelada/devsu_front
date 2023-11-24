import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProductService } from '../service/product-service.service';
import { Header } from '../components/table/interface/header';
import { Router } from '@angular/router';
import { DialogHandlerService } from '../components/confirm-dialog/dialog-handler.service';

@Component({
  selector: 'devsu-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.scss']
})
export class TableProductsComponent implements OnInit,  AfterViewInit{
  defaultSize: number = 5;
  products: Array<any> = [];
  filterFields: Array<string> = ['name'];
  itemToDelete: any;

  @ViewChild('logoTemplate', {static: false}) logoTemplate : TemplateRef<ElementRef>;
  @ViewChild('dateReleaseTemplate', {static: false}) dateReleaseTemplate : TemplateRef<ElementRef>;
  @ViewChild('dateRevisionTemplate', {static: false}) dateRevisionTemplate : TemplateRef<ElementRef>;
  @ViewChild('actionTemplate', {static: false}) actionTemplate : TemplateRef<ElementRef>;

  columns: Array<Header> = [];

  constructor(
    public productService: ProductService,
    public router: Router,
    public dialogHandlerService: DialogHandlerService
    ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.columns = [
        {
          title: 'Logo',
          field: 'logo',
          isCustom: true,
          template: this.logoTemplate
        },
        {
          title: 'Nombre del producto',
          field: 'name'
        },
        {
          title: 'Descripcion',
          field: 'description'
        },
        {
          title: 'Fecha de liberacion',
          field: 'date_release',
          isCustom: true,
          template: this.dateReleaseTemplate
        },
        {
          title: 'Fecha de reestructuracion',
          field: 'date_revision',
          isCustom: true,
          template: this.dateRevisionTemplate
        },

        {
          title: 'Action',
          field: 'action',
          isCustom: true,
          template: this.actionTemplate
        },
      ];
    },100)

  }

  add(){
    this.router.navigateByUrl('/product');
  }

  edit( data : any) {
    this.router.navigateByUrl(`/product/${data.id}`);
  }

  delete(){
    if(this.itemToDelete) {
      this.productService.delete(this.itemToDelete.id).subscribe(() =>{
        this.dialogHandlerService.closeDialog();
        this.getAllProducts();
      }, (e)=>{
        console.log(e);
      })
    }
  }
  getAllProducts(){
    this.productService.getAllProducts().subscribe((data: any) =>{
      this.products = [...data];
    });
  }

  showConfirm(data: any) {
    this.itemToDelete = data;
    this.dialogHandlerService.showDialog();
  }

  cancelar() {
    this.dialogHandlerService.closeDialog();
  }

  // getData() {
  //   return [{"id":"21b53893-6f78-4920-8e8f-6ded4ee247a6","name":"Viviyan","description":"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.","logo":"http://dummyimage.com/250x100.png/dddddd/000000","date_release":"5/23/2023","date_revision":"4/9/2023"},
  //   {"id":"4a697ea2-302b-4e16-b942-04a063ab0908","name":"Stanford","description":"Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.","logo":"http://dummyimage.com/247x100.png/dddddd/000000","date_release":"12/12/2022","date_revision":"2/17/2022"},
  //   {"id":"a06d687e-2573-4834-9d4e-3d243caf2a6f","name":"Matthus","description":"Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.","logo":"http://dummyimage.com/155x100.png/dddddd/000000","date_release":"8/23/2022","date_revision":"10/20/2022"},
  //   {"id":"66df2dfe-2c59-4c50-8210-270548d26059","name":"Mickey","description":"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.","logo":"http://dummyimage.com/166x100.png/ff4444/ffffff","date_release":"1/22/2023","date_revision":"4/20/2023"},
  //   {"id":"bc04e80a-ab0d-4043-b0ea-3d1286d61d5b","name":"Bord","description":"Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.","logo":"http://dummyimage.com/115x100.png/5fa2dd/ffffff","date_release":"9/1/2022","date_revision":"2/22/2022"},
  //   {"id":"be07d64d-5ac9-48e5-b9e8-2a292db16ec8","name":"Gabriellia","description":"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.","logo":"http://dummyimage.com/201x100.png/dddddd/000000","date_release":"5/23/2023","date_revision":"10/23/2023"},
  //   {"id":"be07d64d-5ac9-48e5-b9e8-2a292db16ec8","name":"Gabriellia","description":"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.","logo":"http://dummyimage.com/201x100.png/dddddd/000000","date_release":"5/23/2023","date_revision":"10/23/2023"},
  //   ];
  // }
}
