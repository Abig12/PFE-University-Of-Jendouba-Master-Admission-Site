import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TabMasService {
  constructor(private http: HttpClient) {}

  tabmas() {
    return this.http.get('http://localhost:3000/fronttab/getallmas');
  }

  nomemas(cm_id: any) {
    return this.http.get('http://localhost:3000/fronttab/getmas/' + cm_id);
  }
}
