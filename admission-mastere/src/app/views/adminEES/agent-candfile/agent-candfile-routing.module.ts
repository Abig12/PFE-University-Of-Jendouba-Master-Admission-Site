import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentCandfileComponent } from './agent-candfile/agent-candfile.component';

const routes: Routes = [{ path: '', component: AgentCandfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentCandfileRoutingModule {}
