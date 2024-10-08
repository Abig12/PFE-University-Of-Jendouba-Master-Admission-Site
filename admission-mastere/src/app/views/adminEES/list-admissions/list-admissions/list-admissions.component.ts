import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgenteesService } from 'src/app/services/agentees.service';
import { ListAdmissionsService } from 'src/app/services/list-admissions.service';

@Component({
  selector: 'app-list-admissions',
  templateUrl: './list-admissions.component.html',
  styleUrls: ['./list-admissions.component.css'],
})
export class ListAdmissionsComponent {
  dataArray: any = [];
  masArray: any = [];
  constructor(private ees: AgenteesService, private as: ListAdmissionsService) {
    this.ees.getetab().subscribe((data) => {
      this.masArray = data;
      this.as.getmascand(this.masArray[0].etablissement).subscribe((data) => {
        this.dataArray = data;
      });
    });
  }
}
