import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandFileComponent } from './cand-file/cand-file.component';

const routes: Routes = [{ path: '', component: CandFileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandFileRoutingModule {}
