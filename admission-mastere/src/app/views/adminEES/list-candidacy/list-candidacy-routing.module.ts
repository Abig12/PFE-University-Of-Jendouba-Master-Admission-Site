import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCandidacyComponent } from './list-candidacy/list-candidacy.component';

const routes: Routes = [{ path: '', component: ListCandidacyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCandidacyRoutingModule {}
