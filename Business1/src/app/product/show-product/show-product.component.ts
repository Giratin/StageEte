import { Component, OnInit } from '@angular/core';
import { ProductService, ProductDetails } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {


  product : ProductDetails = {
    id : 0,
    wording : "",
    price : "",
    description : "",
    quantity : 0,
    fabDate: "",
    expDate : "",
    category : "",
    image : "",
    entreprise_id : 0
  } 



  constructor(private prod: ProductService, private http : HttpClient, private router : Router) { 
  }

  ngOnInit() {
      
  }

  



 

}
