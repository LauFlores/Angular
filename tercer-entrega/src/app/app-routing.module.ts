import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./shared/components/welcome/welcome.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {RegisterComponent} from "./features/auth/register/register.component";

const routes: Routes = [
   {
      path: '',
      component: WelcomeComponent
   },
   {
      path: 'login',
      component: LoginComponent
   },
   {
      path: 'register',
      component: RegisterComponent
   },
   {
      path: 'dashboard',
      loadChildren: () =>
         import('./core/components/dashboard/dashboard.module').then(m => m.DashboardModule)
   },
   {path: '**', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule {
}
