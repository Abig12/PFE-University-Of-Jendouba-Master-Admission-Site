import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from 'src/app/services/agent.service';
import { EtabService } from 'src/app/services/etab.service';

@Component({
  selector: 'app-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.css'],
})
export class AgentsListComponent {
  dataArray: any = [];
  etabArray: any = [];
  messageSucc = '';
  dataagents = {
    user_id: '',
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: '',
    passport_cin: '',
    sexe: '',
    etablissement: '',
  };
  delagent = {
    user_id: '',
    i: '',
  };

  constructor(
    private as: AgentService,
    private es: EtabService,
    private route: Router
  ) {
    this.as.getagents().subscribe((data) => (this.dataArray = data));
    this.es.getetab().subscribe((data) => (this.etabArray = data));
  }

  getagentdata(
    user_id: any,
    nom: string,
    prenom: string,
    email: string,
    telephone: any,
    passport_cin: string,
    sexe: string,
    etablissement: string
  ) {
    this.messageSucc = '';
    this.dataagents.user_id = user_id;
    this.dataagents.nom = nom;
    this.dataagents.prenom = prenom;
    this.dataagents.email = email;
    this.dataagents.telephone = telephone;
    this.dataagents.passport_cin = passport_cin;
    this.dataagents.sexe = sexe;
    this.dataagents.etablissement = etablissement;
  }

  updateagent(a: any) {
    let data = a.value;
    this.as.uptagent(this.dataagents.user_id, data).subscribe(
      (response) => {
        let indexId = this.dataArray.findIndex(
          (obj: any) => obj.user_id == this.dataagents.user_id
        );
        this.dataArray[indexId].nom = this.dataagents.nom;
        this.dataArray[indexId].prenom = this.dataagents.prenom;
        this.dataArray[indexId].email = this.dataagents.email;
        this.dataArray[indexId].telephone = this.dataagents.telephone;
        this.dataArray[indexId].passport_cin = this.dataagents.passport_cin;
        this.dataArray[indexId].sexe = this.dataagents.sexe;
        this.dataArray[indexId].etablissement = this.dataagents.etablissement;
        this.messageSucc = 'agent modifié avec succès';
        setTimeout(() => {
          location.reload();
        }, 600);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
  delbutton(user_id: any, i: any) {
    this.delagent.user_id = user_id;
    this.delagent.i = i;
  }
  deleteagent(user_id: any, i: any) {
    this.as.delagent(user_id).subscribe(
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
