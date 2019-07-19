import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



export interface ProductDetails {
  id : number
  wondring : string
  price : string
  description : string
  quantity : number
  fabDate : Date
  expDate : Date
  category : string
  entreprise_id : number
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }
  url = environment.baseUrl;

}
