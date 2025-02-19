import {Injectable} from '@angular/core';
import {catchError, delay, map, Observable, of, throwError} from "rxjs";
import {Class} from "../models/class";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
   providedIn: 'root'
})
export class ClassService {
   private apiUrl = environment.API_URL;

   constructor(private httpClient: HttpClient) {
   }

   getActiveClasses(courseID: string): Observable<Class[]> {
      return this.httpClient.get<Class[]>(`${this.apiUrl}/classes`).pipe(
         map((classes: Class[]) => classes.filter(c => c.isActive)),
         catchError(error => {
            console.error('Error al obtener las clases activas:', error);
            return throwError(() => new Error('No se pudieron obtener las clases activas'));
         })
      );
   }

   getInactiveClasses(courseID: string): Observable<Class[]> {
      return this.httpClient.get<Class[]>(`${this.apiUrl}/classes`).pipe(
         map((classes: Class[]) => classes.filter(c => !c.isActive)),
         catchError(error => {
            console.error('Error al obtener las clases inactivas:', error);
            return throwError(() => new Error('No se pudieron obtener las clases inactivas'));
         })
      );
   }

   getClassById(id: string): Observable<Class> {
      return this.httpClient.get<Class>(`${this.apiUrl}/classes/${id}`).pipe(
         catchError(error => {
            console.error('Error al obtener la clase:', error);
            return throwError(() => new Error('Clase no encontrada'));
         })
      );
   }

   createClass(result: Class): Observable<Class[]> {
      const newClass: Class = {
         ...result,
         isActive: true,
         id: Math.random().toString(36).slice(2),
         createdAt: new Date(),
         updatedAt: new Date()
      };
      return this.httpClient.post<Class[]>(`${this.apiUrl}/classes`, newClass).pipe(
         catchError(error => {
            console.error('Error al crear la clase:', error);
            return throwError(() => new Error('No se pudo crear la clase'));
         })
      );
   }

   deleteClass(id: string): Observable<Class[]> {
      return this.httpClient.patch<Class[]>(`${this.apiUrl}/classes/${id}`, {isActive: false}).pipe(
         catchError(error => {
            console.error('Error al eliminar la clase:', error);
            return throwError(() => new Error('No se pudo eliminar la clase'));
         })
      );
   }

   updateClass(id: string, result: Partial<Class>): Observable<Class[]> {
      return this.httpClient.patch<Class[]>(`${this.apiUrl}/classes/${id}`, result).pipe(
         catchError(error => {
            console.error('Error al actualizar la clase:', error);
            return throwError(() => new Error('No se pudo actualizar la clase'));
         })
      );
   }

   activateClass(id: string): Observable<Class[]> {
      return this.httpClient.patch<Class[]>(`${this.apiUrl}/classes/${id}`, {isActive: true}).pipe(
         catchError(error => {
            console.error('Error al activar la clase:', error);
            return throwError(() => new Error('No se pudo activar la clase'));
         })
      );
   }

   getClassesByCourseId(courseId: string): Observable<Class[]> {
      return this.httpClient.get<Class[]>(`${this.apiUrl}/classes`).pipe(
         map((classes: Class[]) => classes.filter(c => c.courseId === courseId)),
         catchError(error => {
            console.error('Error al obtener las clases del curso:', error);
            return throwError(() => new Error('No se pudieron obtener las clases del curso'));
         })
      );
   }

}
