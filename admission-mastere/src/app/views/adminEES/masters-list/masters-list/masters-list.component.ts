import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgenteesService } from 'src/app/services/agentees.service';

@Component({
  selector: 'app-masters-list',
  templateUrl: './masters-list.component.html',
  styleUrls: ['./masters-list.component.css'],
})
export class MastersListComponent {
  dataArray: any = [];
  masArray: any = [];
  datadet = {
    details: '',
  };
  datamas = {
    cm_id: '',
    nom_m: '',
    date_o: '',
    date_f: '',
    details: '',
  };
  deleteMasterData = {
    cm_id: '',
    i: '',
  };
  messageSucc = '';
  constructor(private ees: AgenteesService, private route: Router) {
    this.ees.getetab().subscribe((data) => {
      this.masArray = data;
      if (this.masArray.length > 0) {
        this.ees.getmas(this.masArray[0].etablissement).subscribe((data) => {
          console.log(data);
          this.dataArray = data;
        });
      }
    });
  }

  detmas(details: string) {
    this.datadet.details = details;
  }

  uptmas(cm_id: any, nom_m: string, date_o: any, date_f: any, details: string) {
    this.messageSucc = '';
    this.datamas.cm_id = cm_id;
    this.datamas.nom_m = nom_m;
    this.datamas.date_o = date_o;
    this.datamas.date_f = date_f;
    this.datamas.details = details;
  }

  updatemas(a: any) {
    let data = a.value;
    this.ees.updmas(this.datamas.cm_id, data).subscribe(
      (response) => {
        let indexId = this.dataArray.findIndex(
          (obj: any) => obj.cm_id == this.datamas.cm_id
        );
        this.dataArray[indexId].nom_m = this.datamas.nom_m;
        this.dataArray[indexId].date_o = this.datamas.date_o;
        this.dataArray[indexId].date_f = this.datamas.date_f;
        this.dataArray[indexId].details = this.datamas.details;
        this.messageSucc = 'coure de master modifié avec succès';
        setTimeout(() => {
          location.reload();
        }, 600);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  delbutton(cm_id: any, i: any) {
    this.deleteMasterData.cm_id = cm_id;
    this.deleteMasterData.i = i;
  }

  deletemas(cm_id: any, i: any) {
    this.ees.delmas(cm_id).subscribe(
      (response) => {
        console.log(response);
        this.dataArray.splice(i, 1);
        location.reload();
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
}
