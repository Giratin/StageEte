import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Entreprise } from './user.service';



export interface UserDetails {
  id: number
  email: string
  name: string
  lname: string
  adress : string
  phone: string
  role: string
  password: string
  entreprise_id : number
  exp: number
  iat: number
}

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  id: number
  email: string
  name: string
  lname: string
  adress : string
  phone: string
  role: string
  password: string
  entreprise_id : number
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

   url = environment.baseUrl;

  constructor(private http : HttpClient, private router : Router) { }

  private token: string

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      //return user.exp > Date.now() / 1000
      return true
    } else {
      return false
    }
  }

  public register(user: TokenPayload): Observable<any> {
    return this.http.post(this.url+`/user/register`, user)
  }


  public update(user : TokenPayload) : Observable<any> {
    return this.http.post(this.url+`/user/update`, user, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(this.url+`/user/login`, user)
    console.log("data")
    console.log(base)
    const request = base.pipe(
      map((data: TokenResponse) => {
        console.log()
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  public profile(): Observable<any> {
    return this.http.get(this.url+`/user/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }
  

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }

  public createEntreprise(entreprise : Entreprise) : Observable<any>{
    return this.http.post(this.url + '/entre/create', entreprise, {
      headers: { Authorization: ` ${this.getToken()}` }
    });
  }

  public receiveRegistrationToken( id : object) : Observable<any>{
    return this.http.post(this.url + '/user/createIdentifier', id,  {
      headers: { Authorization: ` ${this.getToken()}` }
    })
}  

}
