import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SharedModule} from "../shared/shared.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterOutlet} from "@angular/router";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSidenavModule,
    RouterOutlet
  ]
})
export class CoreModule {
}
