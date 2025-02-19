import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../../../core/models/course";

@Component({
   selector: 'app-course-form',
   templateUrl: './course-form.component.html',
   styleUrls: ['./course-form.component.scss', '../../../shared/styles/dialog-form.scss']
})
export class CourseFormComponent {
   courseForm: FormGroup;

   constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<CourseFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Course | null
   ) {
      this.courseForm = this.fb.group({
         name: [data?.name, null],
         description: [data?.description, null],
         imageURL: [data?.imageURL, null]
      });
   }

   save() {
      if (this.courseForm.invalid) {
         this.courseForm.markAllAsTouched();
      } else {
         this.dialogRef.close(this.courseForm.value);
      }
   }

   close() {
      this.dialogRef.close();
   }
}
