import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {



  users : [];
  count : number = 0;
  page =1;
  previous : any[] = []
  next : any[] = []


  nextDisabled : boolean = false;
  previousDisabled : boolean = false;

  constructor(private auth : AuthenticationService, private router : Router, private userService : UserService) {
  /*  if(this.auth.getUserDetails().role != "owner"){
      console.log("this user have already an entreprise registered  ")
      this.router.navigateByUrl('/');
    }else{
      this.userService.showList({'entreprise_id' : this.auth.getUserDetails().entreprise_id}).subscribe((res)=>{
        console.log(res)
        this.users = res;
      });



     
    }*/
    this.userService.getCount(this.auth.getUserDetails().entreprise_id).subscribe((res)=>{
      //console.log("res")
     // console.log(res[0]["count"])
      this.count = Math.round(parseInt(res[0]["count"]) / 3);

      this.previousDisabled = true;
     /* if(this.page === this.count)
        this.nextDisabled = true;
        else
        this.nextDisabled = false;
*/
      var i;
      for(i= 1 ; i <= this.count ; i++){
        if(i < this.page)
          this.previous.push(i);
        else if(i > this.page)
          this.next.push(i)
      }
    })

    this.userService.showList({'page' : this.page}).subscribe((res)=>{
      console.log(res)
      this.users = res;
    });

   }

  ngOnInit() {
  }

  nextp(index){
    this.page = index;
    console.log(index);
    this.previousDisabled = false;
    this.userService.showList({'page' : this.page}).subscribe((res)=>{
      console.log(res)
      this.users = res;
    });

    this.next = [];
    this.previous = [];
    var i;
      for(i= 1 ; i <= this.count ; i++){
        if(i < this.page)
          this.previous.push(i);
        else if(i > this.page)
          this.next.push(i)
      }

  }
  previousp(index){
    this.page = index;
    this.userService.showList({'page' : this.page}).subscribe((res)=>{
      console.log(res)
      this.users = res;
    });

    this.next = [];
    this.previous = [];
    var i;
      for(i= 1 ; i <= this.count ; i++){
        if(i < this.page)
          this.previous.push(i);
        else if(i > this.page)
          this.next.push(i)
      }

    console.log(index)
  }

}
