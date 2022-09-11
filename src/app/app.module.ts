import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TrailersComponent } from './trailers/trailers.component';
import { DetailsComponent } from './trailers/details/details.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { SafePipe } from './safe-pipe';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TrailersComponent,
    DetailsComponent,
    AccountComponent,
    LoginComponent,
    SafePipe,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ApiService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
