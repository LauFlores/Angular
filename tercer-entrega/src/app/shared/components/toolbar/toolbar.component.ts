import {Component, Input} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {Observable} from "rxjs";
import {User} from "../../../core/models/user";
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Input() drawer!: MatDrawer;
   authUser: Observable<User | null>;

   constructor(
      private authService: AuthService,
      private router: Router
      ) {
      this.authUser = this.authService.authUser$;

   }

   onLogout() {
      this.authService.logout();
      this.router.navigate(['/welcome']).then();
   }
}
