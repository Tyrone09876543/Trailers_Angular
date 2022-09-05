import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { loginResponse } from '../interfaces/api-interface';
import { CookieService } from 'ngx-cookie-service'

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
  constructor(private api:ApiService, private cookie:CookieService) { }
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
    if (!this.form.valid || this.confirmedPassword){
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
        console.log(res)
        this.response = res;
        return;
      }
      this.cookie.set('token',res["token"]);
      this.cookie.set('user',res["user"]);
    });
  }
  register(){
    
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
