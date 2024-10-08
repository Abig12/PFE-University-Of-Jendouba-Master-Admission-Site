import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MastersListComponent } from './masters-list/masters-list.component';

const routes: Routes = [{ path: '', component: MastersListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MastersListRoutingModule {}
