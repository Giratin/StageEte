import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {



  users : [];
  count : number = 0;
  page =1;
  model = 1;
  pager: any = {};

  selection = ["1", "2", "3", "4" ,"5" , "10"]
  constructor(private auth : AuthenticationService, private router : Router, private userService : UserService, private pagerService: PaginationService) {
 
    this.userService.getCount(this.auth.getUserDetails().entreprise_id).subscribe((res)=>{
      this.count = Math.round(parseInt(res[0]["count"]));
    })

    this.userService.showList({'page' : this.page, 'number' : this.model}).subscribe((res)=>{
      console.log(res)
      this.users = res;
      this.setPage(1);
    });

   }

   setPage(page: number) {
    this.pager = this.pagerService.getPager(this.count, page, this.model);

    this.userService.showList({'page' : page, 'number' : this.model}).subscribe((res)=>{
      this.users = res;
    });
  }

  ngOnInit() {
  }


 
  listen(){
    this.userService.getCount(this.auth.getUserDetails().entreprise_id).subscribe((res)=>{
      this.count = Math.round(parseInt(res[0]["count"]));
    })
    this.userService.showList({'page' : this.page, 'number' : this.model}).subscribe((res)=>{
      this.users = res;
      this.setPage(1);
    });
  }

}
