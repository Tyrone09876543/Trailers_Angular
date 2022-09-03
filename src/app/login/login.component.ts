import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = true;
  constructor() { }

  ngOnInit(): void {
  }
  toRegister(){
    this.login = false;
  }
  toLogin(){
    this.login = true;
  }

}
