import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StudentsRoutingModule} from './students-routing.module';
import {StudentListComponent} from './student-list/student-list.component';
import {StudentFormComponent} from './student-form/student-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {StudentDetailComponent} from './student-detail/student-detail.component';
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    StudentListComponent,
    StudentFormComponent,
    StudentDetailComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    SharedModule,

    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
  ],
})
export class StudentsModule {
}
