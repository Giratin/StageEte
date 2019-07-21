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

  constructor(private prod: ProductService, private http : HttpClient) { }


  imagetoStore : string = "";

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         //console.log('ImageUpload:uploaded:', item, status, response);


         var image = JSON.parse(response);

         this.imagetoStore = image["name"]['filename']
        // console.log()
        
        // console.log("upload success")
      // console.log(this.imagetoStore)

        // console.log("upload success")
         //alert('File uploaded successfully');
    };    
  }

  create(){


    this.product.image = this.imagetoStore;
    console.log(this.product);

    //console.log(this.imagetoStore["name"]["filename"])
    
    this.prod.createProduct(this.product).subscribe((res)=>{
      console.log(res)
    })
    //this.http.post('http://localhost:5000/product/create', this.product);
  }

}
