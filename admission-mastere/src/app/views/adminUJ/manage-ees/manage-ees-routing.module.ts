import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageEESComponent } from './manage-ees/manage-ees.component';
import { FormsModule } from '@angular/forms';
const routes: Routes = [{ path: '', component: ManageEESComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule],
})
export class ManageEESRoutingModule {}
