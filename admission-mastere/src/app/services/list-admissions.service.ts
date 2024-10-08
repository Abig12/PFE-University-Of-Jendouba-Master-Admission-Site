import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListAdmissionsService {
  constructor(private http: HttpClient) {}

  getmascand(etablissement: any) {
    return this.http.get('http://localhost:3000/admis/admis/' + etablissement);
  }
}
