import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAgentsRoutingModule } from './add-agents-routing.module';
import { AddAgentsComponent } from './add-agents/add-agents.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddAgentsComponent],
  imports: [CommonModule, AddAgentsRoutingModule, FormsModule],
})
export class AddAgentsModule {}
