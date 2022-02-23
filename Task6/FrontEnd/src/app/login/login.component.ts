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
  inputLoginValue = {};
  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
  }

  inputLoginField(type, event): void{
    if(type === 'age'){
      try{
        this.inputLoginValue[type] = parseInt(event.target.value);
      }
      catch{
        return;
      }
    }
    else{
      this.inputLoginValue[type] = event.target.value;
      console.log(this.inputLoginValue);
    }
  }

  login(): void{
    if(typeof this.inputLoginValue['email'] === 'undefined' || typeof this.inputLoginValue['password'] === 'undefined')return;
    else{
      this.serverService.login(this.inputLoginValue)
        .subscribe(
          data => {
            console.log("Login Succesful");
            this.router.navigate(['employees']);
          },
          error => {
            console.log(error);
          }
        )
    }
  }
}
