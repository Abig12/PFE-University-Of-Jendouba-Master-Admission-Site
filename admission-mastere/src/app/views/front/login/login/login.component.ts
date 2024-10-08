import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  dataReceived: any;
  messageerr = '';
  constructor(private ls: AuthUserService, private route: Router) {}

  ngOnInit(): void {}

  loginuser(l: any) {
    this.messageerr = '';
    let data = l.value;

    this.ls.postlogin(data).subscribe(
      (response: Object) => {
        this.dataReceived = response;
        this.ls.SaveToken(this.dataReceived.token);
        let role = this.ls.getrole();
        // Check user role and navigate to appropriate page
        if (role === 'user') {
          this.route.navigate(['/']);
        } else if (role === 'agentuj') {
          this.route.navigate(['/adminuj']);
        } else if (role === 'agentees') {
          this.route.navigate(['/adminees']);
        } else {
          this.route.navigate(['/login']); // Redirect to login page by default
        }
      },
      (error) => {
        if (error.status === 401) {
          this.messageerr =
            'Désolé, passeport/cin ou le mot de passe est incorrect. Veuillez revérifier. ';
        } // Handle the error here

        if (error.status === 400) {
          this.messageerr =
            'Le passeport/cin et le mot de passe sont obligatoires.';
        }
      }
    );
  }
}
