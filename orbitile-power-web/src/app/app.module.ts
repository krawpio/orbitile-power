import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {IconService} from './core/services/icon.service';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {httpInterceptorProviders} from './core/http-interceptors';
import {AuthModule} from './core/auth/auth.module';
import {MenuModule} from './shared/menu/menu.module';
import {PowerlineModule} from './modules/powerline/powerline.module';
import {AlertModule} from './modules/alerts/alert.module';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import {MainLayoutComponent} from './shared/layout/main-layout.component';
import {OrderModule} from './modules/orders/order.module';
import {HelpModule} from './modules/help/help.module';
import {SpinnerComponent} from './shared/overlay/spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MessageModule} from './core/messages/message.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MainLayoutComponent,
    SpinnerComponent,
  ],
  imports: [
    MatSidenavModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    MenuModule,
    PowerlineModule,
    AlertModule,
    DashboardModule,
    OrderModule,
    HelpModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MessageModule,
    MatSnackBarModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private iconService: IconService) {
    iconService.registerIcons();
    registerLocaleData(localePl, 'pl');

  }
}
