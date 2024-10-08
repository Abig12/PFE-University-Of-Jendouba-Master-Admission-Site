import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabMastersRoutingModule } from './tab-masters-routing.module';
import { TabMastersComponent } from './tab-masters/tab-masters.component';


@NgModule({
  declarations: [
    TabMastersComponent
  ],
  imports: [
    CommonModule,
    TabMastersRoutingModule
  ]
})
export class TabMastersModule { }
