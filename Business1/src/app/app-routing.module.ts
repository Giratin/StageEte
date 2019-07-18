import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { EntrepriseComponent } from './user/entreprise/entreprise.component';
import { AddComponent } from './staff/add/add.component';
import { ListComponent } from './staff/list/list.component';
import { DetailsComponent } from './staff/details/details.component';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  { path : '' , component : HomeComponent },
  { path : 'user', 
    children : [
      { path : 'login', component : LoginComponent },
      { path : 'register', component: RegisterComponent },
      { path : 'profile', component: ProfileComponent },
    ] 
  },
  { path : 'entreprise' ,
    children : [
      { path : 'create' , component : EntrepriseComponent }
    ]
  },
  { 
    path : 'staff' , 
    children : [
      { path : 'add', component: AddComponent },
      { path : 'list', component: ListComponent },
      { path : 'details', component: DetailsComponent },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
