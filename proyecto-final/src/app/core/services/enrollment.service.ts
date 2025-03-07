// import {Injectable} from '@angular/core';
// import {Enrollment} from "../models/enrollment";
// import {tap,catchError, map, Observable, of, throwError} from "rxjs";
// import {HttpClient} from "@angular/common/http";
// import {environment} from "../../../environments/environment";

// @Injectable({
//    providedIn: 'root'
// })
// export class EnrollmentService {
//    private apiUrl = environment.API_URL;

//    constructor(private httpClient: HttpClient) {
//    }

//    getActiveEnrollments(): Observable<Enrollment[]> {
//       return this.httpClient.get<Enrollment[]>(`${this.apiUrl}/enrollments`).pipe(
//          map((enrollments: Enrollment[]) => enrollments.filter(e => e.isActive)),
//          catchError(error => {
//             console.error('Error al obtener los alumnos activos:', error);
//             return throwError(() => new Error('No se pudieron obtener los alumnos activos'));
//          })
//       );
//    }

//    getEnrollmentsByStudentId(studentId: string): Observable<Enrollment[]> {
//       return this.httpClient.get<Enrollment[]>(`${this.apiUrl}/enrollments`).pipe(
//          map((enrollments: Enrollment[]) => enrollments.filter(e => e.studentId === studentId)),
//          catchError(error => {
//             console.error('Error al obtener los alumnos:', error);
//             return throwError(() => new Error('No se pudieron obtener los alumnos'));
//          })
//       );
//    }

//    getEnrollmentsByCourseId(courseId: string): Observable<Enrollment[]> {
//       return this.httpClient.get<Enrollment[]>(`${this.apiUrl}/enrollments/${courseId}`).pipe(
//          catchError(error => {
//             console.error('Error al obtener los cursos:', error);
//             return throwError(() => new Error('No se pudieron obtener los cursos'));
//          })
//       );
//    }

//    enrollStudent(enrollment: Omit<Enrollment, 'id' | 'isActive' | 'enrollmentDate' | 'updatedAt'>): Observable<Enrollment[]> {
//       const newEnrollment: Omit<Enrollment, 'id'> = {
//          courseId: enrollment.courseId,
//          studentId: enrollment.studentId,
//          isActive: true,
//          enrollmentDate: new Date(),
//          updatedAt: new Date()
//       };
//       return this.httpClient.post<Enrollment[]>(`${this.apiUrl}/enrollments`, newEnrollment).pipe(
//          catchError(error => {
//             console.error('Error al agregar alumno:', error);
//             return throwError(() => new Error('No se pudo agregar alumno'));
//          })
//       );
//    }
//  -----------------------
   // unenrollStudent(studentId: string, courseId: string): Observable<Enrollment[]> {
   //    return this.httpClient.patch<Enrollment[]>(`${this.apiUrl}/enrollments/${studentId}/${courseId}`, {isActive: false}).pipe(
   //       catchError(error => {
   //          console.error('Error al eliminar alumno:', error);
   //          return throwError(() => new Error('No se pudo desinscribir al alumno del curso'));
   //       })
   //    );
   // }

   // unenrollStudent(studentId: string, courseId: string): Observable<void> {
   //    return this.httpClient.delete<void>(
   //       `${this.apiUrl}/enrollments/${studentId}/${courseId}`
   //    ).pipe(
   //       catchError((error) => {
   //          console.error('Error al desinscribir al estudiante:', error);
   //          return throwError(() => new Error('No se pudo desinscribir al estudiante del curso.'));
   //       })
   //    );
   // }
// ---------------------
//    unenrollStudent(enrollmentId: string): Observable<void> {
//       console.log('Desinscribiendo al estudiante con ID de inscripción:', enrollmentId);
   
//       return this.httpClient.delete<void>(`${this.apiUrl}/enrollments/${enrollmentId}`).pipe(
//          tap(() => console.log('Solicitud de desinscripción enviada correctamente')),
//          catchError((error) => {
//             console.error('Error al desinscribir al estudiante:', error);
//             return throwError(() => new Error(`Error al desinscribir al estudiante: ${error.message}`));
//          })
//       );
//    }
//    getEnrollments(): Observable<Enrollment[]> {
//       return of(this.enrollments);
//     }
  
//     deleteEnrollment(enrollmentId: number): Observable<void> {
//       this.enrollments = this.enrollments.filter(e => e.id !== enrollmentId);
//       return of(void 0);
//     }
   
// }


// -----------------------
// ----------------

import { Injectable } from '@angular/core';
import { Enrollment } from "../models/enrollment";
import { tap, catchError, map, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = environment.API_URL;

  constructor(private httpClient: HttpClient) {}

  // Obtiene todas las inscripciones activas filtrando aquellas con isActive === true
  getActiveEnrollments(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(`${this.apiUrl}/enrollments`).pipe(
      map((enrollments: Enrollment[]) => enrollments.filter(e => e.isActive)),
      catchError(error => {
        console.error('Error al obtener los alumnos activos:', error);
        return throwError(() => new Error('No se pudieron obtener los alumnos activos'));
      })
    );
  }

  // Obtiene las inscripciones de un alumno en particular
  getEnrollmentsByStudentId(studentId: string): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(`${this.apiUrl}/enrollments`).pipe(
      map((enrollments: Enrollment[]) => enrollments.filter(e => e.studentId === studentId)),
      catchError(error => {
        console.error('Error al obtener los alumnos:', error);
        return throwError(() => new Error('No se pudieron obtener los alumnos'));
      })
    );
  }

  // Obtiene las inscripciones de un curso en particular
  getEnrollmentsByCourseId(courseId: string): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(`${this.apiUrl}/enrollments/${courseId}`).pipe(
      catchError(error => {
        console.error('Error al obtener los cursos:', error);
        return throwError(() => new Error('No se pudieron obtener los cursos'));
      })
    );
  }

    // Obtiene las inscripciones 
    getEnrollments(): Observable<Enrollment[]> {
      return this.httpClient.get<Enrollment[]>(`${this.apiUrl}/enrollments`).pipe(
        catchError(error => {
          console.error('Error al obtener las inscripciones:', error);
          return throwError(() => new Error('No se pudieron obtener las inscripciones'));
        })
      );
    }

  // Inscribe un alumno en un curso
  // El parámetro enrollment debe incluir: studentId, courseId y enrolledByUserId
  enrollStudent(enrollment: Omit<Enrollment, 'id' | 'isActive' | 'enrollmentDate' | 'updatedAt'>): Observable<Enrollment> {
    const newEnrollment: Omit<Enrollment, 'id'> = {
      studentId: enrollment.studentId,
      courseId: enrollment.courseId,
      enrolledByUserId: enrollment.enrolledByUserId, // Se agrega la propiedad faltante
      isActive: true,
      enrollmentDate: new Date(),
      updatedAt: new Date()
    };
    return this.httpClient.post<Enrollment>(`${this.apiUrl}/enrollments`, newEnrollment).pipe(
      catchError(error => {
        console.error('Error al agregar alumno:', error);
        return throwError(() => new Error('No se pudo agregar alumno'));
      })
    );
  }

  // Desinscribe a un alumno eliminando la inscripción mediante su id
  unenrollStudent(enrollmentId: string): Observable<void> {
    console.log('Desinscribiendo al estudiante con ID de inscripción:', enrollmentId);
    return this.httpClient.delete<void>(`${this.apiUrl}/enrollments/${enrollmentId}`).pipe(
      tap(() => console.log('Solicitud de desinscripción enviada correctamente')),
      catchError((error) => {
        console.error('Error al desinscribir al estudiante:', error);
        return throwError(() => new Error(`Error al desinscribir al estudiante: ${error.message}`));
      })
    );
  }
}
