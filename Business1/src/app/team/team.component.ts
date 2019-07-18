import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor(private auth : AuthenticationService, private router : Router) {
    if(!this.auth.isLoggedIn()){
      this.router.navigateByUrl('/login')
    }
   }

  ngOnInit() {
  }

}
