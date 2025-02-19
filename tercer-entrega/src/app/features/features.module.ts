import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";

import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";
import {AuthModule} from "./auth/auth.module";

@NgModule({
   declarations: [
   ],
   exports: [
      AuthModule,
   ],
   imports: [
      CommonModule,
      SharedModule,
      ReactiveFormsModule,

      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatAutocompleteModule,
      MatButtonModule,
   ]
})
export class FeaturesModule {
}
