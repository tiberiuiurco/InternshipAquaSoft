import { Component, OnInit } from '@angular/core';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  inputRegisterValue = {};
  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
  }
  inputRegisterField(type, event): void{
    this.inputRegisterValue[type] = event.target.value;
    console.log(this.inputRegisterValue);
}

  register(): void{
    if(typeof this.inputRegisterValue['email'] === 'undefined' || typeof this.inputRegisterValue['password'] === 'undefined'
    || typeof this.inputRegisterValue['age'] === 'undefined' || typeof this.inputRegisterValue['name'] === 'undefined'){console.log("OPA");;return;}
    else{

      this.serverService.register(this.inputRegisterValue)
        .subscribe(
          data => {
            console.log("Register Succesful");
            this.router.navigate(['login']);
          },
          error => {
            console.log(error);
          }
        )
    }
  }
}
