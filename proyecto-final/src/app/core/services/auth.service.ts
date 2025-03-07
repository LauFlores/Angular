import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError, BehaviorSubject, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {User} from "../models/user";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   private usersUrl = environment.USERS_URL;
   private _authUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
   public readonly authUser$: Observable<User | null> = this._authUser$.asObservable();

   constructor(private httpClient: HttpClient, private router: Router) {
   }

   register(user: Omit<User, 'id'>): Observable<User> {
      return this.httpClient
         .post<User>(this.usersUrl, user)
         .pipe(
            tap((newUser: User) => {
               this._authUser$.next(newUser);
            }),
            catchError(error => {
               return throwError(() => new Error(`Error al registrar usuario: ${error.message}`));
            })
         );
   }

   login(email: string, password: string): Observable<User | null> {
      return this.httpClient
         .get<User[]>(`${this.usersUrl}`, {params: {email, password}})
         .pipe(
            map((users: User[]) => {
               if (!!users[0]) {
                  const user: User = users[0];
                  localStorage.setItem('token', user.token);
                  this._authUser$.next(user);
                  return user;
               } else {
                  return null;
               }
            }),
            catchError((error) => {
               return  throwError(() => new Error(`No se pudo iniciar sesión`));
            })
         );
   }

   logout(): void {
      this._authUser$.next(null);
      localStorage.removeItem('token');
      this.router.navigate(['/welcome']);
   }

   verifyToken(): Observable<boolean> {
      const usertoken = localStorage.getItem('token');
      if (!usertoken) {
         return of(false);
      }
      return this.httpClient.get<User[]>(`${this.usersUrl}?token=${usertoken}`).pipe(
         map((users: User[]) => {
            if (!!users[0]) {
               this._authUser$.next(users[0]);
               return true;
            }
            return false;
         }),
         catchError((error) => {
            return of(false);
         })
      );
   }

   getCurrentUser(): User | null {
      return this._authUser$.value;
   }
}
