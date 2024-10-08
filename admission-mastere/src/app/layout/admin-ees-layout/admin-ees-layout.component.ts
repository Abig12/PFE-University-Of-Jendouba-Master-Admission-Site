import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgenteesService } from 'src/app/services/agentees.service';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-admin-ees-layout',
  templateUrl: './admin-ees-layout.component.html',
  styleUrls: ['./admin-ees-layout.component.css'],
})
export class AdminEESLayoutComponent {
  dataArray: any = [];
  constructor(
    private ees: AgenteesService,
    private as: AuthUserService,
    private route: Router
  ) {
    if (!localStorage.getItem('token')) {
      this.route.navigate(['/login']);
    }
    this.as.getusername().subscribe((data) => {
      console.log(data);
      this.dataArray = data;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}
