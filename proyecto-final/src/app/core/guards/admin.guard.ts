import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

export const adminGuard: CanActivateFn = (): boolean | UrlTree | Observable<boolean | UrlTree> => {
   const authService: AuthService = inject(AuthService);
   const router: Router = inject(Router);
   const snackBar: MatSnackBar = inject(MatSnackBar);

   const currentUser = authService.getCurrentUser();
   if (currentUser && currentUser.role === 'ADMIN') {
      return true;
   } else {
      snackBar.open('No tiene permisos para acceder a esta página', 'Cerrar', {
         duration: 3000,
      });
   }
   // Redireccionar al dashboard si no es administrador
   return router.createUrlTree(['/dashboard']);
};
