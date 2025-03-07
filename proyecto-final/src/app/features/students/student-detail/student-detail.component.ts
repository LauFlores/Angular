import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Student} from "../../../core/models/student";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../../../core/services/student.service";
import {MatDialog} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar"; // Se importa MatSnackBar para mostrar mensajes

import {EnrollmentFormComponent} from "../../enrollments/enrollment-form/enrollment-form.component";
import {EnrollmentService} from "../../../core/services/enrollment.service";
import {CourseService} from "../../../core/services/course.service";

@Component({
    selector: 'app-student-detail',
    templateUrl: './student-detail.component.html',
    styleUrls: ['./student-detail.component.scss', '../../../shared/styles/details.scss'],
    standalone: false
})
export class StudentDetailComponent implements OnInit {
  studentId!: string;
  // courseId!: string;
  student!: Student;
  enrollments!: EnrollmentDisplay[];
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private enrollmentService: EnrollmentService,
    private courseService: CourseService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar // Se inyecta MatSnackBar
  ) {
  }

  ngOnInit(): void {
    // Obtener el ID del estudiante desde la ruta.
    this.route.params.subscribe((params) => {
      this.studentId = params['id'];
      this.loadStudent();
      this.loadEnrollments();
    });
  }

  private loadStudent(): void {
    this.isLoading = true;
    this.studentsService.getStudentById(this.studentId).subscribe({
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
    this.router.navigate(['/students']);
  }

  openEnrollmentForm(): void {
    const dialogRef = this.dialog.open(EnrollmentFormComponent, {
      data: {studentId: this.studentId},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEnrollments();
      }
    });
  }

  private loadEnrollments() {
    this.enrollmentService.getEnrollmentsByStudentId(this.studentId).subscribe({
      next: (enrollments) => {
        this.courseService.getActiveCourses().subscribe({
          next: (courses) => {
            this.enrollments = enrollments.map((enrollment) => {
              const course = courses.find((c) => c.id === enrollment.courseId);
              return {
                enrollmentId: enrollment.id, // Se guarda el ID de la inscripción
                courseId: enrollment.courseId,
                studentId: this.student.id,
                courseName: course?.imageURL
                  ? course.name
                  : 'Curso no encontrado',
                  courseImageURL: course
                     ? course.imageURL
                     : 'https://via.placeholder.com/150',
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
  
  // // Método para desinscribir a un estudiante de un curso
  // unenrollStudent(courseId: string, event: Event): void {
  // event.stopPropagation(); // Evitar que se active el routerLink de la tarjeta

  //   if (confirm('¿Estás seguro de que deseas desinscribir al estudiante de este curso?')) {
  //       this.enrollmentService.unenrollStudent(this.studentId, courseId).subscribe({
  //         next: (updatedEnrollment) => {
  //             console.log('Estudiante desinscrito correctamente:', updatedEnrollment);
  //             // Mostrar un mensaje de éxito
  //             this.snackBar.open('Desinscripción exitosa', 'Cerrar', { duration: 3000 });
  //             // Recargar la lista de inscripciones
  //             this.loadEnrollments();
  //         },
  //         error: (error) => {
  //             console.error('Error al desinscribir al estudiante:', error);
  //             // Mostrar un mensaje de error
  //             this.snackBar.open('Error al desinscribir al estudiante', 'Cerrar', { duration: 3000 });
  //         }
  //       });
  //   }
  // }  

//   unenrollStudent(courseId: string, event: Event): void {
//     event.stopPropagation();
//     console.log('Intentando desinscribir al estudiante del curso:', courseId);
 
//     // Buscar la inscripción correspondiente
//     const enrollment = this.enrollments.find(e => e.courseId === courseId);
//     if (!enrollment) {
//        this.snackBar.open('No se encontró la inscripción del estudiante.', 'Cerrar', { duration: 3000 });
//        return;
//     }
 
//     if (confirm('¿Estás seguro de que deseas desinscribir al estudiante de este curso?')) {
//        this.enrollmentService.unenrollStudent(enrollment.courseId).subscribe({
//           next: () => {
//              console.log('Estudiante desinscrito correctamente');
//              this.snackBar.open('Desinscripción exitosa', 'Cerrar', { duration: 3000 });
//              this.loadEnrollments();
//           },
//           error: (error) => {
//              console.error('Error al desinscribir al estudiante:', error);
//              this.snackBar.open(error.message, 'Cerrar', { duration: 3000 });
//           }
//        });
//     }
//  }
  unenrollStudent(enrollmentId: string, event: Event): void {
    event.stopPropagation();
    console.log('Intentando desinscribir al estudiante:', { enrollmentId });

    if (confirm('¿Estás seguro de que deseas desinscribir al estudiante de este curso?')) {
      this.enrollmentService.unenrollStudent(enrollmentId).subscribe({
        next: () => {
          console.log('Estudiante desinscrito correctamente');
          this.snackBar.open('Desinscripción exitosa', 'Cerrar', { duration: 3000 });
          this.loadEnrollments();
        },
        error: (error) => {
          console.error('Error al desinscribir al estudiante:', error);
          this.snackBar.open(error.message, 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

}

interface EnrollmentDisplay {
  enrollmentId: string; // ID único de la inscripción
  courseId: string;
  courseName: string;
  courseImageURL: string | undefined;
  enrollmentDate: Date;
}
