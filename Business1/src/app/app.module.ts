import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Module as StripeModule } from "stripe-angular"
import { HttpClientModule }  from "@angular/common/http"
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';



import { CarouselModule, WavesModule } from 'angular-bootstrap-md'
import { AgmCoreModule } from '@agm/core'
import {NgxPaginationModule} from 'ngx-pagination';
//import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './home/home.component';
import { EntrepriseComponent } from './user/entreprise/entreprise.component';
import { AddComponent } from './staff/add/add.component';
import { ListComponent } from './staff/list/list.component';
import { DetailsComponent } from './staff/details/details.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ShowProductComponent } from './product/show-product/show-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EntrepriseComponent,
    AddComponent,
    ListComponent,
    DetailsComponent,
    ProfileComponent,
    AddProductComponent,
    ShowProductComponent,
    ListProductComponent
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
    }),
    NgxPaginationModule
    //InternationalPhoneNumberModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
