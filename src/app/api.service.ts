import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { loginResponse } from './interfaces/api-interface';

@Injectable()
export class ApiService {
  url="http://127.0.0.1:8000/api/";
  constructor(private http:HttpClient) { }
  login(username:string, password:string){
    
    let queryParams = new HttpParams();
    queryParams = queryParams.append("username",username);
    return this.http.post<loginResponse>(this.url+'login/login/',{
      'username':username,
      'password':password
    });
  }
}
