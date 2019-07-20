import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http : HttpClient) {
  }

  public getJsonFile() : Observable<any> {
     return this.http.get('./assets/countries.json');
  }  

  public getAfricanCountries() : any{

    countries : new Observable<any>();
    
    this.getJsonFile().subscribe((res)=>{
      var obj = JSON.parse(JSON.stringify(res));
      var values = Object.values(obj);

      
     // console.log(values);


     // console.log(res[])
    })

    var obj = JSON.parse(JSON.stringify(this.getJsonFile()))
    var values = Object.values(obj)

    console.log(values)
    return values;
    //return coun;
  }
}
