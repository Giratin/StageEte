import { Component, OnInit } from '@angular/core';
import { TokenPayload, AuthenticationService , UserDetails} from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {


  matricule : string = ""

  duplicatedEmail : boolean = false;
  duplicatedPhone : boolean = false;

  constructor(private auth: AuthenticationService, private router: Router, private userService : UserService) {

    if(this.auth.getUserDetails().role != "owner"){
      console.log(this.auth.getUserDetails())
      //console.log("this user have already an entreprise registered  ")
      this.router.navigateByUrl('/');
    }
    else{
      this.auth.profile().subscribe((res) =>{
        // console.log(res['entreprise_id'])
        this.auth.receiveRegistrationToken({ id : res['entreprise_id']}).subscribe((res) =>{
          console.log(res)
   
          this.matricule = res;
       });
       })
    }
    
  }

  ngOnInit() {
  }

  
  credentials: UserDetails = {
    id : 0,
    name : "",
    lname : "",
    entreprise_id : 0,
    email : "",
    phone : "",
    role : "",
    adress : "",
    password : "",
    country : "Tunisia",
    state : "",
    exp: 0,
    iat: 0
  }

  resetData(){
    this.duplicatedPhone = false;
    this.duplicatedEmail = false;

    this.credentials = {
      id : 0,
      name : "",
      lname : "",
      entreprise_id : 0,
      email : "",
      phone : "",
      country : "Tunisia",
    state : "",
      role : "",
      adress : "",
      password : "",
      country : "Tunisia",
      state : "",
      exp: 0,
      iat: 0
    }
    this.auth.profile().subscribe((res) =>{
      // console.log(res['entreprise_id'])
      this.auth.receiveRegistrationToken({ id : res['entreprise_id']}).subscribe((res) =>{
        console.log(res)
 
        this.matricule = res;
     });
     })
  }

  create(){

    this.credentials.entreprise_id = this.auth.getUserDetails().entreprise_id;
    this.credentials.role = 'livreur'
    this.credentials.password = this.matricule;

    console.log(this.credentials);

    this.userService.addLivreur(this.credentials).subscribe((res)=>{
      console.log(res)
      if(res['status'] === 'success'){
        this.duplicatedPhone = false;
        this.duplicatedEmail = false;
        this.resetData();
        // AddComponent.ref
      }else if(res['status'] === 'phone'){
        this.duplicatedPhone = true;
        this.duplicatedEmail = false;
       }else if(res['status'] === 'email'){
        this.duplicatedEmail = true;
        this.duplicatedPhone = false;
      }
    })
  }

}
