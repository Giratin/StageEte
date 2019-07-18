import { Component, OnInit } from '@angular/core';
import { TokenPayload, AuthenticationService , UserDetails} from 'src/app/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {


  matricule : string = ""

  constructor(private auth: AuthenticationService, private router: Router) {
    this.auth.profile().subscribe((res) =>{
     // console.log(res['entreprise_id'])
     this.auth.receiveRegistrationToken({ id : res['entreprise_id']}).subscribe((res) =>{
       console.log(res)

       this.matricule = res;
    });
    })
  }

  ngOnInit() {
  }

  
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

}
