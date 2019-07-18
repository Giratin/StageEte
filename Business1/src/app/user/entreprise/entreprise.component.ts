import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { Entreprise, UserService } from 'src/app/user.service';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from 'src/app/services/map.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {


  
  verifyInputs : boolean = false;



  entreprise : Entreprise = {
    id: 0,
    name: "",
    opening: "",
    closure: "",
    adress : "",
    longitude: 0,
    latitude: 0  
  }


  constructor(private auth : AuthenticationService,  private entrepriseService : UserService, private maService : MapService, private router : Router) { 
    if(this.auth.getUserDetails().entreprise_id != null || this.auth.getUserDetails().role != "owner"){
      console.log("this user have already an entreprise registered  ")
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {

    this.maService.getLocation().subscribe((res)=>{
      console.log(res)
    })

    //document.querySelector('.dismissButton').;

  }


  longitude = 10.189690589904785;
  latitude = 36.898395660579794;

  markers = { latitude: 36.898395660579794, longitude: 10.189690589904785 };

  placeMarker(position: any) {
    const lat = position.coords.lat;
    const lng = position.coords.lng;


    console.log('lat ' + lat)
    console.log('long ' + lng)

    this.markers = { latitude: lat, longitude: lng };
  }

 
  create(){

    this.entreprise.longitude = this.markers.longitude;
    this.entreprise.latitude = this.markers.latitude;


    console.log(this.entreprise);

    this.auth.createEntreprise(this.entreprise).subscribe((res)=>{

      console.log(" Res user: " + res["userId"])
      console.log(" Res entreprise : " + res["entreprise"])
    })


  }

}
