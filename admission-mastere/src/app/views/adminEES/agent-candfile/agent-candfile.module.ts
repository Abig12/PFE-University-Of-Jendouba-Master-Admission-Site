import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentCandfileRoutingModule } from './agent-candfile-routing.module';
import { AgentCandfileComponent } from './agent-candfile/agent-candfile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AgentCandfileComponent],
  imports: [CommonModule, AgentCandfileRoutingModule, FormsModule],
})
export class AgentCandfileModule {}
