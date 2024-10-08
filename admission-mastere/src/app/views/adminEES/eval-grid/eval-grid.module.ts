import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvalGridRoutingModule } from './eval-grid-routing.module';
import { EvalGridComponent } from './eval-grid/eval-grid.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EvalGridComponent],
  imports: [CommonModule, EvalGridRoutingModule, FormsModule],
})
export class EvalGridModule {}
