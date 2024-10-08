import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AgenteesService } from 'src/app/services/agentees.service';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css'],
})
export class ManageCoursesComponent {
  dataArray: any = [];
  messageaddSucc = '';
  messageerr = '';
  constructor(private ees: AgenteesService, private route: Router) {
    this.ees.getetab().subscribe((data) => {
      this.dataArray = data;
    });
  }
  addcourse(a: any) {
    let data = a.value;
    this.messageerr = '';
    this.ees.addmc(this.dataArray[0].etablissement, data).subscribe(
      (data) => {
        this.messageaddSucc = 'coure de master ajoutée avec succès';
        setTimeout(() => {
          location.reload();
        }, 600);
      },
      (error) => {
        if (error.status === 402) {
          this.messageerr = 'Cours de mastère déjà existe.  ';
        }
        if (error.status === 400) {
          this.messageerr = error.error.error;
        } // Handle the error here
      }
    );
  }
}
