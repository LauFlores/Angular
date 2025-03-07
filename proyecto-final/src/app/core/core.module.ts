import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterOutlet} from "@angular/router";

@NgModule({
  declarations: [

  ],
  exports: [

  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterOutlet
  ]
})
export class CoreModule {
}
