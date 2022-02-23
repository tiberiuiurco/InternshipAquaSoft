import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  ok = -1;
  inputLoginValue = {};
  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
  }

  inputLoginField(type, event): void{
    this.inputLoginValue[type] = event.target.value;
    console.log(this.inputLoginValue);
  }

  isError(){
    return (this.ok === 0);
  }

  isWrong(){
    return (this.ok === 2);
  }

  login(): void{
    if(typeof this.inputLoginValue['email'] === 'undefined' || typeof this.inputLoginValue['password'] === 'undefined'){this.ok = 2;return;}
    if(this.inputLoginValue['email'].length === 0 || this.inputLoginValue['password'].length === 0){this.ok = 2;return;}
    else{
      this.serverService.login(this.inputLoginValue)
        .subscribe(
          data => {
            console.log("Login Succesful");
            this.ok = 1;
            this.router.navigate(['/employees']);
          },
          error => {
            this.ok = 0;
            console.log(error);
          }
        )
    }
  }
}
