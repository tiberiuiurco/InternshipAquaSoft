import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ServerService } from './services/server.service';
import { EmployeesService } from './services/employees.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private serverService: ServerService, private employeesService: EmployeesService){}
  ok = -1;

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem('access_token')){
      this.employeesService.getAll()
      .subscribe(
        data => {
          console.log("TRUE");
          this.ok = 1;
          return true;
        },
        error => {
          console.log("FALSE");
          this.ok = 0;
          this.router.navigate(['login']);
          localStorage.clear();
          return false;
        });
    }    
    else{
    console.log("FALSE");
    this.router.navigate(['login']);
    localStorage.clear();
    return false;
    }

    return true;
  }
  
}
