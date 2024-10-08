import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MasCandService {
  constructor(private http: HttpClient) {}

  getmascand(cm_id: any) {
    return this.http.get('http://localhost:3000/userfile/getusername/' + cm_id);
  }

  getcandfile(user_id: any) {
    return this.http.get(
      'http://localhost:3000/userfile/getuserdata/' + user_id
    );
  }

  updatef1(file_id: any, data: any) {
    return this.http.patch(
      'http://localhost:3000/userfile/updatef1/' + file_id,
      data
    );
  }

  updatef2(file_id: any, data: any) {
    return this.http.patch(
      'http://localhost:3000/userfile/updatef2/' + file_id,
      data
    );
  }

  updatef3(file_id: any, data: any) {
    return this.http.patch(
      'http://localhost:3000/userfile/updatef3/' + file_id,
      data
    );
  }

  state(usermas_id: any, data: any) {
    return this.http.patch(
      'http://localhost:3000/userfile/updatestatus/' + usermas_id,
      data
    );
  }
}
