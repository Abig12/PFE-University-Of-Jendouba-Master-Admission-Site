import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentMasRoutingModule } from './agent-mas-routing.module';
import { AgentMasComponent } from './agent-mas/agent-mas.component';


@NgModule({
  declarations: [
    AgentMasComponent
  ],
  imports: [
    CommonModule,
    AgentMasRoutingModule
  ]
})
export class AgentMasModule { }
