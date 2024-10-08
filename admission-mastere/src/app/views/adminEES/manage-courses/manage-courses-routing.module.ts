import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';

const routes: Routes = [{ path: '', component: ManageCoursesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageCoursesRoutingModule {}
