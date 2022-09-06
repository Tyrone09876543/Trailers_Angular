import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { loginResponse } from '../interfaces/api-interface';
import { CookieService } from 'ngx-cookie-service'
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  response : loginResponse;
  formSubmitAttempt=false;
  form= new FormGroup({
    username : new FormControl("", Validators.required),
    password : new FormControl("", Validators.required),
    confirm : new FormControl(),
    email : new FormControl(),
    firstName : new FormControl(),
    lastName : new FormControl(),
  });
  isLogin = true;
  confirmedPassword = true;
  constructor(private api:ApiService, private cookie:CookieService, private router: Router) { }
  ngOnInit():void{
  }
  confirmPassword(){
    if (this.form.value["password"]!=this.form.value["confirm"]){
      this.confirmedPassword = false;
      return;
    }
    this.confirmedPassword = true;
  }
  submit() {
    this.formSubmitAttempt = true;
    if (!this.form.valid ){
      return;
    }
    if (this.isLogin){
      this.login();
    }else{
      this.register();
    }
  }
  login(){
    this.api.login(this.form.value["username"],this.form.value["password"]).subscribe(res=>{
      if (!res["ok"]){
        this.response = res;
        return;
      }
      this.cookie.set('token',res["token"]);
      this.cookie.set('user',res["user"]);
      this.router.navigate(['']);

    });
  }
  register(){
    if (!this.confirmedPassword){
      return;
    }
    
    const data = {
      "username":this.form.value["username"],
      "password":this.form.value["password"],
      "email":this.form.value["email"],
      "first_name":this.form.value["first_name"],
      "last_name":this.form.value["last_name"]
    }
    this.api.register(data).subscribe(res=>{
      if (!res["ok"]){
        this.response = res;
        return;
      }
      this.cookie.set('token',res["token"]);
      this.cookie.set('user',res["user"]);
      this.router.navigate(['']);
    });
  }
  toRegister(){
    this.isLogin = false;
  }
  toLogin(){
    this.isLogin = true;
  }
  get formControls(): any {
    return this.form['controls'];
 }

}
