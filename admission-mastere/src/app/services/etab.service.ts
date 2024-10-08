import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EtabService {
  constructor(private http: HttpClient) {}

  getetab() {
    return this.http.get('http://localhost:3000/etablis/getetab');
  }

  addetab(data: { nom_etab: string; gouvernorat: string }) {
    return this.http.post('http://localhost:3000/etablis/addetab', data);
  }
  updetab(etab_id: any, data: { nom_etab: string; gouvernorat: string }) {
    return this.http.patch(
      'http://localhost:3000/etablis/updateetab/' + etab_id,
      data
    );
  }
  deletab(etab_id: any) {
    return this.http.delete(
      'http://localhost:3000/etablis/deleteetab/' + etab_id
    );
  }
}
