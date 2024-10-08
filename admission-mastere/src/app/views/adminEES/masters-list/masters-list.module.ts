import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersListRoutingModule } from './masters-list-routing.module';
import { MastersListComponent } from './masters-list/masters-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MastersListComponent],
  imports: [CommonModule, MastersListRoutingModule, FormsModule],
})
export class MastersListModule {}
