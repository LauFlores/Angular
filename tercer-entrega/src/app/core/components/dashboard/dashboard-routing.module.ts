import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {authGuard} from "../../guards/auth.guard";
import {DashboardComponent} from "./dashboard.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
   {
      path: '',
      component: DashboardComponent,
      canActivate: [authGuard],
      children: [
         {
            path: 'students',
            loadChildren: () =>
               import('../../../features/students/students.module').then(m => m.StudentsModule)
         },
         {
            path: 'courses',
            loadChildren: () =>
               import('../../../features/courses/courses.module').then(m => m.CoursesModule)
         },
         {
            path: 'classes',
            loadChildren: () =>
               import('../../../features/classes/classes.module').then(m => m.ClassesModule)
         },
         {
            path: 'users',
            loadChildren: () =>
               import('../../../features/users/users.module').then(m => m.UsersModule)
         },
         {
            path: '',
            redirectTo: 'students',
            pathMatch: 'full'
         }
      ]
   }
];


@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      RouterModule.forChild(routes)
   ],
   exports: [RouterModule]
})

export class DashboardRoutingModule {
}
