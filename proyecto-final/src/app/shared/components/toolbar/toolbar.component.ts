import {Component, Input} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {Observable} from "rxjs";
import {User} from "../../../core/models/user";
// import {AuthService} from "../../../core/services/auth.service";

import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map, startWith  } from "rxjs/operators";

import { Store } from '@ngrx/store';
import { selectUser } from '../../../store/auth/auth.selectors';
import { selectPageTitle } from '../../../store/toolbar/toolbar.selectors';


@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    standalone: false
})
export class ToolbarComponent {
  @Input() drawer!: MatDrawer;
   authUser$: Observable<User | null>;
   pageTitle$: Observable<string>;

   constructor(
      // private authService: AuthService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private store: Store
      ) {
      // this.authUser$ = this.authService.authUser$;
      //  Se asigna el usuario desde NgRx Store
      this.authUser$ = this.store.select(selectUser);
      this.pageTitle$ = this.store.select(selectPageTitle);

       // Obtener el título según la ruta
      // this.pageTitle$ = this.router.events.pipe(
      //    filter(event => event instanceof NavigationEnd),
      //    startWith(null),
      //    map(() => {
      //       let route = this.activatedRoute;
      //       while (route?.firstChild) {
      //          route = route.firstChild;
      //    }
      //    return route?.snapshot.data['title'] || 'Dashboard';

      // this.authUser$ = this.store.select(selectUser);
      // this.pageTitle$ = this.store.select(selectPageTitle);   
      }
      ngOnInit(): void {
         // ✅ Se asigna el título según la ruta activa
         this.pageTitle$ = this.router.events.pipe(
             filter(event => event instanceof NavigationEnd),
             startWith(null),
             map(() => {
                 let route = this.activatedRoute;
                 while (route?.firstChild) {
                     route = route.firstChild;
                 }
                 return route?.snapshot.data['title'] || 'Dashboard';
             })
         );
     }
 } 