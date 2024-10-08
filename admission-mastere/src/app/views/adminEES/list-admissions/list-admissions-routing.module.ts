import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAdmissionsComponent } from './list-admissions/list-admissions.component';

const routes: Routes = [{ path: '', component: ListAdmissionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAdmissionsRoutingModule {}
