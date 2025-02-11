import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Student} from "../../../core/models/student";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../../../core/services/student.service";
import {MatDialog} from "@angular/material/dialog";

import {EnrollmentFormComponent} from "../../enrollments/enrollment-form/enrollment-form.component";
import {EnrollmentService} from "../../../core/services/enrollment.service";
import {CourseService} from "../../../core/services/course.service";

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss', '../../../shared/styles/details.scss'],
})
export class StudentDetailComponent implements OnInit, AfterViewInit {
  studentID!: number;
  student!: Student;
  enrollments!: EnrollmentDisplay[];
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private enrollmentService: EnrollmentService,
    private courseService: CourseService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    // Obtener el ID del estudiante desde la ruta.
    this.route.params.subscribe((params) => {
      this.studentID = +params['id']; // uso el '+' para parsear
      this.loadStudent();
    });
  }

  ngAfterViewInit(): void {
    this.loadEnrollments();
  }

  private loadStudent(): void {
    this.isLoading = true;
    this.studentsService.getStudentById(this.studentID).subscribe({
      next: (student) => {
        this.student = student;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    // Redireccionar al listado de estudiantes.
    this.router.navigate(['/students']).then();
  }

  openEnrollmentForm(): void {
    const dialogRef = this.dialog.open(EnrollmentFormComponent, {
      data: {studentId: this.studentID},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEnrollments();
      }
    });
  }

  private loadEnrollments() {
    this.enrollmentService.getEnrollmentsByStudentId(this.studentID).subscribe({
      next: (enrollments) => {
        this.courseService.getActiveCourses().subscribe({
          next: (courses) => {
            this.enrollments = enrollments.map((enrollment) => {
              const course = courses.find((c) => c.id === enrollment.courseId);
              return {
                courseId: enrollment.courseId,
                studentId: this.student.id,
                courseName: course
                  ? course.name
                  : 'Curso no encontrado',
                enrollmentDate: enrollment.enrollmentDate,
              };
            });
          },
          error: (err) => {
            console.error(err);
          },
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}

interface EnrollmentDisplay {
  courseId: number;
  courseName: string;
  enrollmentDate: Date;
}
