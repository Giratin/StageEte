import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http : HttpClient) { }

  public getLocation() : Observable<any>{
    return this.http.get("https://ipapi.co/json/");
  }
}
