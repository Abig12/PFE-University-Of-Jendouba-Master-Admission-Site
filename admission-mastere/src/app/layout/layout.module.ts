import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUJLayoutComponent } from './admin-uj-layout/admin-uj-layout.component';
import { AdminEESLayoutComponent } from './admin-ees-layout/admin-ees-layout.component';
import { FrontLayoutComponent } from './front-layout/front-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminUJLayoutComponent,
    AdminEESLayoutComponent,
    FrontLayoutComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class LayoutModule {}
