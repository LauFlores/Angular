import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatLabel, MatError} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {Alumno} from "../../../../shared/interfaces/alumno";
import {FullNamePipe} from "../../../../shared/pipes/full-name.pipe";
import {TitleDirective} from "../../../../shared/directives/title.directive";

@Component({
  selector: 'app-abm-alumnos',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatError,
    MatDialogTitle,
    ReactiveFormsModule,
    MatInput,
    MatDialogActions,
    MatButton,
    FullNamePipe,
    TitleDirective,
  ],
  templateUrl: './abm-alumnos.component.html',
  styleUrl: './abm-alumnos.component.css'
})
export class AbmAlumnosComponent {
  alumnoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AbmAlumnosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alumno | null
  ) {
    this.alumnoForm = this.fb.group({
      nombre: [data?.nombre, Validators.required],
      apellido: [data?.apellido, Validators.required],
      email: [data?.email, [Validators.email, Validators.required]]
    });
  }

  save() {
    if (this.alumnoForm.invalid) {
      this.alumnoForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.alumnoForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
