import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCandidacyRoutingModule } from './list-candidacy-routing.module';
import { ListCandidacyComponent } from './list-candidacy/list-candidacy.component';


@NgModule({
  declarations: [
    ListCandidacyComponent
  ],
  imports: [
    CommonModule,
    ListCandidacyRoutingModule
  ]
})
export class ListCandidacyModule { }
