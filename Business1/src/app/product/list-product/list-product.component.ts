import { Component, OnInit } from '@angular/core';
import { ProductService, ProductDetails } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {


  showList : boolean = false;
  list : ProductDetails[] ;
  selectedCity : string = 'all'
  selectedCat : string = 'all'

  produit : any =  {
    entreprise_id : "",
    looking : "",
    category :"all",
    city : "all"
  }
  constructor(private prod : ProductService, private http : HttpClient) { }


  search : string = "";
  ngOnInit() {
    
    this.produit.looking="";
    this.prod.getAll().subscribe((res)=>{
      // console.log(res)
 
       this.list = res;
       console.log(this.list)
 
     })
  }

  show(){
    this.showList = !this.showList;
    console.log(this.showList)
  }


  searchProd($event){
    this.search = (<HTMLInputElement>event.target).value;
    this.produit.search = this.search;
    console.log(this.produit)
    if(this.search == '')
    {

      this.prod.getAll().subscribe((res)=>{
        // console.log(res)
         this.list = res;
         console.log(this.list)
   
       })
    }else{
      
    this.prod.searchProduct(this.produit).subscribe((res)=>{
      // console.log(res)
 
       this.list = res;
       console.log(this.list)
 
     })
    }


  }

  hide(){
    this.showList = false;
  }
  cityChange($event){
    this.selectedCity=(<HTMLOptionElement>event.target).value
    this.produit.city = this.selectedCity;

  }
  catChange($event){
    this.selectedCat=(<HTMLOptionElement>event.target).value
    this.produit.category = this.selectedCat;
    console.log(this.selectedCat)

  }
  cities = [
    {
      "code": "12",
      "name": "Ariana",
    },
    {
      "code": "13",
      "name": "Ben Arous",
    },
    {
      "code": "23",
      "name": "Bizerte",
    },
    {
      "code": "31",
      "name": "Béja",
    },
    {
      "code": "81",
      "name": "Gabès",
    },
    {
      "code": "71",
      "name": "Gafsa",
    },
    {
      "code": "32",
      "name": "Jendouba",
    },
    {
      "code": "41",
      "name": "Kairouan",
    },
    {
      "code": "42",
      "name": "Kasserine",
    },
    {
      "code": "73",
      "name": "Kebili",
    },
    {
      "code": "33",
      "name": "Kef",
    },
    {
      "code": "53",
      "name": "Mahdia",
    },
    {
      "code": "14",
      "name": "Manouba",
    },
    {
      "code": "82",
      "name": "Medenine",
    },
    {
      "code": "52",
      "name": "Monastir",
    },
    {
      "code": "21",
      "name": "Nabeul",
    },
    {
      "code": "61",
      "name": "Sfax",
    },
    {
      "code": "43",
      "name": "Sidi Bouzid",
    },
    {
      "code": "34",
      "name": "Siliana",
    },
    {
      "code": "51",
      "name": "Sousse",
    },
    {
      "code": "83",
      "name": "Tataouine",
    },
    {
      "code": "72",
      "name": "Tozeur",
    },
    {
      "code": "11",
      "name": "Tunis",
    },
    {
      "code": "22",
      "name": "Zaghouan",
    }
  ]

  categories=["drink",
  "Fruits and vegetables",
  "Cereals",
  "Dairy products",
  "Meat fish egg",
  "Fatty products",
  "Pasta",
  "Pastry product",
  "Other"]
}
