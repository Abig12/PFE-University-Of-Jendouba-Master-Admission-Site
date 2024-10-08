import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentsListRoutingModule } from './agents-list-routing.module';
import { AgentsListComponent } from './agents-list/agents-list.component';

@NgModule({
  declarations: [AgentsListComponent],
  imports: [CommonModule, AgentsListRoutingModule, FormsModule],
})
export class AgentsListModule {}
