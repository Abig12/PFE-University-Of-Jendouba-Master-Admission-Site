import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  helper = new JwtHelperService();
  verfuser: any;
  constructor(private as: AuthUserService, private route: Router) {
    if (localStorage.getItem('token')) {
      let token: any = localStorage.getItem('token');
      let decodetoken = this.helper.decodeToken(token);
      if (decodetoken.role == 'user') {
        this.verfuser = true;
      } else {
        this.verfuser = false;
      }
    } else {
      this.verfuser = false;
    }
  }
}
