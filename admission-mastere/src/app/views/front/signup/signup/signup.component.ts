import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  messageerr = '';
  constructor(private ps: AuthUserService, private route: Router) {}

  ngOnInit(): void {}

  signupuser(f: any) {
    this.messageerr = '';
    let data = f.value;
    this.ps.postsign(data).subscribe(
      (data) => {
        this.route.navigate(['/login']);
      },
      (error) => {
        console.log(error);
        this.messageerr = '';
        if (error.status === 402) {
          this.messageerr = 'Email déjà utilisé. ';
        }
        if (error.status === 401) {
          this.messageerr = 'Passeport/cin déjà utilisé. ';
        }
        if (error.status === 400) {
          this.messageerr = error.error.error;
        } // Handle the error here
      }
    );
  }
}
