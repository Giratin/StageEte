import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';



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

  constructor(private http : HttpClient) { }


  

}
