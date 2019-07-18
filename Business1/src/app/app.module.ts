import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Module as StripeModule } from "stripe-angular"
import { HttpClientModule }  from "@angular/common/http"
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';



import { CarouselModule, WavesModule } from 'angular-bootstrap-md'
import { AgmCoreModule } from '@agm/core'
//import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './home/home.component';
import { CcComponent } from './cc/cc.component';
import { TeamComponent } from './team/team.component';
import { EntrepriseComponent } from './user/entreprise/entreprise.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CcComponent,
    TeamComponent,
    EntrepriseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StripeModule.forRoot(),
    HttpClientModule,
    CarouselModule, WavesModule,
    FormsModule, ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyD6b96x_ZIWu_y06zR3J7R6orVu0k_MxLU'
    })
    //InternationalPhoneNumberModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
