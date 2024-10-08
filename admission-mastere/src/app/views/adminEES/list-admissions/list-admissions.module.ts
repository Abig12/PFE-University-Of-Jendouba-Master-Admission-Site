import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListAdmissionsRoutingModule } from './list-admissions-routing.module';
import { ListAdmissionsComponent } from './list-admissions/list-admissions.component';


@NgModule({
  declarations: [
    ListAdmissionsComponent
  ],
  imports: [
    CommonModule,
    ListAdmissionsRoutingModule
  ]
})
export class ListAdmissionsModule { }
