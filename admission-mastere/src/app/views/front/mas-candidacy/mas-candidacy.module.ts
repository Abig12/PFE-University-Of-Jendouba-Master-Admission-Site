import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasCandidacyRoutingModule } from './mas-candidacy-routing.module';
import { MasCandidacyComponent } from './mas-candidacy/mas-candidacy.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [MasCandidacyComponent],
  imports: [
    CommonModule,
    MasCandidacyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class MasCandidacyModule {}
