import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private auth : AuthenticationService, private router : Router) {
    if(this.auth.getUserDetails().role != "owner"){
      console.log("this user have already an entreprise registered  ")
      this.router.navigateByUrl('/');
    }
   }

  ngOnInit() {
  }

}
