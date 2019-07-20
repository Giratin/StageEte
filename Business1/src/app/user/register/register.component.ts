import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AuthenticationService, TokenPayload } from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  secondePassword = "";
  passwordMatches : boolean = true;

  emailDuplicated : boolean = false;
  phoneDuplicated : boolean = false;

  credentials: TokenPayload = {
    id : 0,
    name : "",
    lname : "",
    entreprise_id : 0,
    email : "",
    phone : "",
    role : "",
    adress : "",
    country : "Tunisia",
    state : "",
    password : ""
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

  constructor(private auth : AuthenticationService, private router: Router, private count : CountryService) {
    this.initData();
    if(this.auth.isLoggedIn()){
      this.router.navigateByUrl('/')
    }
   }

  ngOnInit() {

    var t = this.count.getAfricanCountries();
    console.log("writing from comonent")
    console.log(t)
    //console.log()*/
   
  }

  initData(){
    this.emailDuplicated  = false;
    this.phoneDuplicated = false;
  }

  

  register($event){

    this.credentials.role = "owner"

    this.auth.register(this.credentials).subscribe((res)=>{
      console.log(res)

      if(res["id"]){
        console.log("exits")
        if(res["email"] === this.credentials.email){
          this.emailDuplicated = true;
        }else{
          this.emailDuplicated = false;
        }
        if(res["phone"] === this.credentials.phone){
          this.phoneDuplicated = true;
        }else{
          this.phoneDuplicated = false;
        }
      }else{
        console.log("add success")
        if(this.auth.isLoggedIn()){
          this.router.navigateByUrl('/entreprise')
        }
      }

    })

    console.log(this.credentials)
  }

  verify(){

    if(this.secondePassword === this.credentials.password){
      this.passwordMatches = true
    }else{
      this.passwordMatches = false
    }
  }

}
