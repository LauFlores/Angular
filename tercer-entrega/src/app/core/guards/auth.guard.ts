import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {map} from "rxjs";

export const authGuard: CanActivateFn = (
   route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot
) => {
   const authService = inject(AuthService);
   const router = inject(Router);
   const snackBar = inject(MatSnackBar);

   return authService.verifyToken().pipe(
      map((isValid) => {
         if (isValid) {
            return true;
         } else {
            snackBar.open('Inicie sesión para continuar', 'Cerrar', {
               duration: 3000,
            });
            return router.createUrlTree(['/login'], {queryParams: {returnUrl: state.url}});
         }
      }),
      /*map((user) => {
         if (!!user) {
            return true;
         } else {
            snackBar.open('Inicie sesión para continuar', 'Cerrar', {
               duration: 3000,
            });
            return router.createUrlTree(['/login'], {queryParams: {returnUrl: state.url}});
         }
      })*/
   );
};
