import {Injectable} from '@angular/core';
import {Course} from "../models/course";
import {Observable, throwError, map, catchError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";


@Injectable({
   providedIn: 'root'
})
export class CourseService {
   private apiUrl = environment.API_URL;

   constructor(private httpClient: HttpClient) {
   }

   getActiveCourses(): Observable<Course[]> {
      return this.httpClient.get<Course[]>(`${this.apiUrl}/courses`).pipe(
         map((courses: Course[]) => courses.filter(c => c.isActive)),
         catchError(error => {
            console.error('Error al obtener los cursos activos:', error);
            return throwError(() => new Error('No se pudieron obtener los cursos activos'));
         })
      );
   }

   getInactiveCourses(): Observable<Course[]> {
      return this.httpClient.get<Course[]>(`${this.apiUrl}/courses`).pipe(
         map((courses: Course[]) => courses.filter(c => !c.isActive)),
         catchError(error => {
            console.error('Error al obtener los cursos inactivos:', error);
            return throwError(() => new Error('No se pudieron obtener los cursos inactivos'));
         })
      );
   }

   getCourseById(id: string): Observable<Course> {
      return this.httpClient.get<Course>(`${this.apiUrl}/courses/${id}`).pipe(
         catchError(error => {
            console.error('Error al obtener el curso:', error);
            return throwError(() => new Error('Curso no encontrado'));
         })
      );
   }


   createCourse(result: Course): Observable<Course[]> {
      const newCourse: Course = {
         ...result,
         isActive: true,
         createdAt: new Date(),
         updatedAt: new Date()
      };
      return this.httpClient.post<Course[]>(`${this.apiUrl}/courses`, newCourse).pipe(
         catchError(error => {
            console.error('Error al crear el curso:', error);
            return throwError(() => new Error('No se pudo crear el curso'));
         })
      );
   }

   deleteCourse(id: string): Observable<Course[]> {
      return this.httpClient.patch<Course[]>(`${this.apiUrl}/courses/${id}`, {isActive: false, updatedAt: new Date()}).pipe(
         catchError(error => {
            console.error('Error al eliminar el curso:', error);
            return throwError(() => new Error('No se pudo eliminar el curso'));
         })
      );
   }

   updateCourse(id: string, result: Partial<Course>): Observable<Course[]> {
         return this.httpClient.patch<Course[]>(`${this.apiUrl}/courses/${id}`, {... result, updatedAt: new Date()}).pipe(
         catchError(error => {
            console.error('Error al actualizar el curso:', error);
            return throwError(() => new Error('No se pudo actualizar el curso'));
         })
      );
   }

   activateCourse(id: string): Observable<Course[]> {
      return this.httpClient.patch<Course[]>(`${this.apiUrl}/courses/${id}`, {isActive: true}).pipe(
         catchError(error => {
            console.error('Error al activar el curso:', error);
            return throwError(() => new Error('No se pudo activar el curso'));
         })
      );
   }
}
