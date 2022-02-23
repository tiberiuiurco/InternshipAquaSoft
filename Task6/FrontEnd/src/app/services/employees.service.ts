import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:5000/employees';
const projUrl = 'http://localhost:5000/projects';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get(baseUrl);
  }
  getAllProjects(){
    return this.http.get(projUrl);
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
}
