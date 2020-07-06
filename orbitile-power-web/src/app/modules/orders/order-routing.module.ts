import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../core/auth/auth.guard';
import {AuthModule} from '../../core/auth/auth.module';
import {MainLayoutComponent} from '../../shared/layout/main-layout.component';
import {OrderListComponent} from './order-list/order-list.component';
import {OrderDetailsComponent} from './order-details/order-details.component';

const lineRoutes: Routes = [
  {
    path: 'order',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: OrderListComponent
      }
    ]
  },
  {
    path: 'order/:id',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: OrderDetailsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(lineRoutes), AuthModule],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
