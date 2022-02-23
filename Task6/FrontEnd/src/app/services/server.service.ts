import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const signupUrl = 'http://localhost:5000/api/auth/signup';
const signinUrl = 'http://localhost:5000/api/auth/signin';


@Injectable({
  providedIn: 'root'
})
export class ServerService {
  headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');


  constructor(private http: HttpClient) { }
  login(data){
    return this.http.post<{token: string}>(signinUrl, data)
    .pipe(
      map(result => {
        localStorage.setItem('access_token', result.token);
        return true;
      })
    );
    
  }
  register(data){
    return this.http.post<{token: string}>(signupUrl, data)
    .pipe(
      map(result => {
        return true;
      })
    );
    
  }
  logout(){
    localStorage.removeItem('access_token');
  }
  public get loggedIn(): boolean{
    return (localStorage.getItem('access_token') !== null);
  }
}
