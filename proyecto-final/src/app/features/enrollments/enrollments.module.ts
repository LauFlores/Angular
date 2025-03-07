import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatListModule} from "@angular/material/list";

import {EnrollmentFormComponent} from './enrollment-form/enrollment-form.component';
import {EnrollmentsRoutingModule} from './enrollments-routing.module';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {EnrollmentListComponent} from './enrollment-list/enrollment-list.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { enrollmentFeature } from './store/enrollment.reducer';



@NgModule({
    declarations: [EnrollmentFormComponent,
        EnrollmentListComponent
    ],
    imports: [
        CommonModule,
        EnrollmentsRoutingModule,
        ReactiveFormsModule,
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
        MatAutocompleteModule,
        MatSnackBarModule,
        StoreModule.forFeature(enrollmentFeature)
    ],
    exports: [
      EnrollmentFormComponent
    ]
})
export class EnrollmentsModule {
}
