import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { TeamComponent } from './team/team.component';
import { EntrepriseComponent } from './user/entreprise/entreprise.component';
import { AddComponent } from './staff/add/add.component';

const routes: Routes = [
  { path : '' , component : HomeComponent },
  { path : 'login', component : LoginComponent },
  { path : 'register', component: RegisterComponent },
  { path : 'team', component: TeamComponent },
  { path : 'entreprise', component: EntrepriseComponent },
  { path : 'addStaff', component: AddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
