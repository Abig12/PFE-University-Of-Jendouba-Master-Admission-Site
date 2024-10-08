import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CandidncyService } from 'src/app/services/candidncy.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-cand-mas',
  templateUrl: './cand-mas.component.html',
  styleUrls: ['./cand-mas.component.css'],
})
export class CandMasComponent {
  dataArray: any = [];
  infoArray: any = [];
  umasArray: any = [];
  messageSucc = '';
  delmas = {
    usermas_id: '',
    i: '',
  };
  constructor(private cs: CandidncyService, private route: Router) {
    this.cs.getfile().subscribe((data) => {
      this.dataArray = data;
      this.cs
        .getusermas(this.dataArray.file_id)
        .subscribe((data) => (this.umasArray = data));
    });
    this.cs.getuserinfo().subscribe((data) => (this.infoArray = data));
  }

  ex() {
    this.route.navigate(['/']);
  }

  delbutton(usermas_id: any, i: any) {
    this.delmas.usermas_id = usermas_id;
    this.delmas.i = i;
  }

  deleteusermas(usermas_id: any, i: any) {
    this.cs.delusermas(usermas_id).subscribe(
      (response) => {
        console.log(response);
        this.umasArray.splice(i, 1);
        location.reload();
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
}
