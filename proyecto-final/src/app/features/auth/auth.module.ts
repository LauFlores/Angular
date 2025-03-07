import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';

import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTooltip} from "@angular/material/tooltip";


@NgModule({
   declarations: [
      LoginComponent,
      RegisterComponent
   ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,

        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatDividerModule,
        MatSnackBarModule,
        MatTooltip
    ]
})
export class AuthModule {
}
