import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseListComponent} from "./course-list/course-list.component";
import {CourseDetailComponent} from "./course-detail/course-detail.component";
import {ClassListComponent} from "../classes/class-list/class-list.component";

const routes: Routes = [
  {
    path: '',
    component: CourseListComponent
  },
  {
    path: ':id',
    component: CourseDetailComponent,
  },
  {
    path: ':id/classes',
    component: ClassListComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
