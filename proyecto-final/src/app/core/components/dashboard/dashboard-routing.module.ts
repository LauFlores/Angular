import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {authGuard} from "../../guards/auth.guard";
import {DashboardComponent} from "./dashboard.component";
import {RouterModule, Routes} from "@angular/router";
import { Enrollment } from '../../models/enrollment';

const routes: Routes = [
   {
      path: '',
      component: DashboardComponent,
      canActivate: [authGuard],
      children: [
         {
            path: 'students',
            loadChildren: () =>
               import('../../../features/students/students.module').then(m => m.StudentsModule), 
            data: { title: 'Alumnos' }
         },
         {
            path: 'courses',
            loadChildren: () =>
               import('../../../features/courses/courses.module').then(m => m.CoursesModule),
            data: { title: 'Cursos' }
         },
         // {
         //    path: 'classes',
         //    loadChildren: () =>
         //       import('../../../features/classes/classes.module').then(m => m.ClassesModule),
         //    data: { title: 'Clases' }
         // },
         {
            path: 'enrollments',
            loadChildren: () =>
               import('../../../features/enrollments/enrollments.module').then(m => m.EnrollmentsModule),
            data: { title: 'Inscripciones' }
         },
         {
            path: 'users',
            loadChildren: () =>
               import('../../../features/users/users.module').then(m => m.UsersModule), 
            data: { title: 'Usuarios' }
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
