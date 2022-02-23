import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const baseUrl = 'http://localhost:5000/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get(baseUrl);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  update(id, data): Observable<any> {
    return this.http.patch(`${baseUrl}/${id}`, data);
  }
  add(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  test(): void{
    console.log("TEAPA");
  }
}
