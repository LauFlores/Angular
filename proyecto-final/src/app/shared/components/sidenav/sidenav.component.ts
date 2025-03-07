import { Component } from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {User} from "../../../core/models/user";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
    standalone: false
})
export class SidenavComponent {

   constructor(private authService: AuthService,
      private router: Router
      ) { }

   isAdmin(): boolean {
      const currentUser: User | null = this.authService.getCurrentUser();
      return currentUser !== null && currentUser.role === 'ADMIN';
   }

   onLogout(): void{
      this.authService.logout();
      this.router.navigate(['/login']);
   }
   
}
