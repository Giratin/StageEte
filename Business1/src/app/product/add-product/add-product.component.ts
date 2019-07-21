import { Component, OnInit } from '@angular/core';
import { ProductService, ProductDetails } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private prod : ProductService) { }

  ngOnInit() {
  }

  product : ProductDetails = {
    id : 0,
    wording : "",
    price : "",
    description : "",
    quantity : 0,
    fabDate : new Date(),
    expDate : new Date(),
    category : "",
    image : "",
    entreprise_id : 0
  } 


  
}
