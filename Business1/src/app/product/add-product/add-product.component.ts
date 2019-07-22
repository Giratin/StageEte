import { Component, OnInit } from '@angular/core';
import { ProductService, ProductDetails } from 'src/app/services/product.service';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http'
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';

const URL = 'http://localhost:5000/product/upload';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  
  product : ProductDetails = {
    id : 0,
    wording : "",
    price : "",
    description : "",
    quantity : 0,
    fabDate : "",
    expDate : " ",
    category : "",
    image : "",
    entreprise_id : 0
  }   
  
  public imagePath;
  imgURL: any;
  public message: string;
  imagetoStore : string = "";

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

  constructor(private auth:AuthenticationService ,private prod : ProductService,private http:HttpClient, private router:Router) {
    this.imgURL = 'assets/images/nopreview-available.jpg'
    if(this.auth.isLoggedIn()){
      if(this.auth.getUserDetails().role === 'livreur') {
        this.router.navigateByUrl('/')
      }
    }
    else{
      this.router.navigateByUrl('/user/login')  
    }
   }

  ngOnInit() {

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
 
         var image = JSON.parse(response);

         this.product.entreprise_id=this.auth.getUserDetails().entreprise_id;

         this.imagetoStore = image["name"]['filename'];
         this.product.image =this.imagetoStore;
         this.prod.createProduct(this.product).subscribe((res)=>{
           this.router.navigateByUrl('/product/list')
          console.log(res)
        })
        
         console.log(this.imagetoStore);
    };    
  }

  updatePreview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }


  
}
