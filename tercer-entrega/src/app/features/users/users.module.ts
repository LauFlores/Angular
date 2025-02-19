import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";

import {SharedModule} from "../../shared/shared.module";
import {UsersRoutingModule} from './users-routing.module';
import {UserListComponent} from './user-list/user-list.component';

import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {MatListModule} from "@angular/material/list";

@NgModule({
   declarations: [
      UserListComponent
   ],
   imports: [
      CommonModule,
      UsersRoutingModule,
      SharedModule,
      MatProgressSpinner,
      MatFormField,
      MatButtonModule,
      MatSlideToggleModule,
      ReactiveFormsModule,
      MatTableModule,
      MatIconModule,
      MatPaginatorModule,
      MatSortModule,
      MatDialogModule,
      MatCardModule,
      MatInputModule,
      MatSelectModule,
      MatChipsModule,
      MatListModule
   ]
})
export class UsersModule {
}
