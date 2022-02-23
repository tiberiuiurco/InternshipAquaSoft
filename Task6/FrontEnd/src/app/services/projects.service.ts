import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const baseUrl = 'http://localhost:5000/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }
  getAll(){
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', localStorage.getItem('access_token'));
    return this.http.get(baseUrl, {headers});
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  delete(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', localStorage.getItem('access_token'));
    return this.http.delete(`${baseUrl}/${id}`, {headers});
  }
  update(id, data): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', localStorage.getItem('access_token'));
    return this.http.patch(`${baseUrl}/${id}`, data, {headers});
  }
  add(data): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('x-access-token', localStorage.getItem('access_token'));
    return this.http.post(baseUrl, data, {headers});
  }
  test(): void{
  }
}
