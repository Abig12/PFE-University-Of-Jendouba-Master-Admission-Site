import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgenteesService } from 'src/app/services/agentees.service';

@Component({
  selector: 'app-agent-mas',
  templateUrl: './agent-mas.component.html',
  styleUrls: ['./agent-mas.component.css'],
})
export class AgentMasComponent {
  dataArray: any = [];
  masArray: any = [];
  constructor(private ees: AgenteesService, private route: Router) {
    this.ees.getetab().subscribe((data) => {
      this.masArray = data;
      if (this.masArray.length > 0) {
        this.ees.getmas(this.masArray[0].etablissement).subscribe((data) => {
          this.dataArray = data;
        });
      }
    });
  }

  listcond(cm_id: any) {
    this.route.navigate(['/adminees/list-candidacy/' + cm_id]);
  }
}
