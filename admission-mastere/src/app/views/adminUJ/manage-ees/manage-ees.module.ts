import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManageEESRoutingModule } from './manage-ees-routing.module';
import { ManageEESComponent } from './manage-ees/manage-ees.component';

@NgModule({
  declarations: [ManageEESComponent],
  imports: [CommonModule, ManageEESRoutingModule, FormsModule],
})
export class ManageEESModule {}
