import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CandidncyService } from 'src/app/services/candidncy.service';

@Component({
  selector: 'app-cand-file',
  templateUrl: './cand-file.component.html',
  styleUrls: ['./cand-file.component.css'],
})
export class CandFileComponent {
  dataArray: any = [];
  infoArray: any = [];
  file1: any;
  file2: any;
  file3: any;
  redoublement1: string = '';
  redoublement2: string = '';
  redoublement3: string = '';
  messageSucc = '';
  constructor(private cs: CandidncyService, private route: Router) {
    this.cs.getfile().subscribe((data) => {
      console.log(data);
      this.dataArray = data;
    });
    this.cs.getuserinfo().subscribe((data) => (this.infoArray = data));
  }

  ex() {
    this.route.navigate(['/']);
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

  updatefile(d: any) {
    const formData = new FormData();
    formData.append('ann_bac', d.value.ann_bac);
    formData.append('spec_bac', d.value.spec_bac);
    formData.append('dip_univ', d.value.dip_univ);
    formData.append('spec', d.value.spec);
    formData.append('ann_dip', d.value.ann_dip);
    formData.append('redo_1ere', this.redoublement1);
    formData.append('moy_1ere', d.value.moy_1ere);
    formData.append('session_1ere', d.value.session_1ere);
    formData.append('credit_1ere', d.value.credit_1ere);
    formData.append('file_1ere', this.file1);
    formData.append('redo_2eme', this.redoublement2);
    formData.append('moy_2eme', d.value.moy_2eme);
    formData.append('session_2eme', d.value.session_2eme);
    formData.append('credit_2eme', d.value.credit_2eme);
    formData.append('file_2eme', this.file2);
    formData.append('redo_3eme', this.redoublement3);
    formData.append('moy_3eme', d.value.moy_3eme);
    formData.append('session_3eme', d.value.session_3eme);
    formData.append('credit_3eme', d.value.credit_3eme);
    formData.append('file_3eme', this.file3);
    console.log(formData);
    this.cs.updatefile(this.dataArray.file_id, formData).subscribe((data) => {
      this.messageSucc = 'Votre fichier a été modifié avec succès';
      setTimeout(() => {
        location.reload();
      }, 600);
    });
  }

  getfile1(file_1ere: any) {}
}
