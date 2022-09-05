import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { UserGuardGuard } from './user-guard.guard';
const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'account', component:AccountComponent, canActivate : [UserGuardGuard]},
  {path:'login', component:LoginComponent },
  {path: '**',redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
