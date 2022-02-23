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
  ok = -1;
  inputRegisterValue = {};
  constructor(private serverService: ServerService, private router: Router) { }

  ngOnInit(): void {
  }
  inputRegisterField(type, event): void{
    if(type === 'age'){
      try{
        this.inputRegisterValue[type] = parseInt(event.target.value);
        console.log(this.inputRegisterValue);
      }
      catch{
        return;
      }
    }
    else{
      this.inputRegisterValue[type] = event.target.value;
      console.log(this.inputRegisterValue);
    }
}

  isError(){
    return (this.ok === 0);
  }

  isWrong(){
    return (this.ok === 2);
  }

  register(): void{
    if(typeof this.inputRegisterValue['email'] === 'undefined' || typeof this.inputRegisterValue['password'] === 'undefined'
    || typeof this.inputRegisterValue['age'] === 'undefined' || typeof this.inputRegisterValue['name'] === 'undefined'){this.ok = 2;return;}
    if(this.inputRegisterValue['name'].length === 0 || this.inputRegisterValue['email'].length === 0 || this.inputRegisterValue['password'].length === 0 || this.inputRegisterValue['age'] === 0 ){this.ok = 2;return;}
    else{

      this.serverService.register(this.inputRegisterValue)
        .subscribe(
          data => {
            console.log("Register Succesful");
            this.ok = 1;
            this.router.navigate(['login']);
          },
          error => {
            this.ok = 0;
            console.log(error);
          }
        )
    }
  }
}
