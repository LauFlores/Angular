import {Component, OnInit} from '@angular/core';
import {Course} from "../../../core/models/course";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../../core/services/course.service";
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { StudentsService } from '../../../core/services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
    selector: 'app-course-detail',
    templateUrl: './course-detail.component.html',
    styleUrls: ['./course-detail.component.scss', '../../../shared/styles/details.scss'],
    standalone: false
})
export class CourseDetailComponent implements OnInit {
  courseId!: string;
  course!: Course;
  students: any[] = [];
  isLoading: boolean = false;

  // Columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['lastName', 'firstName', 'email', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CourseService,
    private enrollmentService: EnrollmentService,
    private studentsService: StudentsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    // Obtener el ID del curso desde la ruta.
    this.route.params.subscribe((params) => {
      this.courseId = params['id'];
      this.loadCourse();
    });
  }

  private loadCourse(): void {
    this.isLoading = true;
    this.coursesService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        this.course = course;
        this.loadEnrolledStudents();
        // this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }


  private loadEnrolledStudents(): void {
    console.log("Cargando alumnos inscritos para el curso:", this.courseId);
    
    this.enrollmentService.getEnrollmentsByCourseId(this.courseId).subscribe({
      next: (enrollments) => {
        console.log("Inscripciones obtenidas:", enrollments);
  
        if (!enrollments.length) {
          this.students = [];
          this.isLoading = false;
          return;
        }
  
        const studentIds = enrollments.map((e) => e.studentId);
        console.log("IDs de estudiantes:", studentIds);
  
        this.studentsService.getStudentsByIds(studentIds).subscribe({
          next: (students) => {
            console.log("Estudiantes obtenidos:", students);
  
            this.students = students.map((student) => {
              const enrollment = enrollments.find((e) => e.studentId === student.id);
              return { ...student, enrollmentId: enrollment?.id };
            });
  
            this.isLoading = false;
          },
          error: (err) => {
            console.error("Error obteniendo estudiantes:", err);
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error("Error obteniendo inscripciones:", err);
        this.isLoading = false;
      }
    });
  }
    


  unenrollStudent(enrollmentId: string): void {
    if (confirm('¿Seguro que deseas desinscribir a este alumno?')) {
      this.enrollmentService.unenrollStudent(enrollmentId).subscribe({
        next: () => {
          this.snackBar.open('Alumno desinscrito', 'Cerrar', { duration: 3000 });
          this.loadEnrolledStudents();
        },
        error: (error) => {
          console.error('Error al desinscribir:', error);
          this.snackBar.open('Error al desinscribir', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  // goBack(): void {
  //   // Redireccionar al listado de cursos.
  //   this.router.navigate(['/courses']).then();
  // }

  goBack(): void {
    this.location.back(); // Retrocede a la página anterior
  }

  goToStudents() {
    // Redireccionar a la lista de clases.
    this.router.navigate(['/courses',this.course.id,'students']).then();
  }
}
