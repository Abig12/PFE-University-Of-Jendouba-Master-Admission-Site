import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  helper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  postsign(data: any) {
    return this.http.post('http://localhost:3000/signup', data);
  }

  postlogin(data: any) {
    return this.http.post('http://localhost:3000/login', data);
  }

  SaveToken(token: any) {
    localStorage.setItem('token', token);
  }

  getrole() {
    let token: any = localStorage.getItem('token');
    let decodetoken = this.helper.decodeToken(token);
    return decodetoken.role;
  }

  loggedin() {
    let token: any = localStorage.getItem('token');
    let decodetoken = this.helper.decodeToken(token);
    let role = decodetoken.role;
    if (role !== 'user' && role !== 'agentuj' && role !== 'agentees') {
      return false;
    }
    if (this.helper.isTokenExpired(token)) {
      return false;
    }
    return true;
  }
  userid() {
    let token: any = localStorage.getItem('token');
    let decodetoken = this.helper.decodeToken(token);
    return decodetoken.user_id;
  }
  getusername() {
    let user_id = this.userid();
    return this.http.get('http://localhost:3000/getusername/' + user_id);
  }
}
