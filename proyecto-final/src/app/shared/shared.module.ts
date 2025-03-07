import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullNamePipe} from './pipes/full-name.pipe';
import {RouterModule} from '@angular/router';

import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';

import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {WelcomeComponent} from './components/welcome/welcome.component';
import {MatCardModule} from "@angular/material/card";

@NgModule({
   declarations: [
      FullNamePipe,
      ConfirmDialogComponent,
      WelcomeComponent,
      ToolbarComponent,
      SidenavComponent
   ],
   exports: [
      FullNamePipe,
      SidenavComponent,
      ToolbarComponent,
      ConfirmDialogComponent,
   ],
   imports: [
      CommonModule,
      RouterModule,
      MatListModule,
      MatIconModule,
      MatToolbarModule,
      MatButtonModule,
      MatBadgeModule,
      MatMenuModule,
      MatDialogModule,
      MatCardModule
   ]
})
export class SharedModule {
}
