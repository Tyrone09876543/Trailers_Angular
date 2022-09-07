import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { loginResponse, getUserResponse, changePasswordResponse } from './interfaces/api-interface';

@Injectable()
export class ApiService {
  url="http://127.0.0.1:8000/api/";
  constructor(private http:HttpClient) { }
  login(username, password){
    return this.http.post<loginResponse>(this.url+'login/login/',{
      'username':username,
      'password':password
    });
  }
  register(data){
    return this.http.post<loginResponse>(this.url+'login/register/',{
      "username":data["username"],
      "password":data["password"],
      "email":data["email"]||"",
      "first_name":data["first_name"],
      "last_name":data["last_name"]
    });
  }
  getUser(token){
    const headers= new HttpHeaders().set("Authorization", "Token "+token)
    return this.http.get<getUserResponse>(this.url+'login/update-user/',{ 'headers': headers });
  }
  updateUser(data, token){
    const headers= new HttpHeaders().set("Authorization", "Token "+token)
    return this.http.put<loginResponse>(this.url+'login/update-user/',{
      "username":data["username"],
      "email":data["email"]||"",
      "first_name":data["first_name"]||"",
      "last_name":data["last_name"]||""
    }, { 'headers': headers });
  }
  changePassword(oldP, newP, token){
    const headers= new HttpHeaders().set("Authorization", "Token "+token).set('Content-Type', 'application/json');
    return this.http.put<changePasswordResponse>(this.url+'login/change-password/',{
      "oldP":oldP||"",
      "newP":newP||""
    }, { 'headers': headers });
  }
}
