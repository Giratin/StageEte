import { Component, OnInit } from '@angular/core';
import { ProductService, ProductDetails } from 'src/app/services/product.service';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http'

const URL = 'http://localhost:5000/product/upload';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

 

  public imagePath;
  imgURL: any;
  public message: string;

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

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

  constructor(private prod: ProductService, private http : HttpClient) { 
    this.imgURL = 'assets/images/nopreview-available.jpg'
  }


  imagetoStore : string = "";
  preview : string = "";

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         //console.log('ImageUpload:uploaded:', item, status, response);


         var image = JSON.parse(response);

         this.imagetoStore = image["name"]['filename'];
         this.product.image =this.imagetoStore;
         this.prod.createProduct(this.product).subscribe((res)=>{
          console.log(res)
        })
        
         console.log(this.imagetoStore);
    };    
  }

  create(){

    console.log("calling create methode")

    console.log(this.imagetoStore)
    //if(this.imagetoStore){
     // this.product.image = this.imagetoStore;
      console.log(this.product);
      
   // }

    

    //console.log(this.imagetoStore["name"]["filename"])
    
   
    //this.http.post('http://localhost:5000/product/create', this.product);
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
