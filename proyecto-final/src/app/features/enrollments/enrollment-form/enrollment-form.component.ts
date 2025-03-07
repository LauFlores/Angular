// import {Component, Inject, OnInit} from '@angular/core';
// import {FormBuilder, FormGroup, Validators,} from '@angular/forms';
// import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

// import {Student} from '../../../core/models/student';
// import {StudentsService} from '../../../core/services/student.service';
// import {EnrollmentService} from '../../../core/services/enrollment.service';
// import {Enrollment} from "../../../core/models/enrollment";
// import {CourseService} from "../../../core/services/course.service";
// import {Course} from "../../../core/models/course";
// import {Observable} from "rxjs";
// import {map, startWith} from "rxjs/operators";
// import { AuthService } from '../../../core/services/auth.service';

// import { MatSnackBar } from '@angular/material/snack-bar';


// @Component({
//     selector: 'app-enrollment-form',
//     templateUrl: './enrollment-form.component.html',
//     styleUrls: ['./enrollment-form.component.scss', '../../../shared/styles/dialog-form.scss'],
//     standalone: false
// })
// export class EnrollmentFormComponent implements OnInit {
//   enrollmentForm: FormGroup;
//   courses: Course[] = [];
//   filteredCourses!: Observable<Course[]>;

//   constructor(
//     private fb: FormBuilder,
//     private dialogRef: MatDialogRef<EnrollmentFormComponent>,
//     private enrollmentService: EnrollmentService,
//     private authService: AuthService,
//     private snackBar: MatSnackBar,
//     private courseService: CourseService,
//     @Inject(MAT_DIALOG_DATA) public data: any | null
//   ) {
//     this.enrollmentForm = this.fb.group({
//       courseId: [null, Validators.required],
//     });
//   }

//   ngOnInit(): void {
//     this.loadCourses();
//     this.setupAutocomplete();
//   }


//   private loadCourses(): void {
//     this.courseService.getActiveCourses().subscribe({
//       next: (courses) => {
//         this.courses = courses.sort((a, b) => a.name.localeCompare(b.name));
//       },
//       error: (err) => {
//         console.error(err, 'Error al cargar cursos');
//       },
//     });
//   }

//   private setupAutocomplete() {
//     this.filteredCourses = this.enrollmentForm.get('courseId')!.valueChanges.pipe(
//       startWith(''),
//       map((value) => (typeof value === 'string' ? value : value?.name || '')),
//       map((name) => (name ? this._filteredCourses(name) : this.courses.slice()))
//     );
//   }

//   private _filteredCourses(name: string): Course[] {
//     const filterValue = name.toLowerCase();
//     return this.courses.filter(course => course.name.toLowerCase().includes(filterValue));
//   }

//   displayCourse(course: Course): string {
//     return course && course.name ? course.name : '';
//   }

//   save(): void {
//     if (this.enrollmentForm.invalid) {
//       this.enrollmentForm.markAllAsTouched();
//     } else {
//           // Obtener el usuario logueado desde el AuthService
//       const currentUser = this.authService.getCurrentUser();
//       if (!currentUser) {
//         console.error('No hay usuario logueado');
//         return;
//       }
//       const enrollment: Omit<Enrollment, 'id' | 'enrollmentDate' | 'updatedAt' | 'isActive'> = {
//         studentId: this.data.studentId,
//         courseId: this.enrollmentForm.value.courseId!,
//         enrolledByUserId: this.currentUser.id ,
//       };
//       this.enrollmentService.enrollStudent(enrollment).subscribe({
//         next: () => {
//           this.dialogRef.close(true);
//           console.log(enrollment);
//         },
//         error: (err) => {
//           console.error(err, 'Error al agregar alumno');
//         }
//       });
//     }
//   }

//   close() {
//     this.dialogRef.close();
//   }
// }

//------------------------

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Student } from '../../../core/models/student';
import { StudentsService } from '../../../core/services/student.service';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { Enrollment } from "../../../core/models/enrollment";
import { CourseService } from "../../../core/services/course.service";
import { Course } from "../../../core/models/course";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { AuthService } from '../../../core/services/auth.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.scss', '../../../shared/styles/dialog-form.scss'],
  standalone: false
})
export class EnrollmentFormComponent implements OnInit {
  enrollmentForm: FormGroup;
  courses: Course[] = [];
  filteredCourses!: Observable<Course[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EnrollmentFormComponent>,
    private enrollmentService: EnrollmentService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: any | null
  ) {
    this.enrollmentForm = this.fb.group({
      courseId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCourses();
    this.setupAutocomplete();
  }

  private loadCourses(): void {
    this.courseService.getActiveCourses().subscribe({
      next: (courses) => {
        this.courses = courses.sort((a, b) => a.name.localeCompare(b.name));
      },
      error: (err) => {
        console.error(err, 'Error al cargar cursos');
      },
    });
  }

  private setupAutocomplete() {
    this.filteredCourses = this.enrollmentForm.get('courseId')!.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value?.name || '')),
      map((name) => (name ? this._filteredCourses(name) : this.courses.slice()))
    );
  }

  private _filteredCourses(name: string): Course[] {
    const filterValue = name.toLowerCase();
    return this.courses.filter(course => course.name.toLowerCase().includes(filterValue));
  }

  displayCourse(course: Course): string {
    return course && course.name ? course.name : '';
  }

  save(): void {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
    } else {
      // Obtener el usuario logueado desde AuthService
      const currentUser = this.authService.getCurrentUser();
      if (!currentUser) {
        console.error('No hay usuario logueado');
        return;
      }
      const enrollment: Omit<Enrollment, 'id' | 'enrollmentDate' | 'updatedAt' | 'isActive'> = {
        studentId: this.data.studentId,
        courseId: this.enrollmentForm.value.courseId!,
        enrolledByUserId: currentUser.id  // Se usa currentUser obtenido del AuthService
      };
      this.enrollmentService.enrollStudent(enrollment).subscribe({
        next: () => {
          this.dialogRef.close(true);
          console.log(enrollment);
        },
        error: (err) => {
          console.error(err, 'Error al agregar inscripción');
        }
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
