import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AuthenticationService, TokenPayload } from 'src/app/authentication.service';
import { Router } from '@angular/router';

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
    password : ""
  }


  constructor(private auth : AuthenticationService, private router: Router) {
    this.initData();
    if(this.auth.isLoggedIn()){
      this.router.navigateByUrl('/')
    }
   }

  ngOnInit() {
   
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
