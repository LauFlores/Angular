import {Injectable} from '@angular/core';
import {Enrollment} from "../models/enrollment";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
   providedIn: 'root'
})
export class EnrollmentService {
   private apiUrl = environment.API_URL;

   constructor(private httpClient: HttpClient) {
   }

   getActiveEnrollments(): Observable<Enrollment[]> {
      return this.httpClient.get<Enrollment[]>(`${this.apiUrl}/enrollments`).pipe(
         map((enrollments: Enrollment[]) => enrollments.filter(e => e.isActive)),
         catchError(error => {
            console.error('Error al obtener los alumnos activos:', error);
            return throwError(() => new Error('No se pudieron obtener los alumnos activos'));
         })
      );
   }

   getEnrollmentsByStudentId(studentId: string): Observable<Enrollment[]> {
      return this.httpClient.get<Enrollment[]>(`${this.apiUrl}/enrollments`).pipe(
         map((enrollments: Enrollment[]) => enrollments.filter(e => e.studentId === studentId)),
         catchError(error => {
            console.error('Error al obtener los alumnos:', error);
            return throwError(() => new Error('No se pudieron obtener los alumnos'));
         })
      );
   }

   getEnrollmentsByCourseId(courseId: string): Observable<Enrollment[]> {
      return this.httpClient.get<Enrollment[]>(`${this.apiUrl}/enrollments/${courseId}`).pipe(
         catchError(error => {
            console.error('Error al obtener los cursos:', error);
            return throwError(() => new Error('No se pudieron obtener los cursos'));
         })
      );
   }

   enrollStudent(enrollment: Omit<Enrollment, 'id' | 'isActive' | 'enrollmentDate' | 'updatedAt'>): Observable<Enrollment[]> {
      const newEnrollment: Omit<Enrollment, 'id'> = {
         courseId: enrollment.courseId,
         studentId: enrollment.studentId,
         isActive: true,
         enrollmentDate: new Date(),
         updatedAt: new Date()
      };
      return this.httpClient.post<Enrollment[]>(`${this.apiUrl}/enrollments`, newEnrollment).pipe(
         catchError(error => {
            console.error('Error al agregar alumno:', error);
            return throwError(() => new Error('No se pudo agregar alumno'));
         })
      );
   }

   unenrollStudent(studentId: string, courseId: string): Observable<Enrollment[]> {
      return this.httpClient.patch<Enrollment[]>(`${this.apiUrl}/enrollments/${studentId}/${courseId}`, {isActive: false}).pipe(
         catchError(error => {
            console.error('Error al eliminar alumno:', error);
            return throwError(() => new Error('No se pudo eliminar alumno'));
         })
      );
   }
}


