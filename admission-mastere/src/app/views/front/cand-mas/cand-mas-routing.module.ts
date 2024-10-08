import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandMasComponent } from './cand-mas/cand-mas.component';

const routes: Routes = [{ path: '', component: CandMasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandMasRoutingModule {}
