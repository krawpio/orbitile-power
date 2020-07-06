import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PowerlineListComponent} from './powerline-list/powerline-list.component';
import {PowerlineDetailsComponent} from './powerline-details/powerline-details.component';
import {AuthGuard} from '../../core/auth/auth.guard';
import {AuthModule} from '../../core/auth/auth.module';
import {MainLayoutComponent} from '../../shared/layout/main-layout.component';

const lineRoutes: Routes = [
  {
    path: 'powerline',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PowerlineListComponent
      }
    ]
  },
  {
    path: 'powerline/:id',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PowerlineDetailsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(lineRoutes), AuthModule],
  exports: [RouterModule]
})
export class PowerlineRoutingModule {
}
