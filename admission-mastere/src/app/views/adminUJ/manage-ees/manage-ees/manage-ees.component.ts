import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EtabService } from 'src/app/services/etab.service';

@Component({
  selector: 'app-manage-ees',
  templateUrl: './manage-ees.component.html',
  styleUrls: ['./manage-ees.component.css'],
})
export class ManageEESComponent {
  dataArray: any = [];
  dataetab = {
    etab_id: '',
    nom_etab: '',
    gouvernorat: '',
  };
  delebtn = {
    etab_id: '',
    i: '',
  };
  messsageSucc = '';
  messageaddSucc = '';
  messageerr = '';
  constructor(private es: EtabService, private route: Router) {
    this.es.getetab().subscribe((data) => (this.dataArray = data));
  }

  addeatab(e: any) {
    let data = e.value;
    this.es.addetab(data).subscribe(
      (data) => {
        this.messageaddSucc = 'établissement ajoutée avec succès';
        setTimeout(() => {
          location.reload();
        }, 600);
      },
      (error) => {
        if (error.status === 402) {
          this.messageerr = "L'établissement existe déjà ";
        } // Handle the error here
      }
    );
  }

  getdata(etab_id: any, nom_etab: string, gouvernorat: string) {
    this.messsageSucc = '';
    this.dataetab.etab_id = etab_id;
    this.dataetab.nom_etab = nom_etab;
    this.dataetab.gouvernorat = gouvernorat;
  }
  updateetab(u: any) {
    let data = u.value;
    this.es.updetab(this.dataetab.etab_id, data).subscribe(
      (response) => {
        let indexId = this.dataArray.findIndex(
          (obj: any) => obj.etab_id == this.dataetab.etab_id
        );
        this.dataArray[indexId].nom_etab = this.dataetab.nom_etab;
        this.dataArray[indexId].gouvernorat = this.dataetab.gouvernorat;
        this.messsageSucc = 'établissement modifié avec succès';
        setTimeout(() => {
          location.reload();
        }, 600);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
  deletebtn(etab_id: any, i: any) {
    this.delebtn.etab_id = etab_id;
    this.delebtn.i = i;
  }

  deletedata(etab_id: any, i: any) {
    this.es.deletab(etab_id).subscribe(
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
