import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCoursesRoutingModule } from './manage-courses-routing.module';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ManageCoursesComponent],
  imports: [CommonModule, ManageCoursesRoutingModule, FormsModule],
})
export class ManageCoursesModule {}
