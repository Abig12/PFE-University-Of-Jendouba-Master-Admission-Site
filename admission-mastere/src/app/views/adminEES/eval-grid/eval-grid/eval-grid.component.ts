import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgenteesService } from 'src/app/services/agentees.service';

@Component({
  selector: 'app-eval-grid',
  templateUrl: './eval-grid.component.html',
  styleUrls: ['./eval-grid.component.css'],
})
export class EvalGridComponent {
  etabdata: any = [];
  dataArray: any = [];
  dataeval = {
    eval_id: '',
    malus_redoublement: '',
    malus_controle: '',
    bonus_1: '',
    bonus_2: '',
    bonus_3: '',
  };
  deleteb = {
    eval_id: '',
    i: '',
  };
  messageaddSucc = '';
  messageSucc = '';
  constructor(private ees: AgenteesService, private route: Router) {
    this.ees.getetab().subscribe((data) => {
      console.log(data);
      this.etabdata = data;
      if (this.etabdata.length > 0) {
        this.ees.geteval(this.etabdata[0].etablissement).subscribe((data) => {
          console.log(data);
          this.dataArray = data;
        });
      }
    });
  }
  upteval(
    eval_id: any,
    malus_redoublement: any,
    malus_controle: any,
    bonus_1: any,
    bonus_2: any,
    bonus_3: any
  ) {
    this.messageSucc = '';
    this.dataeval.eval_id = eval_id;
    this.dataeval.malus_redoublement = malus_redoublement;
    this.dataeval.malus_controle = malus_controle;
    this.dataeval.bonus_1 = bonus_1;
    this.dataeval.bonus_2 = bonus_2;
    this.dataeval.bonus_3 = bonus_3;
  }

  addeval(a: any) {
    let data = a.value;
    this.ees.addeval(this.etabdata[0].etablissement, data).subscribe((data) => {
      this.messageaddSucc = "grille d'évaluation ajoutée avec succès";
      setTimeout(() => {
        location.reload();
      }, 600);
    });
  }
  updateeval(u: any) {
    let data = u.value;
    this.ees.updeval(this.dataeval.eval_id, data).subscribe(
      (response) => {
        let indexId = this.dataArray.findIndex(
          (obj: any) => obj.eval_id == this.dataeval.eval_id
        );
        this.dataArray[indexId].malus_redoublement =
          this.dataeval.malus_redoublement;
        this.dataArray[indexId].malus_controle = this.dataeval.malus_controle;
        this.dataArray[indexId].bonus_1 = this.dataeval.bonus_1;
        this.dataArray[indexId].bonus_2 = this.dataeval.bonus_2;
        this.dataArray[indexId].bonus_3 = this.dataeval.bonus_3;
        this.messageSucc = "grille d'évaluation modifié avec succès";
        setTimeout(() => {
          location.reload();
        }, 600);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
  delbutton(eval_id: any, i: any) {
    this.deleteb.eval_id = eval_id;
    this.deleteb.i = i;
  }
  deleteeval(eval_id: any, i: any) {
    this.ees.deleval(eval_id).subscribe(
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
