import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabMastersComponent } from './tab-masters/tab-masters.component';

const routes: Routes = [
    {path:'',component:TabMastersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabMastersRoutingModule { }
