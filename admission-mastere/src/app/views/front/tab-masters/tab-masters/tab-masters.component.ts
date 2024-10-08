import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CandidncyService } from 'src/app/services/candidncy.service';
import { TabMasService } from 'src/app/services/tab-mas.service';

@Component({
  selector: 'app-tab-masters',
  templateUrl: './tab-masters.component.html',
  styleUrls: ['./tab-masters.component.css'],
})
export class TabMastersComponent {
  dataArray: any = [];
  datadet = {
    cm_id: '',
    details: '',
  };
  idcond: any = [];
  messageSucc = '';
  messageerr = '';
  constructor(
    private ts: TabMasService,
    private cs: CandidncyService,
    private route: Router
  ) {
    this.ts.tabmas().subscribe((data) => (this.dataArray = data));
  }

  detmas(details: string) {
    this.datadet.details = details;
  }

  idmas(cm_id: any) {
    let token: any = localStorage.getItem('token');
    if (!token) {
      this.route.navigate(['/login']);
    } else {
      this.cs.getidcand().subscribe(
        (data) => {
          console.log(data);
          this.idcond = data;
          this.cs.addcand(this.idcond[0].file_id, cm_id).subscribe(
            (data) => {
              this.messageSucc = 'coure de master ajoutée avec succès';
              setTimeout(() => {
                location.reload();
              }, 600);
            },
            (error) => {
              if (error.status === 409) {
                this.messageerr = 'Vous avez déjà ajouté ce mastére.';
                setTimeout(() => {
                  location.reload();
                }, 600);
              }
            }
          );
        },
        (error) => {
          this.route.navigate(['/mas-candidacy/' + cm_id]);
        }
      );
    }
  }
}
