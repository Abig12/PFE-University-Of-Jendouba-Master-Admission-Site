import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AgenteesService {
  helper = new JwtHelperService();
  constructor(private http: HttpClient) {}

  addmc(
    etablissement: string,
    data: {
      nom_m: string;
      date_o: any;
      date_f: any;
      details: string;
    }
  ) {
    return this.http.post(
      'http://localhost:3000/agentees/addmastercours/' + etablissement,
      data
    );
  }
  userid() {
    let token: any = localStorage.getItem('token');
    let decodetoken = this.helper.decodeToken(token);
    return decodetoken.user_id;
  }

  getetab() {
    let user_id = this.userid();
    return this.http.get(
      'http://localhost:3000/agentees/getagentetab/' + user_id
    );
  }

  getmas(etablissement: any) {
    return this.http.get(
      'http://localhost:3000/agentees/getmas/' + etablissement
    );
  }

  updmas(
    cm_id: any,
    data: {
      nom_m: string;
      date_o: any;
      date_f: any;
      details: string;
    }
  ) {
    return this.http.patch(
      'http://localhost:3000/agentees/updatemas/' + cm_id,
      data
    );
  }

  delmas(cm_id: any) {
    return this.http.delete(
      'http://localhost:3000/agentees/deletemas/' + cm_id
    );
  }

  /*-----------------------------------------eval-grid---------------------------------------------------*/

  addeval(
    etablissement: string,
    data: {
      malus_redoublement: any;
      malus_controle: any;
      bonus_1: any;
      bonus_2: any;
      bonus_3: any;
    }
  ) {
    return this.http.post(
      'http://localhost:3000/eval/addeval/' + etablissement,
      data
    );
  }

  geteval(etablissement: any) {
    return this.http.get('http://localhost:3000/eval/geteval/' + etablissement);
  }

  updeval(
    eval_id: any,
    data: {
      malus_redoublement: any;
      malus_controle: any;
      bonus_1: any;
      bonus_2: any;
      bonus_3: any;
    }
  ) {
    return this.http.patch(
      'http://localhost:3000/eval/updateval/' + eval_id,
      data
    );
  }

  deleval(eval_id: any) {
    return this.http.delete('http://localhost:3000/eval/deleteeval/' + eval_id);
  }
}
