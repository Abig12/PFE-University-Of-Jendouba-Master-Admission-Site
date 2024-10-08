import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentMasModule } from './agent-mas.module';
import { AgentMasComponent } from './agent-mas/agent-mas.component';

const routes: Routes = [{ path: '', component: AgentMasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentMasRoutingModule {}
