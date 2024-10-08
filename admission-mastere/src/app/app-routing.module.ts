import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEESLayoutComponent } from './layout/admin-ees-layout/admin-ees-layout.component';
import { AdminUJLayoutComponent } from './layout/admin-uj-layout/admin-uj-layout.component';
import { FrontLayoutComponent } from './layout/front-layout/front-layout.component';
import { GuardadminujGuard } from './guards/guardadminuj.guard';
import { GuardadmineetGuard } from './guards/guardadmineet.guard';

const routes: Routes = [
  {
    path: '',
    component: FrontLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/front/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./views/front/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('./views/front/signup/signup.module').then(
            (m) => m.SignupModule
          ),
      },
      {
        path: 'tab-masters',
        loadChildren: () =>
          import('./views/front/tab-masters/tab-masters.module').then(
            (m) => m.TabMastersModule
          ),
      },
      {
        path: 'mas-candidacy/:cm_id',
        loadChildren: () =>
          import('./views/front/mas-candidacy/mas-candidacy.module').then(
            (m) => m.MasCandidacyModule
          ),
      },
      {
        path: 'cand-file',
        loadChildren: () =>
          import('./views/front/cand-file/cand-file.module').then(
            (m) => m.CandFileModule
          ),
      },
      {
        path: 'cand-mas',
        loadChildren: () =>
          import('./views/front/cand-mas/cand-mas.module').then(
            (m) => m.CandMasModule
          ),
      },
    ],
  },
  {
    path: 'adminuj',
    component: AdminUJLayoutComponent,
    canActivate: [GuardadminujGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/adminUJ/statis/statis.module').then(
            (m) => m.StatisModule
          ),
      },
      {
        path: 'addagents',
        loadChildren: () =>
          import('./views/adminUJ/add-agents/add-agents.module').then(
            (m) => m.AddAgentsModule
          ),
      },
      {
        path: 'agentslist',
        loadChildren: () =>
          import('./views/adminUJ/agents-list/agents-list.module').then(
            (m) => m.AgentsListModule
          ),
      },
      {
        path: 'manageees',
        loadChildren: () =>
          import('./views/adminUJ/manage-ees/manage-ees.module').then(
            (m) => m.ManageEESModule
          ),
      },
      {
        path: 'statis',
        loadChildren: () =>
          import('./views/adminUJ/statis/statis.module').then(
            (m) => m.StatisModule
          ),
      },
    ],
  },
  {
    path: 'adminees',
    component: AdminEESLayoutComponent,
    canActivate: [GuardadmineetGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/adminEES/statis/statis.module').then(
            (m) => m.StatisModule
          ),
      },
      {
        path: 'statis',
        loadChildren: () =>
          import('./views/adminEES/statis/statis.module').then(
            (m) => m.StatisModule
          ),
      },
      {
        path: 'manage-courses',
        loadChildren: () =>
          import('./views/adminEES/manage-courses/manage-courses.module').then(
            (m) => m.ManageCoursesModule
          ),
      },
      {
        path: 'masters-list',
        loadChildren: () =>
          import('./views/adminEES/masters-list/masters-list.module').then(
            (m) => m.MastersListModule
          ),
      },
      {
        path: 'eval-grid',
        loadChildren: () =>
          import('./views/adminEES/eval-grid/eval-grid.module').then(
            (m) => m.EvalGridModule
          ),
      },
      {
        path: 'agent-mas',
        loadChildren: () =>
          import('./views/adminEES/agent-mas/agent-mas.module').then(
            (m) => m.AgentMasModule
          ),
      },
      {
        path: 'list-candidacy/:cm_id',
        loadChildren: () =>
          import('./views/adminEES/list-candidacy/list-candidacy.module').then(
            (m) => m.ListCandidacyModule
          ),
      },
      {
        path: 'agent-candfile/:user_id',
        loadChildren: () =>
          import('./views/adminEES/agent-candfile/agent-candfile.module').then(
            (m) => m.AgentCandfileModule
          ),
      },
      {
        path: 'list-admissions',
        loadChildren: () =>
          import(
            './views/adminEES/list-admissions/list-admissions.module'
          ).then((m) => m.ListAdmissionsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
