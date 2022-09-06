import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { loginResponse } from '../interfaces/api-interface';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['../login/login.component.css']
})
export class AccountComponent implements OnInit {
  registerResponse : loginResponse;
  form= new FormGroup({
    username : new FormControl("", Validators.required),
    password : new FormControl(),
    confirm : new FormControl(),
    email : new FormControl(),
    firstName : new FormControl(),
    lastName : new FormControl(),
  });
  constructor(private api:ApiService, private cookie:CookieService) { }
  updateUser(){
    
  }
  ngOnInit(): void {
    this.form.controls["username"].setValue("a");
    this.api.getUser(this.cookie.get("token")).subscribe(res=>{
      if (!res["ok"]){
        return;
      }
    this.form.controls["username"].setValue(res["username"]);
    this.form.controls["email"].setValue(res["email"]);
    this.form.controls["firstName"].setValue(res["first_name"]);
    this.form.controls["lastName"].setValue(res["last_name"]);

    });
  }
  get formControls(): any {
    return this.form['controls'];
  }

}
