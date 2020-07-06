import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlertListComponent} from './alert-list/alert-list.component';
import {AuthGuard} from '../../core/auth/auth.guard';
import {AuthModule} from '../../core/auth/auth.module';
import {MainLayoutComponent} from '../../shared/layout/main-layout.component';

const alertRoutes: Routes = [
  {
    path: 'alert',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AlertListComponent
      }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(alertRoutes), AuthModule],
  exports: [RouterModule]
})
export class AlertRoutingModule { }
