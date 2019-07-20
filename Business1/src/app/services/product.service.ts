import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';



export interface ProductDetails {
  id : number
  wording : string
  price : string
  description : string
  quantity : number
  fabDate : Date
  expDate : Date
  category : string
  image : string
  entreprise_id : number
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }
  url = environment.baseUrl;



  public createProduct(prod : ProductDetails)  : Observable<any> {
    return this.http.post(this.url+"/product/create", prod);
  }

}
