import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private httpService: HttpClient ) { }

  getAllProducts() {
    // return this.httpService.get('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products');
    return this.httpService.get('/bp/products');
  }

  save(data: any) {    
    return this.httpService.post('/bp/products', {
    // return this.httpService.post('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products', {
      "id": data.id,
      "name": data.name,
      "description": data.description,
      "date_revision": data.date_revision,
      "date_release": data.date_release,
      "logo": data.logo
    });
  }

  update(data: any) {
    return this.httpService.put('/bp/products', data);
  }

  delete(id: string) {
    return this.httpService.delete('/bp/products?id='+id, {
      responseType:'text'
    });
  }

  verification(id: String)  {
    return this.httpService.get('/bp/products/verification?id='+id);
  }

  getById(id: String) {
    return this.getAllProducts().pipe(
      map((response: any) => {
        console.log(response)
        return response.filter((product:any) => {
          return product.id == id
        })[0];
      })
    )
  }
}
