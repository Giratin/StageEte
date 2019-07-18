import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth :AuthenticationService) {
    console.log("here i am")

   }

  ngOnInit() {
  }

}
