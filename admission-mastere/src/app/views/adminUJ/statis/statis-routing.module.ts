import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisComponent } from './statis/statis.component';

const routes: Routes = [
    {path:'',component:StatisComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisRoutingModule { }
