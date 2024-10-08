import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAgentsComponent } from './add-agents/add-agents.component';

const routes: Routes = [{ path: '', component: AddAgentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAgentsRoutingModule {}
