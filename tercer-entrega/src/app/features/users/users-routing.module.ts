import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent } from "./user-list/user-list.component";
import {adminGuard} from "../../core/guards/admin.guard";

const routes: Routes = [
   {
      path: '',
      component: UserListComponent,
      canActivate: [adminGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
