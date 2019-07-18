import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AuthenticationService, TokenPayload } from 'src/app/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  userIncorrect : boolean = true;

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
  };

  constructor(private auth : AuthenticationService, private router: Router) {
    if(this.auth.isLoggedIn()){
      this.router.navigateByUrl('/')
    }

   }

  ngOnInit() {
  }

  login($event){
    this.auth.login(this.credentials).subscribe((res)=>{
      if(this.auth.isLoggedIn()){
        this.router.navigateByUrl('/')
        this.userIncorrect = true;
        console.log("correct")
      }else{
        this.userIncorrect = false;
        console.log("incorrect")
      }

      
    })
    /*console.log(this.credentials)
      event.preventDefault()*/
  }

}
