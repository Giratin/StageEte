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

  //nebdew min hén li awalan lazem na3tiha essm 'Alias" wel upload yssir à part jemlla wahdaaaa min ay requête 

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

  constructor(private prod: ProductService, private http : HttpClient) { }


  imagetoStore : string = "";

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         //console.log('ImageUpload:uploaded:', item, status, response);

         //une fois yenzel 3al boutton upload image c bn tet3ada lel serveur w lhén 9a3Ad nrécupéri fel essm li zed'ha fel serveur 5ater betbi3a lazem il image nbadlilha essm'ha 9bal il upload sinon tssir mochkla kif yebdew assémi kifkif

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
    //ba3ad essm il image li tzedet n'ajoutih fel objet product w enfin neb3ath il request post lil serveur bch ya3ml ajout fel database lel données kémlinn
    console.log(this.product);

    //console.log(this.imagetoStore["name"]["filename"])
    
    this.prod.createProduct(this.product).subscribe((res)=>{
      console.log(res)
    })
    //this.http.post('http://localhost:5000/product/create', this.product);
  }

}
