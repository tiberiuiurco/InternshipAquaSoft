import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from './services/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FrontEnd';
  constructor(public serverService: ServerService, private router: Router){}

  logout(){
    this.serverService.logout();
    this.router.navigate(['login']);
  }

  getName(){
    return localStorage.getItem('name');
  }
}
