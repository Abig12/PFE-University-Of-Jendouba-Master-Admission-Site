import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class CandidncyService {
  helper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  userid() {
    let token: any = localStorage.getItem('token');
    let decodetoken = this.helper.decodeToken(token);
    return decodetoken.user_id;
  }

  getidcand() {
    let user_id = this.userid();
    return this.http.get('http://localhost:3000/cond/getcand/' + user_id);
  }

  addcand(file_id: any, cm_id: any) {
    const data = {
      file_id: file_id,
      cm_id: cm_id,
    };

    return this.http.post('http://localhost:3000/cond/addcand', data);
  }

  addfile(data: FormData) {
    let user_id = this.userid();
    return this.http.post(
      'http://localhost:3000/cond/addfile/' + user_id,
      data
    );
  }

  getuserinfo() {
    let user_id = this.userid();
    return this.http.get('http://localhost:3000/cond/userinfo/' + user_id);
  }

  getfile() {
    let user_id = this.userid();
    return this.http.get('http://localhost:3000/cond/getfile/' + user_id);
  }

  updatefile(file_id: any, data: FormData) {
    return this.http.patch(
      'http://localhost:3000/cond/updatefile/' + file_id,
      data
    );
  }

  getusermas(file_id: any) {
    return this.http.get('http://localhost:3000/cond/usermas/' + file_id);
  }

  delusermas(usermas_id: any) {
    return this.http.delete(
      'http://localhost:3000/cond/delusermas/' + usermas_id
    );
  }
}
