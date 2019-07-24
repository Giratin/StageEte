import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { Entreprise } from 'src/app/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  entreprise : Entreprise = {
    id: 0,
    name: "",
    opening: "",
    closure: "",
    adress : "",
    longitude: 0,
    latitude: 0  
  }
  
  constructor(private auth : AuthenticationService, private router : Router) {
    if(this.auth.getUserDetails().role != "owner"){
      this.router.navigateByUrl('/');
    }else if(this.auth.getUserDetails().entreprise_id == 0){
      this.router.navigateByUrl('/entreprise/create')
    }
   }

  ngOnInit() {
  }

}
