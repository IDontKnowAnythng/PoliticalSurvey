import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyPage } from './survey.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyPage
  },
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin/admin.module').then( m => m.AdminPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyPageRoutingModule {}
