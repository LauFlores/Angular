import { Component } from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {User} from "../../../core/models/user";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

   constructor(private authService: AuthService) { }

   isAdmin(): boolean {
      const currentUser: User | null = this.authService.getCurrentUser();
      return currentUser !== null && currentUser.role === 'ADMIN';
   }
}
