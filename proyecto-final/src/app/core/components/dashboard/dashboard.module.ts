import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {CoreModule} from "../../core.module";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";

import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatSidenavModule} from "@angular/material/sidenav";


@NgModule({
   declarations: [DashboardComponent],
   imports: [
      CommonModule,
      DashboardRoutingModule,
      CoreModule,
      RouterModule,
      SharedModule,

      MatCardModule,
      MatButtonModule,
      MatIconModule,
      MatDividerModule,
      MatSidenavModule
   ]
})
export class DashboardModule {
}
