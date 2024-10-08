import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandMasRoutingModule } from './cand-mas-routing.module';
import { CandMasComponent } from './cand-mas/cand-mas.component';


@NgModule({
  declarations: [
    CandMasComponent
  ],
  imports: [
    CommonModule,
    CandMasRoutingModule
  ]
})
export class CandMasModule { }
