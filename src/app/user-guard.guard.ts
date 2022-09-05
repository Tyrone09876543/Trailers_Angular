import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'
import {Router} from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
  constructor(private cookie:CookieService,private router: Router) { }
  logged(){
    const token = this.cookie.check("token");
      if(!token){
        return false;
      }
      return true;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.cookie.check("token");
      if(!token){
        this.router.navigate(['login']);
      }
      return true;
  }
  
}
