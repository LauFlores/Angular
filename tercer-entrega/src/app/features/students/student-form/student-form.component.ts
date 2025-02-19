import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Student} from "../../../core/models/student";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss', '../../../shared/styles/dialog-form.scss']
})

export class StudentFormComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student | null
  ) {
    this.studentForm = this.fb.group({
      firstName: [data?.firstName, Validators.required],
      lastName: [data?.lastName, Validators.required],
      email: [data?.email, [Validators.email, Validators.required]]
    });
  }

  save() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.studentForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
