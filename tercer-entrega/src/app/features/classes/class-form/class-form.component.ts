import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup,} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {Class} from '../../../core/models/class';
import {Course} from '../../../core/models/course';
import {CourseService} from '../../../core/services/course.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss', '../../../shared/styles/dialog-form.scss']
})
export class ClassFormComponent implements OnInit {
  classForm: FormGroup;
  courses: Course[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClassFormComponent>,
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Class | null
  ) {
    this.classForm = this.fb.group({
      title: [data?.title, null],
      description: [data?.description, null],
      courseId: [data?.courseId, null]
    });
  }

  save() {
    if (this.classForm.invalid) {
      this.classForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.classForm.value);
    }
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses() {
    this.courseService.getActiveCourses().subscribe({
      next: (courses) => {
        this.courses = courses.sort((a, b) => a.name.localeCompare(b.name));
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
