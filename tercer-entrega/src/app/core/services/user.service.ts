import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, switchMap, throwError} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
   private usersUrl = environment.USERS_URL;

  constructor(
     private httpClient: HttpClient
  ) { }

   getUsers(): Observable<User[]> {
     return this.httpClient.get<User[]>(this.usersUrl);
   }

   getUserById(id: string): Observable<User> {
     const url = `${this.usersUrl}/${id}`;
     return this.httpClient.get<User>(url).pipe(
        catchError(() => {
           return throwError(() => new Error('No se pudo obtener el usuario'));
        })
     );
   }

   updateUser(id: string, result: Partial<User>): Observable<User> {
     const updatedData = {...result, updatedAt: new Date()};
     return this.httpClient.patch<User>(`${this.usersUrl}/${id}`, updatedData).pipe(
        catchError(() => {
           return throwError(() => new Error('No se pudo actualizar el usuario'));
        })
     );
   }

   toggleAdmin(id: string): Observable<User> {
      return this.isAdmin(id).pipe(
         switchMap((isAdmin: boolean) => {
            if (isAdmin) {
               return this.httpClient.patch<User>(`${this.usersUrl}/${id}`, {role: 'USER'});
            } else {
               return this.httpClient.patch<User>(`${this.usersUrl}/${id}`, {role: 'ADMIN'});
            }
         }),
         catchError(() => {
            return throwError(() => new Error('No se pudo cambiar el rol del usuario'));
         })
      );
   }

   private isAdmin(id: string) {
      return this.getUserById(id).pipe(
         catchError(() => {
            return throwError(() => new Error('No se pudo obtener el usuario'));
         }),
         map((user: User) => user.role === 'ADMIN')
      );
   }
}
