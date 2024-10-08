import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StaticService {
  constructor(private http: HttpClient) {}
  getagentnb(etablissement: any) {
    return this.http.get(
      'http://localhost:3000/static/nbagentetab/' + etablissement
    );
  }
  getmasnb(etablissement: any) {
    return this.http.get(
      'http://localhost:3000/static/getmas/' + etablissement
    );
  }
  getcandnb(etablissement: any) {
    return this.http.get('http://localhost:3000/static/cand/' + etablissement);
  }
  getadmisnb(etablissement: any) {
    return this.http.get('http://localhost:3000/static/admis/' + etablissement);
  }

  getchat(etablissement: any) {
    return this.http.get(
      'http://localhost:3000/static/chartees/' + etablissement
    );
  }
  getmasidnom(etablissement: any) {
    return this.http.get(
      'http://localhost:3000/static/masidnom/' + etablissement
    );
  }

  //-------------------agentus------------------------------------------------------------------------------------------
  agentsnb() {
    return this.http.get('http://localhost:3000/static/nb_ag_et_aguj');
  }
  etabnb() {
    return this.http.get('http://localhost:3000/static/nbetab');
  }
  candnb() {
    return this.http.get('http://localhost:3000/static/nbcand');
  }
  masnb() {
    return this.http.get('http://localhost:3000/static/nbmas');
  }

  chartuj() {
    return this.http.get('http://localhost:3000/static/chartuj');
  }
  etabidnom() {
    return this.http.get('http://localhost:3000/static/idetabnom');
  }
}
