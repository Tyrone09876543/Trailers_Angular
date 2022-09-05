import { Component, OnInit } from '@angular/core';
import { UserGuardGuard } from '../user-guard.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  guard:UserGuardGuard
  constructor(private userGuard:UserGuardGuard) { 
    this.guard = userGuard
  }
  
  ngOnInit(): void {
    console.log(this.guard.logged())
  }

}
