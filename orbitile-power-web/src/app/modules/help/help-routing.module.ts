import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../core/auth/auth.guard';
import {AuthModule} from '../../core/auth/auth.module';
import {MainLayoutComponent} from '../../shared/layout/main-layout.component';
import {HelpComponent} from './help.component';


const routes: Routes = [
  {
    path: 'help',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HelpComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), AuthModule],
  exports: [RouterModule]
})
export class HelpRoutingModule {
}
