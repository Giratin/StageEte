import { Component } from '@angular/core';
import { StripeScriptTag, StripeToken  } from "stripe-angular"
import { StripeSource } from 'stripe-angular/StripeTypes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private publishableKey:string = "...YOUR-STRIPE-KEY-HERE..."

  title = 'Business';
  constructor(public StripeScriptTag:StripeScriptTag){
    this.StripeScriptTag.setPublishableKey( this.publishableKey )
  }


  extraData = {
    "name": null,
    "address_city": null,
    "address_line1": null,
    "address_line2": null,
    "address_state": null,
    "address_zip": null
  }
 
  onStripeInvalid( error:Error ){
    console.log('Validation Error', error)
  }
 
  setStripeToken( token:StripeToken ){
    console.log('Stripe token', token)
  }
 
  setStripeSource( source:StripeSource ){
    console.log('Stripe source', source)
  }
 
  onStripeError( error:Error ){
    console.error('Stripe error :: ', error)
  }

}
