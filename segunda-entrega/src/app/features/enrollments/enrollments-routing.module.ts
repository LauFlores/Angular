import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component';

const routes: Routes = [
  {
    path: 'students/:id/newEnrollment',
    component: EnrollmentFormComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentsRoutingModule { }
