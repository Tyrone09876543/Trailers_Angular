import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { loginResponse,changePasswordResponse } from '../interfaces/api-interface';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['../login/login.component.css']
})
export class AccountComponent implements OnInit {
  registerResponse : loginResponse;
  passwordResponse : changePasswordResponse;
  form= new FormGroup({
    username : new FormControl("", Validators.required),
    oldP : new FormControl(),
    newP : new FormControl(),
    confirm : new FormControl(),
    email : new FormControl(),
    firstName : new FormControl(),
    lastName : new FormControl(),
  });
  constructor(private api:ApiService, private cookie:CookieService, private router: Router) { }
  updateUser(){
    if (!this.form.valid ){
      return;
    }
    const data = {
      "username":this.form.value["username"],
      "email":this.form.value["email"],
      "first_name":this.form.value["firstName"],
      "last_name":this.form.value["lastName"]
    }
    this.api.updateUser(data, this.cookie.get("token")).subscribe(res=>{
      if (!res["ok"]){
        this.registerResponse = res;
        return;
      }
      this.registerResponse=null;
    });

  }
  confirmedPassword = true;
  confirmPassword(){
    if (this.form.value["newP"]!=this.form.value["confirm"]){
      this.confirmedPassword = false;
      return;
    }
    this.confirmedPassword = true;
  }
  changePassword(){
    let ok = true;
    let oldP2 = []
    let newP2 = []
    if (!this.confirmedPassword){
      ok = false;
    }
    
    if (this.form.value["oldP"]?.trim() == "" || this.form.value["oldP"]==null){
      ok = false;
      oldP2.push("This field is required");
    }
    if (this.form.value["newP"]?.trim() == "" || this.form.value["newP"]==null){
      ok = false;
      newP2.push("This field is required");
    }
    if (!ok){
      this.passwordResponse = {
        ok: false,
        oldP: oldP2,
        newP: newP2,
      };
      return
    }
    this.api.changePassword(this.form.value["oldP"],this.form.value["newP"], this.cookie.get("token")).subscribe(res=>{
      
      if (!res["ok"]){
        this.passwordResponse = res;
        return;
      }
      this.form.controls["oldP"].setValue("");
      this.form.controls["newP"].setValue("");
      this.form.controls["confirm"].setValue("");
      this.passwordResponse=null;
    });
  }
  logOut(){
    this.cookie.delete("token");
    this.router.navigate([""]);
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
