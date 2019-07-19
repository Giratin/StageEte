import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationService, UserDetails } from './authentication.service';



export interface Entreprise {
  id: number
  name: string
  opening: string
  closure: string
  adress : string
  longitude: number
  latitude: number
}

@Injectable({
  providedIn: 'root'
})
export class UserService {


  url = environment.baseUrl;

  constructor(private http : HttpClient, private auth : AuthenticationService) { }


  public addLivreur(user : UserDetails) : Observable<any>{
    return this.http.post(this.url + '/user/addstaff', user, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    });
  }

  public showList1(id : object) : Observable<any>{
    return this.http.post(this.url + '/user/list' , id);
  }

  public showList(id : object) : Observable<any>{
    return this.http.post(this.url + '/user/all' , id);
  }

  public getCount(id : number) : Observable<any>{
    return this.http.post(this.url + '/user/count/'+id , null );
  }

  

}
