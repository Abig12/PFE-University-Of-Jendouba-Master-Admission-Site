import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasCandService } from 'src/app/services/mas-cand.service';

@Component({
  selector: 'app-list-candidacy',
  templateUrl: './list-candidacy.component.html',
  styleUrls: ['./list-candidacy.component.css'],
})
export class ListCandidacyComponent {
  dataArray: any = [];
  idmas: any = [];

  constructor(
    private ar: ActivatedRoute,
    private ms: MasCandService,
    private route: Router
  ) {
    this.ar.params.subscribe((data) => {
      this.idmas = data;
      this.ms
        .getmascand(this.idmas.cm_id)
        .subscribe((data) => (this.dataArray = data));
    });
  }

  fileuser(user_id: any) {
    this.route.navigate(['/adminees/agent-candfile/' + user_id]);
  }
}
