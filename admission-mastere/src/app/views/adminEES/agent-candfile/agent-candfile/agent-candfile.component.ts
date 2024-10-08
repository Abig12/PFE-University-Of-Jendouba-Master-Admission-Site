import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgenteesService } from 'src/app/services/agentees.service';
import { MasCandService } from 'src/app/services/mas-cand.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agent-candfile',
  templateUrl: './agent-candfile.component.html',
  styleUrls: ['./agent-candfile.component.css'],
})
export class AgentCandfileComponent {
  dataArray: any = [];
  etabdata: any = [];
  evalArray: any = [];
  iduser: any = [];
  redoublement1: string = '';
  redoublement2: string = '';
  redoublement3: string = '';
  file1: any;
  file2: any;
  file3: any;
  messageSucc1 = '';
  messageSucc2 = '';
  messageSucc3 = '';
  nr1: any;
  nr2: any;
  nr3: any;
  nco1: any;
  nco2: any;
  nco3: any;
  ncr1: any;
  ncr2: any;
  ncr3: any;
  mc: any;
  constructor(
    private ar: ActivatedRoute,
    private ms: MasCandService,
    private ees: AgenteesService,
    private route: Router,
    private location: Location
  ) {
    this.ar.params.subscribe((data) => {
      this.iduser = data;
      this.ms.getcandfile(this.iduser.user_id).subscribe((data) => {
        this.dataArray = data;
        this.ees.getetab().subscribe((data) => {
          console.log(data);
          this.etabdata = data;
          if (this.etabdata.length > 0) {
            this.ees
              .geteval(this.etabdata[0].etablissement)
              .subscribe((data) => {
                console.log(data);
                this.evalArray = data;
                this.redoblement();
              });
          }
        });
      });
    });
  }

  onFileSelected(event: any, fileVariableName: string) {
    const file = event.target.files[0];
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && allowedTypes.includes(file.type)) {
      switch (fileVariableName) {
        case 'file1':
          this.file1 = file;
          break;
        case 'file2':
          this.file2 = file;
          break;
        case 'file3':
          this.file3 = file;
          break;
        default:
          break;
      }
    } else {
      alert('Invalid file type. Only PNG, JPG, and JPEG files are allowed.');
      event.target.value = null;
    }
  }

  accbutton() {
    const data = { statut: 'Accepté' };
    this.ms.state(this.dataArray.usermas_id, data).subscribe((data) => {
      this.location.back();
    });
  }

  refbutton() {
    const data = { statut: 'Refusé' };
    this.ms.state(this.dataArray.usermas_id, data).subscribe((data) => {
      this.location.back();
    });
  }

  update1ere(a: any) {
    let data1 = a.value;
    this.ms.updatef1(this.dataArray.file_id, data1).subscribe((data) => {
      this.messageSucc1 = 'Modifié avec succès';
      setTimeout(() => {
        location.reload();
      }, 600);
    });
  }
  update2eme(b: any) {
    let data2 = b.value;
    this.ms.updatef2(this.dataArray.file_id, data2).subscribe((data) => {
      this.messageSucc2 = 'Modifié avec succès';
      setTimeout(() => {
        location.reload();
      }, 600);
    });
  }
  update3eme(c: any) {
    let data3 = c.value;

    this.ms.updatef3(this.dataArray.file_id, data3).subscribe((data) => {
      this.messageSucc3 = 'Modifié avec succès';
      setTimeout(() => {
        location.reload();
      }, 600);
    });
  }

  redoblement() {
    if (this.dataArray.redo_1ere == 'un ans') {
      this.nr1 = -this.evalArray[0].malus_redoublement;
      if (this.dataArray.redo_2eme == 'un ans') {
        this.nr2 = -this.evalArray[0].malus_redoublement;
        if (this.dataArray.redo_3eme == 'un ans') {
          this.nr3 = -this.evalArray[0].malus_redoublement;
          this.session();
        }
        if (this.dataArray.redo_3eme == 'deux ans') {
          this.nr3 = -(this.evalArray[0].malus_redoublement * 2);
          this.session();
        } else {
          this.nr3 = 0;
          this.session();
        }
      }
      if (this.dataArray.redo_2eme == 'deux ans') {
        this.nr2 = -(this.evalArray[0].malus_redoublement * 2);
        if (this.dataArray.redo_3eme == 'un ans') {
          this.nr3 = -this.evalArray[0].malus_redoublement;
          this.session();
        }
        if (this.dataArray.redo_3eme == 'deux ans') {
          this.nr3 = -(this.evalArray[0].malus_redoublement * 2);
          this.session();
        } else {
          this.nr3 = 0;
          this.session();
        }
      } else {
        this.nr2 = -(this.evalArray[0].malus_redoublement * 2);
        if (this.dataArray.redo_3eme == 'un ans') {
          this.nr3 = -this.evalArray[0].malus_redoublement;
          this.session();
        }
        if (this.dataArray.redo_3eme == 'deux ans') {
          this.nr3 = -(this.evalArray[0].malus_redoublement * 2);
          this.session();
        } else {
          this.nr3 = 0;
          this.session();
        }
      }
    }
    if (this.dataArray.redo_1ere == 'deux ans') {
      this.nr1 = -(this.evalArray[0].malus_redoublement * 2);
      if (this.dataArray.redo_2eme == 'un ans') {
        this.nr2 = -this.evalArray[0].malus_redoublement;
        if (this.dataArray.redo_3eme == 'un ans') {
          this.nr3 = -this.evalArray[0].malus_redoublement;
          this.session();
        }
        if (this.dataArray.redo_3eme == 'deux ans') {
          this.nr3 = -(this.evalArray[0].malus_redoublement * 2);
          this.session();
        } else {
          this.nr3 = 0;
          this.session();
        }
      }
      if (this.dataArray.redo_2eme == 'deux ans') {
        this.nr2 = -(this.evalArray[0].malus_redoublement * 2);
        if (this.dataArray.redo_3eme == 'un ans') {
          this.nr3 = -this.evalArray[0].malus_redoublement;
          this.session();
        }
        if (this.dataArray.redo_3eme == 'deux ans') {
          this.nr3 = -(this.evalArray[0].malus_redoublement * 2);
          this.session();
        } else {
          this.nr3 = 0;
          this.session();
        }
      } else {
        this.nr2 = -(this.evalArray[0].malus_redoublement * 2);
        if (this.dataArray.redo_3eme == 'un ans') {
          this.nr3 = -this.evalArray[0].malus_redoublement;
          this.session();
        }
        if (this.dataArray.redo_3eme == 'deux ans') {
          this.nr3 = -(this.evalArray[0].malus_redoublement * 2);
          this.session();
        } else {
          this.nr3 = 0;
          this.session();
        }
      }
    } else {
      this.nr1 = 0;
      if (this.dataArray.redo_2eme == 'un ans') {
        this.nr2 = -this.evalArray[0].malus_redoublement;
        if (this.dataArray.redo_3eme == 'un ans') {
          this.nr3 = -this.evalArray[0].malus_redoublement;
          this.session();
        }
        if (this.dataArray.redo_3eme == 'deux ans') {
          this.nr3 = -(this.evalArray[0].malus_redoublement * 2);
          this.session();
        } else {
          this.nr3 = 0;
          this.session();
        }
      }
      if (this.dataArray.redo_2eme == 'deux ans') {
        this.nr2 = -(this.evalArray[0].malus_redoublement * 2);
        if (this.dataArray.redo_3eme == 'un ans') {
          this.nr3 = -this.evalArray[0].malus_redoublement;
          this.session();
        }
        if (this.dataArray.redo_3eme == 'deux ans') {
          this.nr3 = -(this.evalArray[0].malus_redoublement * 2);
          this.session();
        } else {
          this.nr3 = 0;
          this.session();
        }
      } else {
        this.nr2 = -(this.evalArray[0].malus_redoublement * 2);
        if (this.dataArray.redo_3eme == 'un ans') {
          this.nr3 = -this.evalArray[0].malus_redoublement;
          this.session();
        }
        if (this.dataArray.redo_3eme == 'deux ans') {
          this.nr3 = -(this.evalArray[0].malus_redoublement * 2);
          this.session();
        } else {
          this.nr3 = 0;
          this.session();
        }
      }
    }
  }

  session() {
    if (this.dataArray.session_1ere == 'controle') {
      this.nco1 = -this.evalArray[0].malus_controle;
      if (this.dataArray.session_2eme == 'controle') {
        this.nco2 = -this.evalArray[0].malus_controle;
        if (this.dataArray.session_3eme == 'controle') {
          this.nco3 = -this.evalArray[0].malus_controle;
          this.credit_cond();
        } else {
          this.nco3 = 0;
          this.credit_cond();
        }
      } else {
        this.nco2 = 0;
        if (this.dataArray.session_3eme == 'controle') {
          this.nco3 = -this.evalArray[0].malus_controle;
          this.credit_cond();
        } else {
          this.nco3 = 0;
          this.credit_cond();
        }
      }
    } else {
      this.nco1 = 0;
      if (this.dataArray.session_2eme == 'controle') {
        this.nco2 = -this.evalArray[0].malus_controle;
        if (this.dataArray.session_3eme == 'controle') {
          this.nco3 = -this.evalArray[0].malus_controle;
          this.credit_cond();
        } else {
          this.nco3 = 0;
          this.credit_cond();
        }
      } else {
        this.nco2 = 0;
        if (this.dataArray.session_3eme == 'controle') {
          this.nco3 = -this.evalArray[0].malus_controle;
          this.credit_cond();
        } else {
          this.nco3 = 0;
          this.credit_cond();
        }
      }
    }
  }

  credit_cond() {
    if (this.dataArray.credit_1ere <= 150) {
      this.ncr1 = this.evalArray[0].bonus_1;
      if (this.dataArray.credit_2eme <= 150) {
        this.ncr2 = this.evalArray[0].bonus_1;
        if (this.dataArray.credit_3eme <= 150) {
          this.ncr3 = this.evalArray[0].bonus_1;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        }
        if (
          this.dataArray.credit_3eme <= 165 &&
          151 <= this.dataArray.credit_3eme
        ) {
          this.ncr3 = this.evalArray[0].bonus_2;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        } else {
          this.ncr3 = this.evalArray[0].bonus_3;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        }
      }
      if (
        this.dataArray.credit_2eme <= 165 &&
        151 <= this.dataArray.credit_2eme
      ) {
        this.ncr2 = this.evalArray[0].bonus_2;
        if (this.dataArray.credit_3eme <= 150) {
          this.ncr3 = this.evalArray[0].bonus_1;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        }
        if (
          this.dataArray.credit_3eme <= 165 &&
          151 <= this.dataArray.credit_3eme
        ) {
          this.ncr3 = this.evalArray[0].bonus_2;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        } else {
          this.ncr3 = this.evalArray[0].bonus_3;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        }
      } else {
        this.ncr2 = this.evalArray[0].bonus_3;
        if (this.dataArray.credit_3eme <= 150) {
          this.ncr3 = this.evalArray[0].bonus_1;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        }
        if (
          this.dataArray.credit_3eme <= 165 &&
          151 <= this.dataArray.credit_3eme
        ) {
          this.ncr3 = this.evalArray[0].bonus_2;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        } else {
          this.ncr3 = this.evalArray[0].bonus_3;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        }
      }
    }
    if (
      this.dataArray.credit_1ere <= 165 &&
      151 <= this.dataArray.credit_1ere
    ) {
      this.ncr1 = this.evalArray[0].bonus_2;
      if (this.dataArray.credit_2eme <= 150) {
        this.ncr2 = this.evalArray[0].bonus_1;
        if (this.dataArray.credit_3eme <= 150) {
          this.ncr3 = this.evalArray[0].bonus_1;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        }
        if (
          this.dataArray.credit_3eme <= 165 &&
          151 <= this.dataArray.credit_3eme
        ) {
          this.ncr3 = this.evalArray[0].bonus_2;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        } else {
          this.ncr3 = this.evalArray[0].bonus_3;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        }
      }
      if (
        this.dataArray.credit_2eme <= 165 &&
        151 <= this.dataArray.credit_2eme
      ) {
        this.ncr2 = this.evalArray[0].bonus_2;
        if (this.dataArray.credit_3eme <= 150) {
          this.ncr3 = this.evalArray[0].bonus_1;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        }
        if (
          this.dataArray.credit_3eme <= 165 &&
          151 <= this.dataArray.credit_3eme
        ) {
          this.ncr3 = this.evalArray[0].bonus_2;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        } else {
          this.ncr3 = this.evalArray[0].bonus_3;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        }
      } else {
        this.ncr2 = this.evalArray[0].bonus_3;
        if (this.dataArray.credit_3eme <= 150) {
          this.ncr3 = this.evalArray[0].bonus_1;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        }
        if (
          this.dataArray.credit_3eme <= 165 &&
          151 <= this.dataArray.credit_3eme
        ) {
          this.ncr3 = this.evalArray[0].bonus_2;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        } else {
          this.ncr3 = this.evalArray[0].bonus_3;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        }
      }
    } else {
      this.ncr1 = this.evalArray[0].bonus_3;
      if (this.dataArray.credit_2eme <= 150) {
        this.ncr2 = this.evalArray[0].bonus_1;
        if (this.dataArray.credit_3eme <= 150) {
          this.ncr3 = this.evalArray[0].bonus_1;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        }
        if (
          this.dataArray.credit_3eme <= 165 &&
          151 <= this.dataArray.credit_3eme
        ) {
          this.ncr3 = this.evalArray[0].bonus_2;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        } else {
          this.ncr3 = this.evalArray[0].bonus_3;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        }
      }
      if (
        this.dataArray.credit_2eme <= 165 &&
        151 <= this.dataArray.credit_2eme
      ) {
        this.ncr2 = this.evalArray[0].bonus_2;
        if (this.dataArray.credit_3eme <= 150) {
          this.ncr3 = this.evalArray[0].bonus_1;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        }
        if (
          this.dataArray.credit_3eme <= 165 &&
          151 <= this.dataArray.credit_3eme
        ) {
          this.ncr3 = this.evalArray[0].bonus_2;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        } else {
          this.ncr3 = this.evalArray[0].bonus_3;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        }
      } else {
        this.ncr2 = this.evalArray[0].bonus_3;
        if (this.dataArray.credit_3eme <= 150) {
          this.ncr3 = this.evalArray[0].bonus_1;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        }
        if (
          this.dataArray.credit_3eme <= 165 &&
          151 <= this.dataArray.credit_3eme
        ) {
          this.ncr3 = this.evalArray[0].bonus_2;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        } else {
          this.ncr3 = this.evalArray[0].bonus_3;
          this.mc =
            (this.dataArray.moy_1ere +
              this.dataArray.moy_2eme * 2 +
              this.dataArray.moy_3eme * 2 -
              (this.nr1 +
                this.nr2 +
                this.nr3 +
                this.nco1 +
                this.nco2 +
                this.nco3)) /
              5 +
            (this.ncr1 + this.ncr2 + this.ncr3);
        }
      }
    }
  }
}
