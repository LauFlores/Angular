// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, map, mergeMap, of } from 'rxjs';
// import { UserService } from '../../../core/services/user.service';
// import { 
//   loadUsers, loadUsersSuccess, loadUsersFailure,
//   deleteUserById, deleteUserSuccess, deleteUserFailure
// } from './user.actions';
// import { User } from '../../../core/models/user';

// @Injectable()
// export class UserEffects {
//   constructor(private actions$: Actions, private userService: UserService) {}

//   loadUsers$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadUsers),
//       mergeMap(() =>
//         this.userService.getUsers().pipe(
//           map((users: User[]) => loadUsersSuccess({ users })),
//           catchError(error => of(loadUsersFailure({ error: error.message })))
//         )
//       )
//     )
//   );

//   deleteUser$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(deleteUserById),
//       mergeMap(action =>
//         this.userService.deleteUser(action.id).pipe(
//           map(() => deleteUserSuccess({ id: action.id })),
//           catchError(error => of(deleteUserFailure({ error: error.message })))
//         )
//       )
//     )
//   );
// }
