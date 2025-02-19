import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../core/models/user";

function randomString(): string {
   return Math.random().toString(16).slice(2);
}

@Component({
   selector: 'app-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.scss', '../../../shared/styles/form.scss']
})
export class RegisterComponent {
   registerForm: FormGroup;
   errorMessage: string | null = null;
   hidePassword: boolean = true;

   constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private snackBar: MatSnackBar
   ) {
      this.registerForm = this.fb.group({
         firstName: ['', Validators.required],
         lastName: ['', Validators.required],
         email: ['', Validators.required],
         password: ['', Validators.required]
      });
   }


   onSubmit() {
      if (this.registerForm.invalid) {
         return;
      }

      const newUser: Omit<User, 'id'> = {
         firstName: this.registerForm.get('firstName')?.value,
         lastName: this.registerForm.get('lastName')?.value,
         email: this.registerForm.get('email')?.value,
         password: this.registerForm.get('password')?.value,
         token: randomString(),
         isActive: true,
         role: "USER",
         createdAt: new Date(),
         updatedAt: new Date()
      };
      this.authService.register(newUser).subscribe({
         next: () => {
            this.snackBar.open('Usuario registrado con éxito', 'Cerrar', {
               duration: 3000,
            });
            this.router.navigate(['/login']).then();
         },
         error: (error) => {
            this.snackBar.open(`Error al registrar usuario: ${error.message}`, 'Cerrar', {
               duration: 3000,
            });
         }
      });
   }
}
