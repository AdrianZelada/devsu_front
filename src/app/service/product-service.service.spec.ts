import { TestBed } from '@angular/core/testing';

import { ProductService } from './product-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment.prod';
import { InterceptorHttpService } from './interceptor-http.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
describe('ProductServiceService', () => {
  let service: ProductService;
  let httpController: HttpTestingController;
  let host: string = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, HttpClientModule],
      providers:[ProductService,
        {
          provide: HTTP_INTERCEPTORS, useClass: InterceptorHttpService, multi:true
        }
      ]
    });
    service = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });

  describe('test getAllproducts', () =>{
    it('Should return a product list', (doneFn)=>{
      const mock= [{"id":"21b53893-6f78-4920-8e8f-6ded4ee247a6","name":"Viviyan","description":"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.","logo":"http://dummyimage.com/250x100.png/dddddd/000000","date_release":"5/23/2023","date_revision":"4/9/2023"}]
      service.getAllProducts().subscribe((data:any) => {
        expect(data.length).toEqual(mock.length);
        expect(data).toEqual(mock);
        doneFn();
      });

      const req = httpController.expectOne(`${host}/bp/products`)
      req.flush(mock);
      httpController.verify();
    })
  })

  describe('save product', ()=>{
    it('create ok', (doneFn)=>{
      const mock= {"id":"21","name":"Viviyan","description":"21222","logo":"http://dummyimage.com/250x100.png/dddddd/000000","date_release":"5/23/2023","date_revision":"4/9/2023"};
      service.save({...mock})
      .subscribe((data) => {
        expect(data).toEqual(mock);
        doneFn();
      })
      const req = httpController.expectOne(`${host}/bp/products`)
      req.flush(mock);
      expect(req.request.body).toEqual(mock);
      httpController.verify();
    })
  })

  describe('interceptor', ()=>{
    it('add authorId', (doneFn)=>{
      const mock= {"id":"21","name":"Viviyan","description":"21222","logo":"http://dummyimage.com/250x100.png/dddddd/000000","date_release":"5/23/2023","date_revision":"4/9/2023"};
      service.save({...mock})
      .subscribe((data) => {
        expect(data).toEqual(mock);
        doneFn();
      })
      const req = httpController.expectOne(`${host}/bp/products`)
      const header = req.request.headers;
      expect(header.get('authorId')).toEqual("123");
      req.flush(mock);
      httpController.verify();
    })
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
