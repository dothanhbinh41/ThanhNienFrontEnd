import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full', 
    component : QuestionComponent
  },
  // {
  //   path: 'account',
  //   loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  // },
  // {
  //   path: 'identity',
  //   loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  // }, 
  // {
  //   path: 'setting-management',
  //   loadChildren: () =>
  //     import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
