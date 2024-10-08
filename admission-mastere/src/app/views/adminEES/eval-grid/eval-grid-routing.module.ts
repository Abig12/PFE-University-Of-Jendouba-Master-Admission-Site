import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvalGridComponent } from './eval-grid/eval-grid.component';

const routes: Routes = [{ path: '', component: EvalGridComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvalGridRoutingModule {}
