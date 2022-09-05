import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { loginResponse } from '../interfaces/api-interface';
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
  constructor(private api:ApiService) { }
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
    this.api.login(this.form.value["username"] as string,this.form.value["password"] as string).subscribe(res=>{
      if (!res["ok"]){
        console.log(res)
        this.response = res;
        return;
      }
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
