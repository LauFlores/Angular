import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {CoursesRoutingModule} from './courses-routing.module';
import {CourseFormComponent} from './course-form/course-form.component';
import {CourseListComponent} from './course-list/course-list.component';
import {CourseDetailComponent} from './course-detail/course-detail.component';
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
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    CourseFormComponent,
    CourseListComponent,
    CourseDetailComponent
  ],
    imports: [
        CommonModule,
        CoursesRoutingModule,
        ReactiveFormsModule,
        SharedModule,

        MatInputModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatListModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatCardModule,
        NgOptimizedImage
    ]
})
export class CoursesModule {
}
