import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasCandidacyComponent } from './mas-candidacy/mas-candidacy.component';

const routes: Routes = [{ path: '', component: MasCandidacyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasCandidacyRoutingModule {}
